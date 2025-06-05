# Technical Context: AI Book Agent Platform (Backend Server)

## 1. Technologies Used

| Purpose        | Tool/Library                  | Version (Target) | Notes                                                             |
| :------------- | :---------------------------- | :--------------- | :---------------------------------------------------------------- |
| API Server     | Flask                         | Latest Stable    | Lightweight web framework for REST API.                           |
| Task Queue     | Celery                        | Latest Stable    | Asynchronous task queue for background processing.                |
| Queue Broker   | Redis (via Celery)            | Latest Stable    | Message broker and result backend for Celery.                     |
| Embedding      | LangChain (Gemini Embeddings) | Latest Stable    | Facilitates interaction with Google Gemini for text embeddings.   |
| Vector Store   | Pinecone                      | Latest Stable    | Cloud-native vector database for efficient similarity search.     |
| Agents         | Google Agent Development Kit  | Latest Stable    | Framework for building and orchestrating AI agents.               |
| LLM            | Google Gemini Pro             | Latest Stable    | Large Language Model for all generative AI tasks.                 |
| Storage Format | JSON + Pinecone Metadata      | N/A              | Data payload for API requests and metadata stored in Pinecone.    |
| Deployment     | Gunicorn + Docker (optional)  | Latest Stable    | Gunicorn for production WSGI server, Docker for containerization. |
| Environment    | Python                        | 3.9+             | Primary programming language.                                     |

## 2. Development Setup

- **Python Environment**: It is recommended to use a virtual environment (e.g., `venv` or `conda`) to manage dependencies.
- **Dependency Management**: `requirements.txt` will list all Python dependencies.
- **Environment Variables**: Critical API keys and configurations (`PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `GOOGLE_API_KEY`, `PINECONE_INDEX_NAME`, `REDIS_URL`) will be managed via a `.env` file.
- **Redis Server**: A running Redis server is required for Celery to function as a broker.

## 3. Technical Constraints

- **Pre-chunked Data**: The backend expects book content to be pre-chunked by the frontend. The backend is not responsible for chunking logic.
- **Google ADK Dependency**: The core agent logic is tightly coupled with Google ADK, requiring adherence to its patterns and capabilities.
- **Pinecone Index Name**: A single Pinecone index (`book-index`) is specified for storing all book embeddings.
- **API Key Requirements**: Google API Key and Pinecone API Key/Environment are mandatory for the system to function.
- **Redis Availability**: Celery tasks will fail if the Redis server is not accessible at the configured `REDIS_URL`.

## 4. Dependencies

- **Flask**: For building the web server and API endpoints.
- **Celery**: For asynchronous task processing.
- **Redis**: For RQ's message broker.
- **LangChain**: For integrating with Google Gemini for embeddings and potentially other LLM operations.
- **Pinecone Client**: For interacting with the Pinecone vector database.
- **Google ADK Libraries**: For defining and running the AI agents.
- **python-dotenv**: For loading environment variables from `.env`.
- **Gunicorn**: For production deployment (if applicable).
