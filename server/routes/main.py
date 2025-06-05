from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def home():
    return jsonify({"message": "Welcome to the AI Book Agent Platform API!"})

@main_bp.route('/health')
def health_check():
    return jsonify({"status": "healthy"})
