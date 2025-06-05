import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv('PORT', 8080)
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CELERY_RESULT_BACKEND = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    # Add other configurations here as needed
