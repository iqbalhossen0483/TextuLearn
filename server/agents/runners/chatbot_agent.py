from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from agents.agent import root_agent
from google.genai import types


sessions = InMemorySessionService()

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from agents.agent import root_agent
from google.genai import types

import asyncio
from threading import Thread
from queue import Queue

sessions = InMemorySessionService()

def chatbot_agent_response(user_input, user_id, session_id=None, files=None):
    q = Queue()

    def start_async_loop():
        asyncio.run(main_async(q))

    async def main_async(q):
        APP_NAME = "Chatbot_Agent"
        USER_ID = user_id
        SESSION_ID = session_id

        try:
            # ✅ Await list_sessions
            has_session = await sessions.list_sessions(app_name=APP_NAME, user_id=USER_ID)
            session = next((s for s in has_session.sessions if s.id == SESSION_ID), None)

            # ✅ Await create_session
            if not SESSION_ID or not session:
                new_session = await sessions.create_session(
                    app_name=APP_NAME,
                    user_id=USER_ID,
                    session_id=SESSION_ID,
                    state=None,
                )
                SESSION_ID = new_session.id

            runner = Runner(
                agent=root_agent,
                app_name=APP_NAME,
                session_service=sessions,
            )

            # Build message content
            parts = [types.Part(text=user_input)]
            if files:
                for f in files:
                    file_bytes = f.read()
                    parts.append(types.Part(inline_data={
                        "mime_type": f.mimetype,
                        "data": file_bytes
                    }))

            content = types.Content(role="user", parts=parts)

            # Stream response
            async for event in runner.run_async(
                user_id=USER_ID,
                session_id=SESSION_ID,
                new_message=content
            ):
                if event.content and event.content.parts:
                    text = event.content.parts[0].text
                    if text:
                        q.put(f"data: {text}\n\n")

        except Exception as e:
            print(f"Error during agent run: {e}")
            q.put(f"data: Error: {str(e)}\n\n")

        finally:
            q.put(None)  # Signal end of stream

    # Start async processing thread
    t = Thread(target=start_async_loop)
    t.start()

    # Yield results from queue (stream to client)
    while True:
        chunk = q.get()
        if chunk is None:
            break
        yield chunk


