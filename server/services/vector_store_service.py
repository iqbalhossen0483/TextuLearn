from typing import List, Dict, Any, Optional
from config.settings import Config
from pinecone import Pinecone, ServerlessSpec
import logging

logger = logging.getLogger(__name__)

class VectorStoreService:
    def __init__(self, index_name: str):
        self.index_name = index_name

        try:
            # Initialize Pinecone client
            self.pinecone = Pinecone(api_key=Config.PINECONE_API_KEY)

            # Check if index exists
            if self.index_name not in self.pinecone.list_indexes().names():
                logger.info(f"Index '{self.index_name}' not found. Creating a new one...")

                self.pinecone.create_index(
                    name=self.index_name,
                    dimension=768,  # or whatever your embedding dimension is
                    metric="cosine",
                    spec=ServerlessSpec(
                        cloud="aws",         # or "gcp"
                        region="us-east-1"   # choose based on your needs
                    )
                )

            # Connect to the index
            self.index = self.pinecone.Index(self.index_name)
            logger.info(f"Pinecone index '{self.index_name}' initialized and connected successfully.")

        except Exception as e:
            logger.error(f"Pinecone init or connection failed: {e}")
            raise

    def upsert_vectors(self, vectors: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Upserts vectors into Pinecone index.
        Each vector should be a dict: {'id': str, 'values': List[float], 'metadata': Optional[dict]}
        """
        if not vectors:
            logger.warning("No vectors provided to upsert.")
            raise ValueError("No vectors provided for upsertion.")

        logger.info(f"Upserting {len(vectors)} vector(s) to index '{self.index_name}'...")
        try:
            result = self.index.upsert(vectors=vectors)
            logger.info(f"Upserted vectors. Response: {result}")
            return result
        except Exception as e:
            logger.error(f"Upsert failed: {e}")
            raise

    def query_vectors(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Queries similar vectors from Pinecone index using a query embedding.
        """
        if not query_embedding:
            logger.warning("Query embedding is empty.")
            raise ValueError("Query embedding must be provided.")

        logger.info(f"Querying index '{self.index_name}' for top {top_k} matches.")
        try:
            query_params = {
                "vector": query_embedding,
                "top_k": top_k,
                "include_metadata": True
            }

            if filter_metadata:
                query_params["filter"] = filter_metadata

            results = self.index.query(**query_params)
            matches = results.get('matches', [])
            logger.info(f"Query returned {len(matches)} match(es).")
            return matches
        except Exception as e:
            logger.error(f"Query failed: {e}")
            raise
