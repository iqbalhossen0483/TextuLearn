from flask import Blueprint, jsonify, request, Response, stream_with_context
from agents.runners.chatbot_agent import chatbot_agent_response

agent_bp = Blueprint('agent_bp', __name__, url_prefix="/api/agent")

@agent_bp.route('/chatbot', methods=["POST"])
def chatbot_agent():
    body = request.form
    user_input = body.get("question")
    user_id = body.get("user_id")
    session_id = body.get("session_id")
    save = body.get("save")

    print(f"user_input: {user_input}, user_id: {user_id}, session_id: {session_id}, save: {save}")

    if not user_id or not user_input:
        return jsonify({"message": "Invalid arguments"}), 400
    
    files = request.files.getlist("files")

    res = Response(stream_with_context(chatbot_agent_response(user_input=user_input, user_id=user_id, session_id=session_id, files=files)), content_type="text/event-stream")
    res.headers["Connection"] = "keep-alive"
    res.headers["Cache-Control"] = "no-cache"

    return res
