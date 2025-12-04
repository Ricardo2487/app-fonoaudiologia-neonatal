#!/usr/bin/env python3
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid
import bcrypt

# Load environment
load_dotenv('/app/backend/.env')

async def create_users():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("👥 Creating demo users...")
    
    # Password for all demo users
    password = "demo123"
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # 1. Admin User
    admin_exists = await db.users.find_one({"_id": "admin@fonomed.com"})
    if not admin_exists:
        admin_user = {
            "_id": "admin@fonomed.com",
            "email": "admin@fonomed.com",
            "name": "Admin FonoMed",
            "password": hashed_pw,
            "picture": None,
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_user)
        print("✅ Admin criado: admin@fonomed.com / demo123")
    else:
        print("⚠️  Admin já existe")
    
    # 2. Therapist User
    therapist_exists = await db.users.find_one({"_id": "therapist@fonomed.com"})
    therapist_id = "therapist@fonomed.com"
    if not therapist_exists:
        therapist_user = {
            "_id": therapist_id,
            "email": "therapist@fonomed.com",
            "name": "Dr. Maria Silva",
            "password": hashed_pw,
            "picture": None,
            "role": "therapist",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(therapist_user)
        
        # Create therapist profile
        therapist_profile = {
            "id": str(uuid.uuid4()),
            "user_id": therapist_id,
            "full_name": "Dra. Maria Silva",
            "crfa_number": "12345-SP",
            "specialties": ["Linguagem Infantil", "Disfagia", "Voz Profissional"],
            "bio": "Fonoaudióloga com 10 anos de experiência em atendimento infantil e reabilitação vocal.",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.therapists.insert_one(therapist_profile)
        print("✅ Fonoaudiólogo criado: therapist@fonomed.com / demo123")
    else:
        print("⚠️  Fonoaudiólogo já existe")
    
    # 3. Patient User
    patient_exists = await db.users.find_one({"_id": "patient@fonomed.com"})
    patient_user_id = "patient@fonomed.com"
    if not patient_exists:
        patient_user = {
            "_id": patient_user_id,
            "email": "patient@fonomed.com",
            "name": "João Santos",
            "password": hashed_pw,
            "picture": None,
            "role": "patient",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(patient_user)
        
        # Create patient profile
        patient_profile = {
            "id": str(uuid.uuid4()),
            "user_id": patient_user_id,
            "full_name": "João Santos",
            "birth_date": "2015-05-15",
            "cpf": "123.456.789-00",
            "phone": "(11) 98765-4321",
            "address": "Rua das Flores, 123 - São Paulo",
            "diagnosis": "Atraso de fala, dificuldade com fonema /R/",
            "observations": "Criança colaborativa, mãe presente nas sessões.",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.patients.insert_one(patient_profile)
        print("✅ Paciente criado: patient@fonomed.com / demo123")
    else:
        print("⚠️  Paciente já existe")
    
    print("\n🎉 Setup completo!")
    print("\n📋 Credenciais de acesso:")
    print("=" * 50)
    print("Admin:          admin@fonomed.com / demo123")
    print("Fonoaudiólogo:  therapist@fonomed.com / demo123")
    print("Paciente:       patient@fonomed.com / demo123")
    print("=" * 50)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_users())
