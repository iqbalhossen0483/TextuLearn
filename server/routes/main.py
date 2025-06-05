from flask import Blueprint, jsonify
from services.queue.tasks import proccess_context_data

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return jsonify({"message": "Welcome to the AI Book Agent Platform API!"})

@main_bp.route('/health')
def health_check():
    return jsonify({"status": "healthy"})
