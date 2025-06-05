import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv('PORT', 8080)
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't')
    # Add other configurations here as needed
