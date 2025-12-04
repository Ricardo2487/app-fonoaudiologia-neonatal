from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, File, UploadFile, Form
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import aiohttp
from emergentintegrations.llm.chat import LlmChat, UserMessage
from emergentintegrations.llm.openai import OpenAITextToSpeech
import base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ MODELS ============
class User(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)
    id: str = Field(alias="_id")
    email: str
    name: str
    picture: Optional[str] = None
    role: str = "patient"  # patient, therapist, admin
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Patient(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    full_name: str
    birth_date: Optional[str] = None
    cpf: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    diagnosis: Optional[str] = None
    observations: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Therapist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    full_name: str
    crfa_number: Optional[str] = None
    specialties: Optional[List[str]] = []
    bio: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Exercise(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str  # fonema, respiração, ritmo, etc
    difficulty_level: str  # fácil, médio, difícil
    media_urls: Optional[List[str]] = []
    instructions: str
    estimated_time: Optional[int] = None  # minutos
    frequency: Optional[str] = None  # ex: 3x por semana
    created_by: str  # user_id do criador
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TherapyPlan(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_id: str
    therapist_id: str
    title: str
    objectives: str
    start_date: datetime
    end_date: Optional[datetime] = None
    status: str = "active"  # active, completed, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PlanExercise(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    plan_id: str
    exercise_id: str
    schedule: Optional[str] = None  # ex: Segunda, Quarta, Sexta
    frequency: Optional[str] = None
    notes: Optional[str] = None

class ProgressDiary(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_id: str
    plan_id: Optional[str] = None
    exercise_id: Optional[str] = None
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    audio_url: Optional[str] = None
    video_url: Optional[str] = None
    text_notes: Optional[str] = None
    therapist_comment: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_id: str
    therapist_id: str
    date: datetime
    appointment_type: str = "presencial"  # presencial, online
    status: str = "scheduled"  # scheduled, completed, cancelled
    meeting_url: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============ AUTH DEPENDENCY ============
async def get_current_user(request: Request) -> User:
    # Check session_token from cookie first, then from Authorization header
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find session
    session = await db.user_sessions.find_one({"session_token": session_token})
    if not session or datetime.fromisoformat(session["expires_at"]) < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    # Find user
    user_doc = await db.users.find_one({"_id": session["user_id"]})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_doc["id"] = user_doc.pop("_id")
    return User(**user_doc)


# ============ AUTH ROUTES ============
@api_router.post("/auth/register")
async def register(email: str = Form(...), password: str = Form(...), name: str = Form(...)):
    # Check if user exists
    existing = await db.users.find_one({"_id": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Create user
    user = {
        "_id": email,
        "email": email,
        "name": name,
        "password": hashed_pw.decode('utf-8'),
        "picture": None,
        "role": "patient",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user)
    
    return {"message": "User registered successfully", "email": email}

@api_router.post("/auth/login")
async def login(response: Response, email: str = Form(...), password: str = Form(...)):
    # Find user
    user = await db.users.find_one({"_id": email})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create session
    session_token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    session = {
        "user_id": user["_id"],
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7*24*60*60,
        path="/"
    )
    
    return {
        "message": "Login successful",
        "user": {
            "id": user["_id"],
            "email": user["email"],
            "name": user["name"],
            "role": user.get("role", "patient")
        }
    }

@api_router.get("/auth/session")
async def process_session(session_id: str, response: Response):
    # Call Emergent auth service
    async with aiohttp.ClientSession() as session:
        async with session.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        ) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=401, detail="Invalid session ID")
            
            data = await resp.json()
    
    # Check if user exists, if not create
    user_id = data["email"]
    user = await db.users.find_one({"_id": user_id})
    
    if not user:
        user = {
            "_id": user_id,
            "email": data["email"],
            "name": data["name"],
            "picture": data.get("picture"),
            "role": "patient",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(user)
    
    # Create internal session
    session_token = data["session_token"]
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7*24*60*60,
        path="/"
    )
    
    return {
        "user": {
            "id": user["_id"],
            "email": user["email"],
            "name": user["name"],
            "role": user.get("role", "patient")
        }
    }

@api_router.get("/auth/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.post("/auth/logout")
async def logout(response: Response, current_user: User = Depends(get_current_user), request: Request = None):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie("session_token", path="/")
    return {"message": "Logged out successfully"}


# ============ PATIENT ROUTES ============
@api_router.get("/patients")
async def get_patients(current_user: User = Depends(get_current_user)):
    # Only therapists and admins can list all patients
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    patients = await db.patients.find({}, {"_id": 0}).to_list(1000)
    return patients

@api_router.get("/patients/{patient_id}")
async def get_patient(patient_id: str, current_user: User = Depends(get_current_user)):
    patient = await db.patients.find_one({"id": patient_id}, {"_id": 0})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@api_router.post("/patients")
async def create_patient(patient: Patient, current_user: User = Depends(get_current_user)):
    patient_dict = patient.model_dump()
    patient_dict["created_at"] = patient_dict["created_at"].isoformat()
    await db.patients.insert_one(patient_dict)
    return patient

@api_router.put("/patients/{patient_id}")
async def update_patient(patient_id: str, updates: dict, current_user: User = Depends(get_current_user)):
    result = await db.patients.update_one({"id": patient_id}, {"$set": updates})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Patient updated successfully"}


# ============ EXERCISE ROUTES ============
@api_router.get("/exercises")
async def get_exercises(category: Optional[str] = None, difficulty: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if difficulty:
        query["difficulty_level"] = difficulty
    
    exercises = await db.exercises.find(query, {"_id": 0}).to_list(1000)
    return exercises

@api_router.get("/exercises/{exercise_id}")
async def get_exercise(exercise_id: str):
    exercise = await db.exercises.find_one({"id": exercise_id}, {"_id": 0})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise

@api_router.post("/exercises")
async def create_exercise(exercise: Exercise, current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    exercise_dict = exercise.model_dump()
    exercise_dict["created_at"] = exercise_dict["created_at"].isoformat()
    await db.exercises.insert_one(exercise_dict)
    return exercise

@api_router.put("/exercises/{exercise_id}")
async def update_exercise(exercise_id: str, updates: dict, current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.exercises.update_one({"id": exercise_id}, {"$set": updates})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return {"message": "Exercise updated successfully"}

@api_router.delete("/exercises/{exercise_id}")
async def delete_exercise(exercise_id: str, current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.exercises.delete_one({"id": exercise_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return {"message": "Exercise deleted successfully"}


# ============ THERAPY PLAN ROUTES ============
@api_router.get("/therapy-plans")
async def get_therapy_plans(current_user: User = Depends(get_current_user)):
    if current_user.role == "patient":
        # Find patient record
        patient = await db.patients.find_one({"user_id": current_user.id})
        if not patient:
            return []
        plans = await db.therapy_plans.find({"patient_id": patient["id"]}, {"_id": 0}).to_list(1000)
    else:
        plans = await db.therapy_plans.find({}, {"_id": 0}).to_list(1000)
    
    return plans

@api_router.get("/therapy-plans/{plan_id}")
async def get_therapy_plan(plan_id: str, current_user: User = Depends(get_current_user)):
    plan = await db.therapy_plans.find_one({"id": plan_id}, {"_id": 0})
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    # Get exercises for this plan
    plan_exercises = await db.plan_exercises.find({"plan_id": plan_id}, {"_id": 0}).to_list(1000)
    plan["exercises"] = plan_exercises
    
    return plan

@api_router.post("/therapy-plans")
async def create_therapy_plan(plan: TherapyPlan, current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    plan_dict = plan.model_dump()
    plan_dict["created_at"] = plan_dict["created_at"].isoformat()
    plan_dict["start_date"] = plan_dict["start_date"].isoformat()
    if plan_dict.get("end_date"):
        plan_dict["end_date"] = plan_dict["end_date"].isoformat()
    
    await db.therapy_plans.insert_one(plan_dict)
    return plan

@api_router.post("/therapy-plans/{plan_id}/exercises")
async def add_exercise_to_plan(plan_id: str, plan_exercise: PlanExercise, current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    plan_exercise_dict = plan_exercise.model_dump()
    await db.plan_exercises.insert_one(plan_exercise_dict)
    return plan_exercise


# ============ PROGRESS DIARY ROUTES ============
@api_router.get("/progress")
async def get_progress(current_user: User = Depends(get_current_user)):
    if current_user.role == "patient":
        patient = await db.patients.find_one({"user_id": current_user.id})
        if not patient:
            return []
        entries = await db.progress_diary.find({"patient_id": patient["id"]}, {"_id": 0}).to_list(1000)
    else:
        entries = await db.progress_diary.find({}, {"_id": 0}).to_list(1000)
    
    return entries

@api_router.post("/progress")
async def create_progress_entry(entry: ProgressDiary, current_user: User = Depends(get_current_user)):
    entry_dict = entry.model_dump()
    entry_dict["date"] = entry_dict["date"].isoformat()
    entry_dict["created_at"] = entry_dict["created_at"].isoformat()
    await db.progress_diary.insert_one(entry_dict)
    return entry

@api_router.put("/progress/{entry_id}/comment")
async def add_therapist_comment(entry_id: str, comment: str = Form(...), current_user: User = Depends(get_current_user)):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.progress_diary.update_one({"id": entry_id}, {"$set": {"therapist_comment": comment}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Comment added successfully"}


# ============ APPOINTMENT ROUTES ============
@api_router.get("/appointments")
async def get_appointments(current_user: User = Depends(get_current_user)):
    if current_user.role == "patient":
        patient = await db.patients.find_one({"user_id": current_user.id})
        if not patient:
            return []
        appointments = await db.appointments.find({"patient_id": patient["id"]}, {"_id": 0}).to_list(1000)
    elif current_user.role == "therapist":
        therapist = await db.therapists.find_one({"user_id": current_user.id})
        if not therapist:
            return []
        appointments = await db.appointments.find({"therapist_id": therapist["id"]}, {"_id": 0}).to_list(1000)
    else:
        appointments = await db.appointments.find({}, {"_id": 0}).to_list(1000)
    
    return appointments

@api_router.post("/appointments")
async def create_appointment(appointment: Appointment, current_user: User = Depends(get_current_user)):
    appointment_dict = appointment.model_dump()
    appointment_dict["date"] = appointment_dict["date"].isoformat()
    appointment_dict["created_at"] = appointment_dict["created_at"].isoformat()
    await db.appointments.insert_one(appointment_dict)
    return appointment

@api_router.put("/appointments/{appointment_id}")
async def update_appointment(appointment_id: str, updates: dict, current_user: User = Depends(get_current_user)):
    result = await db.appointments.update_one({"id": appointment_id}, {"$set": updates})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment updated successfully"}


# ============ AI RECOMMENDATION ROUTES ============
@api_router.post("/ai/recommend-exercises")
async def recommend_exercises(
    patient_id: str = Form(...),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["therapist", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Get patient data
    patient = await db.patients.find_one({"id": patient_id}, {"_id": 0})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Get all exercises
    exercises = await db.exercises.find({}, {"_id": 0}).to_list(1000)
    
    # Get recent progress
    progress = await db.progress_diary.find(
        {"patient_id": patient_id},
        {"_id": 0}
    ).sort("date", -1).limit(10).to_list(10)
    
    # Prepare prompt for AI
    exercises_text = "\n".join([f"- {ex['title']} ({ex['category']}, {ex['difficulty_level']})" for ex in exercises])
    progress_text = "\n".join([f"- {p.get('text_notes', 'No notes')}" for p in progress]) if progress else "No progress recorded yet"
    
    prompt = f"""You are a speech therapy AI assistant. Based on the following patient information and available exercises, recommend 5 exercises that would be most beneficial.

Patient Information:
- Diagnosis: {patient.get('diagnosis', 'Not specified')}
- Observations: {patient.get('observations', 'None')}

Recent Progress:
{progress_text}

Available Exercises:
{exercises_text}

Provide recommendations in JSON format:
{{
  "recommended_exercises": [
    {{
      "title": "Exercise Title",
      "rationale": "Why this exercise is recommended"
    }}
  ]
}}"""
    
    # Call AI
    try:
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=f"recommend_{patient_id}_{datetime.now().timestamp()}",
            system_message="You are a professional speech therapy assistant."
        )
        chat.with_model("openai", "gpt-4o-mini")
        
        message = UserMessage(text=prompt)
        response = await chat.send_message(message)
        
        return {"recommendations": response}
    except Exception as e:
        logging.error(f"AI recommendation error: {str(e)}")
        return {"recommendations": "AI service temporarily unavailable. Please try again later."}


# ============ ADMIN ROUTES ============
@api_router.get("/admin/users")
async def get_all_users(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    users = await db.users.find({}, {"password": 0}).to_list(1000)
    for user in users:
        user["id"] = user.pop("_id")
    return users

@api_router.put("/admin/users/{user_id}/role")
async def update_user_role(user_id: str, role: str = Form(...), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    result = await db.users.update_one({"_id": user_id}, {"$set": {"role": role}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User role updated successfully"}

@api_router.get("/admin/stats")
async def get_stats(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    total_users = await db.users.count_documents({})
    total_patients = await db.patients.count_documents({})
    total_therapists = await db.therapists.count_documents({})
    total_exercises = await db.exercises.count_documents({})
    total_plans = await db.therapy_plans.count_documents({})
    
    return {
        "total_users": total_users,
        "total_patients": total_patients,
        "total_therapists": total_therapists,
        "total_exercises": total_exercises,
        "total_plans": total_plans
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()