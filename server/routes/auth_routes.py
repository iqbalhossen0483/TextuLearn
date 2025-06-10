from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta, timezone
import jwt

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('confirm_password'):
        return jsonify({"message": "Email, password, and confirm_password are required"}), 400

    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    name = data["name"]

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    mongo_service = current_app.mongo_service
    users_collection = mongo_service.get_collection('users')

    # Check if email already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 409

    hashed_password = generate_password_hash(password)
    
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now(timezone.utc)
    }
    result = users_collection.insert_one(user_data)
    user_id = result.inserted_id

    # Generate JWT token for the new user
    payload = {
        'user_id': str(user_id),
        'email': email, # Using email as it's the primary identifier now
        'exp': datetime.now(timezone.utc) + timedelta(hours=current_app.config.get('JWT_EXPIRATION_HOURS', 24))
    }
    
    secret_key = current_app.config.get('SECRET_KEY')
    if not secret_key:
        # Log this error, as it's a critical configuration issue
        print("CRITICAL: SECRET_KEY is not configured in the application.")
        # Don't fail registration, but log that token generation failed.
        # Alternatively, you could decide to fail registration if token cannot be generated.
        return jsonify({"message": "User registered successfully, but token generation failed. Please login.", "user_id": str(user_id)}), 201

    token = jwt.encode(payload, secret_key, algorithm="HS256")

    user_response_data = {
        "id": str(user_id),
        "name": name,
        "email": email,
        "created_at": user_data["created_at"].isoformat()
    }

    return jsonify({"message": "User registered successfully", "token": token, "user": user_response_data}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    mongo_service = current_app.mongo_service
    users_collection = mongo_service.get_collection('users')

    user = users_collection.find_one({"email": email})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid email or password"}), 401
    
    payload = {
        'user_id': str(user['_id']),
        'email': user['email'],
        'exp': datetime.now(timezone.utc) + timedelta(hours=current_app.config.get('JWT_EXPIRATION_HOURS', 24))
    }
    
    secret_key = current_app.config.get('SECRET_KEY')
    if not secret_key:
        # Log this error, as it's a critical configuration issue
        print("CRITICAL: SECRET_KEY is not configured in the application.")
        return jsonify({"message": "Internal server error: JWT secret not configured."}), 500
        
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    user_response_data = {
        "id": str(user['_id']),
        "email": user['email'],
        "created_at": user.get("created_at").isoformat() if user.get("created_at") else None 
    }

    return jsonify({"message": "Login successful", "token": token, "user": user_response_data}), 200
