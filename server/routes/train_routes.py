from flask import Blueprint, jsonify, request
from services.queue.tasks import process_single_chunk_task

train_bp = Blueprint('train', __name__, url_prefix='/api/train')

@train_bp.route('/', methods=['POST'])
def train_book_data_route():
    """
    API endpoint to receive book data for training.
    Expects a JSON payload with:
    {
        "writer": "Writer Name",
        "book_name": "Book Name",
        "data": ["chunk 1 text", "chunk 2 text", ...]
    }
    """
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    content = request.get_json()
    writer = content.get('writer')
    book_name = content.get('book_name')
    data_chunks = content.get('data')

    if not all([writer, book_name, data_chunks]):
        return jsonify({"error": "Missing required fields: writer, book_name, data"}), 400

    if not isinstance(data_chunks, list) or not all(isinstance(chunk, str) for chunk in data_chunks):
        return jsonify({"error": "'data' must be a list of strings"}), 400
    
    if not data_chunks:
        return jsonify({"error": "'data' list cannot be empty"}), 400

    task_ids = []
    for index, chunk_text in enumerate(data_chunks):
        # Dispatch a separate task for each chunk
        task = process_single_chunk_task.delay(
            writer=writer,
            book_name=book_name,
            chunk_text=chunk_text,
            chunk_index=index + 1 # Pass 1-based index for sequence
        )
        task_ids.append(task.id)
    
    return jsonify({
        "message": f"{len(data_chunks)} chunks received and queued for processing.",
        "task_ids": task_ids
    }), 202
