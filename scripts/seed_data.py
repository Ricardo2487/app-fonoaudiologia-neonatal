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

# Load environment
load_dotenv('/app/backend/.env')

async def seed_database():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🌱 Starting database seeding...")
    
    # Sample Exercises
    exercises = [
        {
            "id": str(uuid.uuid4()),
            "title": "Exercício do Som /R/",
            "description": "Pratique a pronúncia correta do som /R/ em diferentes posições",
            "category": "fonema",
            "difficulty_level": "médio",
            "media_urls": ["https://images.unsplash.com/photo-1617994452722-4145e196248b"],
            "instructions": "1. Posicione a língua no céu da boca\n2. Vibre a ponta da língua\n3. Repita: rato, carro, porta, ferro\n4. Pratique 10 repetições de cada palavra",
            "estimated_time": 15,
            "frequency": "3x por semana",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Exercício do Som /S/",
            "description": "Melhore a articulação do som /S/ sibilante",
            "category": "fonema",
            "difficulty_level": "fácil",
            "media_urls": [],
            "instructions": "1. Coloque a língua atrás dos dentes superiores\n2. Deixe o ar passar pelos lados\n3. Repita: sapo, casa, osso, passo\n4. Pratique em frente ao espelho",
            "estimated_time": 10,
            "frequency": "diário",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Respiração Diafragmática",
            "description": "Fortalecimento da respiração para melhor controle vocal",
            "category": "respiração",
            "difficulty_level": "fácil",
            "media_urls": [],
            "instructions": "1. Deite-se confortavelmente\n2. Coloque uma mão no peito e outra na barriga\n3. Inspire pelo nariz enchendo a barriga\n4. Expire lentamente pela boca\n5. Repita 10 vezes",
            "estimated_time": 10,
            "frequency": "2x por dia",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Exercícios de Ritmo",
            "description": "Melhore o ritmo e a fluência da fala",
            "category": "ritmo",
            "difficulty_level": "médio",
            "media_urls": [],
            "instructions": "1. Bata palmas seguindo um padrão rítmico\n2. Fale palavras sincronizadas com as palmas\n3. Aumente gradualmente a velocidade\n4. Pratique frases completas com ritmo",
            "estimated_time": 20,
            "frequency": "3x por semana",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Alongamento da Língua",
            "description": "Fortalecimento e mobilidade da musculatura da língua",
            "category": "motricidade",
            "difficulty_level": "fácil",
            "media_urls": [],
            "instructions": "1. Estique a língua para fora o máximo possível\n2. Toque o nariz com a ponta da língua\n3. Toque o queixo\n4. Mova a língua de um lado para outro\n5. Repita cada movimento 10 vezes",
            "estimated_time": 8,
            "frequency": "diário",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Vocalização de Vogais",
            "description": "Exercício para clareza e projeção vocal",
            "category": "voz",
            "difficulty_level": "fácil",
            "media_urls": [],
            "instructions": "1. Em pé, com postura ereta\n2. Inspire profundamente\n3. Vocalize cada vogal sustentando por 5 segundos: A-E-I-O-U\n4. Varie a intensidade e o tom\n5. Repita 3 séries",
            "estimated_time": 12,
            "frequency": "diário",
            "created_by": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Check if exercises already exist
    existing_count = await db.exercises.count_documents({})
    if existing_count > 0:
        print(f"⚠️  Database already has {existing_count} exercises. Skipping seed.")
    else:
        await db.exercises.insert_many(exercises)
        print(f"✅ Inserted {len(exercises)} sample exercises")
    
    # Create admin user if not exists
    admin_user = await db.users.find_one({"_id": "admin@fonomed.com"})
    if not admin_user:
        admin_user_doc = {
            "_id": "admin@fonomed.com",
            "email": "admin@fonomed.com",
            "name": "Admin FonoMed",
            "picture": None,
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_user_doc)
        print("✅ Created admin user (admin@fonomed.com)")
    else:
        print("⚠️  Admin user already exists")
    
    print("\n🎉 Database seeding completed successfully!")
    print("\nAvailable test users:")
    print("  - Email: admin@fonomed.com (role: admin)")
    print("\nTo login with email/password, you need to register first through the app.")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
