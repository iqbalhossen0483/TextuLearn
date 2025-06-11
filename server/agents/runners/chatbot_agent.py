from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from agents.agent import root_agent
from google.genai import types
import asyncio
from threading import Thread
from queue import Queue
from flask import current_app
import json
from datetime import timezone, datetime
from bson import ObjectId

sessions = InMemorySessionService()

def chatbot_agent_response(user_input, user_id, session_id=None, files=None, save= True):
    if not user_id or not user_input:
        yield f"error: Invalid arguments\n\n"
        return

    q = Queue()

    def start_async_loop(app_context):
        with app_context:  # Ensure Flask app context inside the thread
            asyncio.run(main_async(q))

    async def main_async(q):
        APP_NAME = "Chatbot_Agent"
        USER_ID = str(user_id)  # Ensure it's str for ADK compatibility
        SESSION_ID = str(session_id) if session_id else None

        try:
            # Check if session exists
            has_session = await sessions.list_sessions(app_name=APP_NAME, user_id=USER_ID)
            session = next((s for s in has_session.sessions if str(s.id) == SESSION_ID), None)

            # Get DB collection
            mongo_service = current_app.mongo_service
            session_history = mongo_service.get_collection('sessions')

            if not session:
                # Save to DB
                payload = {
                    "user_id": ObjectId(USER_ID),
                    "conversations": [{
                        "text": user_input,
                        "sender": "user",
                        "files": []  # You can store filenames here if needed
                    }],
                    "created_at": datetime.now(timezone.utc)
                }
                result = session_history.insert_one(payload)
                SESSION_ID = str(result.inserted_id)
                print(f"new session created: {SESSION_ID}")

                # Create ADK session
                new_session = await sessions.create_session(
                    app_name=APP_NAME,
                    user_id=USER_ID,
                    session_id=SESSION_ID,
                    state=None
                )
                SESSION_ID = str(new_session.id)
                q.put(f"json: {json.dumps({'session_id': SESSION_ID})}\n\n")
            else:
                print(f"Already have this session exist")
                if save :
                    session_history.update_one(
                        {"_id": ObjectId(SESSION_ID)},
                        {
                            "$push": {
                                "conversations": {
                                    "text": user_input,
                                    "sender": "user"
                                }
                            }
                        }
                    )
                
            # Prepare agent runner
            runner = Runner(
                agent=root_agent,
                app_name=APP_NAME,
                session_service=sessions,
            )

            # Create content with possible files
            parts = [types.Part(text=user_input)]
            if files:
                for f in files:
                    file_bytes = f.read()
                    parts.append(types.Part(inline_data={
                        "mime_type": f.mimetype,
                        "data": file_bytes
                    }))

            content = types.Content(role="user", parts=parts)

            agent_response = ""
            async for event in runner.run_async(
                user_id=USER_ID,
                session_id=SESSION_ID,
                new_message=content
            ):
                if event.content and event.content.parts:
                    text = event.content.parts[0].text
                    if text:
                        q.put(f"data: {text}\n\n")
                        agent_response += text + " "

            # Save assistant response to MongoDB
            session_history.update_one(
                {"_id": ObjectId(SESSION_ID)},
                {
                    "$push": {
                        "conversations": {
                            "text": agent_response.strip(),
                            "sender": "assistant"
                        }
                    }
                }
            )

        except Exception as e:
            print(f"Error during agent run: {e}")
            q.put(f"error: {str(e)}\n\n")

        finally:
            q.put(None)  # Signal end of stream

    # Start async thread with Flask app context
    t = Thread(target=start_async_loop, args=(current_app._get_current_object().app_context(),))
    t.start()

    # Stream output
    while True:
        chunk = q.get()
        if chunk is None:
            break
        yield chunk
