from typing import Optional, Dict, Any, List
from services.vector_store_service import VectorStoreService
from services.embedding_service import EmbeddingService
from config.settings import Config


def fetch_data_from_db(query: str, filter_metadata: Optional[Dict[str, Any]] = None):
    """
    Retrieves the most relevant context chunks from Pinecone based on a user query,
    optionally filtering by metadata such as writer or book name.

    Args:
        query (str): The natural language question or prompt from the user.
        filter_metadata (Optional[Dict[str, Any]]): A dictionary of metadata fields to filter by.
            Supported keys include:
                - "writer": Filter by the name of the book's author.
                - "book_name": Filter by the title of the book.

    Returns:
        List[str]: A list of 'chunk_text' entries from Pinecone that are most semantically
        similar to the query and optionally filtered by metadata. Results are ordered by relevance.

    Purpose:
        This function embeds the query using the same embedding model used during ingestion,
        performs a similarity search in Pinecone, applies optional metadata filtering,
        and returns the top-matching context chunks. These chunks are intended for use
        by downstream educational agents (e.g., Q&A, summarization, explanation agents).
    """
    embedding_service = EmbeddingService()
    vector_store_service = VectorStoreService(index_name=Config.PINECONE_INDEX_NAME)

    embedding_vector = embedding_service.generate_embedding(query)
    vector_data: List[Dict[str, Any]] = vector_store_service.query_vectors(
        embedding_vector, filter_metadata=filter_metadata
    )

    chunk_texts: List[str] = []
    if vector_data:
        for match in vector_data:
            metadata = match.get("metadata")
            if metadata and "chunk_text" in metadata:
                chunk_texts.append(metadata["chunk_text"])
            
    return chunk_texts
