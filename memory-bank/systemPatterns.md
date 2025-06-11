# System Patterns: AI Book Agent Platform (Backend Server)

## 1. System Architecture Overview

The AI Book Agent Platform follows a modular, layered architecture designed for clarity, maintainability, and scalability. It comprises a Next.js frontend and a Python/Flask backend with a Celery task queue.

```mermaid
graph TD
    subgraph User Facing
        A[Next.js Frontend]
    end

    subgraph Backend Infrastructure
        B(Flask API Gateway)
        C{Request Router}
        D[Services Layer]
        E[Vector Store (Pinecone)]
        F[AI Agents (Google ADK)]
        G[LLM (Google Gemini Pro)]
        H[Celery Tasks]
        I[Redis (Broker/Backend)]
    end

    A --> B;
    B --> C;
    C --> D;
    D --> E;
    D --> F;
    F --> G;
    B --> H;
    H --> I;

    style A fill:#ccf,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#f9f,stroke:#333,stroke-width:2px
    style H fill:#bbf,stroke:#333,stroke-width:2px
    style I fill:#f9f,stroke:#333,stroke-width:2px
```

## 2. Key Technical Decisions

- **RESTful API with Flask**: Flask is chosen for its lightweight nature and flexibility, suitable for building a clear RESTful interface.
- **LangChain for Embeddings**: LangChain provides a convenient abstraction for integrating with Google Gemini Embeddings, simplifying the process of converting text chunks into vector representations.
- **Pinecone for Vector Storage**: Pinecone is selected as the dedicated vector database for its efficiency in similarity search and scalability, crucial for handling large volumes of book data.
- **Google Agent Development Kit (ADK)**: ADK is central to orchestrating the various AI agents, allowing for structured and extensible agent logic.
- **Google Gemini Pro as LLM**: Gemini Pro is the chosen large language model for all AI agent interactions, providing advanced natural language understanding and generation capabilities.
- **Celery for Asynchronous Tasks**: Celery is integrated to handle long-running or background tasks asynchronously, improving API responsiveness.
- **Redis as Celery Broker/Backend**: Redis is used as the message broker and result backend for Celery, providing efficient message queuing and task state storage.
- **Modular Codebase**: The project is structured into `frontend/` and `server/` directories, with further subdivisions like `server/agents/`, `server/services/`, `server/routes/`, and `server/config/` to promote separation of concerns.
- **Next.js for Frontend**: Next.js is chosen for its capabilities in server-side rendering, static site generation, and overall developer experience for React-based applications.
- **Tailwind CSS for Styling**: Tailwind CSS is used for its utility-first approach, enabling rapid UI development and consistent styling.

## 3. Design Patterns in Use

- **API Gateway Pattern**: Flask acts as an API Gateway, providing a single entry point for frontend requests and routing them to appropriate backend services.
- **Service Layer Pattern**: The `services/` directory encapsulates core business logic (embedding, vector storage, retrieval), promoting reusability and testability.
- **Agent-Based Architecture**: Leveraging Google ADK, the system employs distinct AI agents for specific tasks (chat, Q&A generation, answer selection), enhancing modularity and specialized intelligence.
- **Dependency Injection (Implicit)**: Configuration and external service clients (Pinecone, Gemini) will likely be passed into services and agents, promoting loose coupling.

## 4. Component Relationships

- **Next.js Frontend <--> Flask API**: The Next.js frontend communicates exclusively with the Flask API endpoints for all backend operations.
- **Flask API <--> Services/Agents**: Flask routes delegate requests to appropriate functions within the `server/services/` layer or directly to agent runners (e.g., in `server/agents/runners/`).
- **Services <--> Pinecone**: The `vector_store.py` service interacts directly with Pinecone for storing and retrieving vector embeddings.
- **Services <--> AI Agents**: The `retriever.py` service (if used by an agent) fetches relevant context, which is then passed to the AI agents for processing.
- **AI Agent Runners <--> MongoDB**: Agent runners (e.g., `chatbot_agent.py`) can interact directly with MongoDB (via `mongo_service`) for tasks like managing session history.
- **AI Agents <--> LLM**: AI agents utilize the Google Gemini Pro LLM (via LangChain or directly through ADK) to generate responses based on retrieved context and user queries.
- **Flask API <--> Celery**: Flask endpoints can dispatch tasks to Celery for asynchronous processing.
- **Celery <--> Redis**: Celery uses Redis as its message broker to queue tasks and as a backend to store task results.
