from flask import current_app
from bson import ObjectId

def update_session_title(session_id:str, title: str):
  """
  Updates the title of a specific session in the MongoDB 'sessions' collection.

    Args:
        session_id (str): The unique ID of the session document to update.
        title (str): The new title to set for the session.

    Raises:
        Exception: If the MongoDB update operation fails or session is not found.

    Note:
        This function uses the current Flask application context to access the
        MongoDB service and assumes that 'mongo_service' is properly initialized.
  """
  # Get DB collection
  mongo_service = current_app.mongo_service
  session_history = mongo_service.get_collection('sessions')
  session_history.update_one(
    {"_id": ObjectId(session_id)},
    { "$set": { "title": title } }
  )
  return f"session updated successfully"