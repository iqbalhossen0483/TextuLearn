import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv('PORT', 8080)
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CELERY_RESULT_BACKEND = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/book_agent")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key_here") # IMPORTANT: Change this in .env for production!
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
    PINECONE_INDEX_NAME= os.getenv("PINECONE_INDEX_NAME")
