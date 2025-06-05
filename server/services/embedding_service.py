from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config.settings import Config
import logging

logger = logging.getLogger(__name__)

class EmbeddingService:
    def __init__(self):
        """
        Initializes the EmbeddingService with Google Generative AI Embeddings.
        Relies on GOOGLE_API_KEY being set in the environment.
        """
        try:
            self.embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=Config.GOOGLE_API_KEY)
            logger.info("EmbeddingService initialized with GoogleGenerativeAIEmbeddings (model: models/embedding-001).")
        except Exception as e:
            logger.error(f"Failed to initialize GoogleGenerativeAIEmbeddings: {e}")
            raise e

    def generate_embedding(self, text: str):
        """
        Generates an embedding for the given text using Google Generative AI Embeddings.
        """
        if not text or not isinstance(text, str):
            logger.warning("Invalid text input for embedding generation.")
            raise ValueError("Invalid text input for embedding generation.")

        logger.debug(f"Generating embedding for text: {text[:100]}...")
        try:
            embedding_vector = self.embedding_model.embed_query(text)
            logger.info(f"Successfully generated embedding for text: {text[:50]}...")
            return embedding_vector
        except Exception as e:
            logger.error(f"Error generating embedding for text '{text[:50]}...': {e}")
            raise e
