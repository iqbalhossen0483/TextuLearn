import uuid
import logging
from .celery_config import celery_app
from services.embedding_service import EmbeddingService
from services.vector_store_service import VectorStoreService
from config.settings import Config

logger = logging.getLogger(__name__)

@celery_app.task(bind=True, max_retries=3, default_retry_delay=60)
def process_single_chunk_task(self, writer: str, book_name: str, chunk_text: str, chunk_index: int):
    """
    Celery task to process a single book chunk:
    1. Generate embedding for the chunk.
    2. Store embedding and metadata in Pinecone.
    """
    chunk_id = str(uuid.uuid4())
    logger.info(
        f"Starting process_single_chunk_task for book: '{book_name}' by '{writer}', "
        f"chunk {chunk_index} (ID: {chunk_id})."
    )

    embedding_service = EmbeddingService()
    vector_store_service = VectorStoreService(index_name=Config.PINECONE_INDEX_NAME)

    try:
        # 1. Generate embedding
        embedding_vector = embedding_service.generate_embedding(chunk_text)
        logger.debug(f"Generated embedding for chunk {chunk_id}")

        # 2. Prepare vector for Pinecone
        vector_data = {
            "id": chunk_id,
            "values": embedding_vector,
            "metadata": {
                "writer": writer,
                "book_name": book_name,
                "chunk_text": chunk_text,
                "chunk_sequence_id": chunk_index
            }
        }

        # 3. Upsert vector to Pinecone
        vector_store_service.upsert_vectors([vector_data]) # Upsert expects a list
        logger.info(
            f"Successfully upserted vector for chunk {chunk_id} to Pinecone."
        )
        # Simulate upsert

        return (
            f"Successfully processed chunk {chunk_index} (ID: {chunk_id}) "
            f"for book: '{book_name}' by '{writer}'."
        )

    except Exception as e:
        logger.error(f"Error processing chunk {chunk_id} for '{book_name}': {e}")
        # Retry the task based on Celery's retry settings
        raise self.retry(exc=e)
