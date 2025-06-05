from flask import Flask
from config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register blueprints here
    from routes.main import main_bp 
    app.register_blueprint(main_bp)

    from routes.train_routes import train_bp 
    app.register_blueprint(train_bp) 

    return app
