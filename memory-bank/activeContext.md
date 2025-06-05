# Active Context: AI Book Agent Platform

## Current Work Focus

The focus has been on establishing the data ingestion pipeline using Celery for asynchronous processing and structuring the API routes according to standard Flask practices. This includes:

- Modularizing API routes by creating separate Blueprints.
- Defining Celery tasks to process individual book chunks for embedding and storage.
- Ensuring the Flask application correctly registers all Blueprints.

## Recent Changes

- **Route Modularization**:
  - `server/routes/train_routes.py`: Created this new file to house the training-related API endpoints.
    - Defined a new Blueprint `train_bp` with `url_prefix='/api/train'`.
    - The `/api/train/` POST endpoint (previously in `main.py`) is now located here as `@train_bp.route('/', methods=['POST'])`.
  - `server/routes/main.py`:
    - The `/api/train` route and its specific dependencies (like `process_single_chunk_task` import and `request` object) were removed.
  - `server/app.py`:
    - Imported `train_bp` from `server.routes.train_routes`.
    - Registered `train_bp` with the Flask application.
    - Adjusted import path for `main_bp` for consistency (`server.routes.main`).
- `server/services/queue/tasks.py`:
  - **Completed `process_single_chunk_task`**: Updated the task to use `EmbeddingService` and `VectorStoreService` instances. Import paths within this task are set to `from services...` and `from config...`.
  - (Previous change, still relevant) Defined `process_single_chunk_task` for handling individual chunks.
  - (Previous change, still relevant) Renamed and updated `process_context_data` task.
- **Python Packaging for Celery**:
  - Created `server/services/__init__.py` and `server/services/queue/__init__.py` to ensure `services` and `services.queue` are treated as Python packages. This is crucial for Celery's task discovery mechanism.
- **Service Implementation**:
  - `server/services/embedding_service.py`: **Implemented** `EmbeddingService` using `langchain_google_genai.GoogleGenerativeAIEmbeddings` (model `models/embedding-001`).
  - `server/services/vector_store_service.py`: **User-Updated and Fixed** `VectorStoreService`. The user resolved the `TypeError` during Pinecone initialization. Key changes include:
    - Pinecone client initialized with `Pinecone(api_key=Config.PINECONE_API_KEY)` (environment parameter removed).
    - Index existence check changed to `if self.index_name not in self.pinecone.list_indexes().names():`, correctly calling `.names()` as a method. This resolved the "argument of type 'method' is not iterable" error.
    - The explicit `time.sleep` loop for waiting for index readiness after creation was removed by the user.
- `memory-bank/techContext.md`: (Previous change, still relevant) Corrected "RQ tasks" to "Celery tasks".

## Next Steps

With `EmbeddingService` implemented and `VectorStoreService` fixed by the user, `process_single_chunk_task` calling them, and Python packaging for Celery task discovery addressed, the core data ingestion pipeline services should be functional. The next critical steps are:

- **Celery Worker Verification**:
  - The user has indicated the issue is solved, implying the Celery worker now processes tasks correctly without the Pinecone-related `TypeError`.
- **Configuration**:
  - Ensure API keys and other necessary configurations for Gemini and Pinecone are correctly loaded via `server/config/settings.py` and `.env`.
- **Testing**:
  - Thoroughly test the `/api/train/` endpoint.
  - Verify that Celery tasks are created, processed, and interact correctly with (mocked or real) embedding and vector store services.
  - Ensure all registered Blueprints and routes are functioning as expected.
- **Documentation**: Continue updating memory bank files as development progresses.

## Active Decisions and Considerations

- **Error Handling**: Refine error handling within `process_single_chunk_task` for embedding and Pinecone operations. Decide on retry strategies for transient errors.
- **Service Initialization**: Determine the best way to initialize and access `EmbeddingService` and `VectorStoreService` within Celery tasks (e.g., global instances, initialized per task, or passed as arguments if feasible).
- **Batching for Pinecone**: While tasks are per-chunk, consider if `VectorStoreService` should internally batch upserts to Pinecone for efficiency if many tasks run concurrently. (Current task `process_single_chunk_task` prepares a single vector for upsert).
- **Security**: Ensure API keys and sensitive data are handled securely.
- **Scalability**: Keep in mind the potential for a large number of chunks and tasks.
