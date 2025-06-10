from flask import Flask
from flask_cors import CORS
from config.settings import Config
from services.mongo_service import MongoService

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"], supports_credentials=True)

    # Initialize services
    mongo_service = MongoService()
    app.mongo_service = mongo_service

    # Register blueprints here
    from routes.main import main_bp 
    app.register_blueprint(main_bp)

    from routes.train_routes import train_bp 
    app.register_blueprint(train_bp)

    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    from routes.agents import agent_bp
    app.register_blueprint(agent_bp)

    return app
