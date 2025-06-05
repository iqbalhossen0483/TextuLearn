# System Patterns: AI Book Agent Platform (Backend Server)

## 1. System Architecture Overview

The AI Book Agent Platform backend follows a modular, layered architecture designed for clarity, maintainability, and scalability.

```mermaid
graph TD
    A[Frontend] --> B(Flask API Gateway);
    B --> C{Request Router};
    C --> D[Services Layer];
    D --> E[Vector Store (Pinecone)];
    D --> F[AI Agents (Google ADK)];
    F --> G[LLM (Google Gemini Pro)];

    subgraph Backend
        B
        C
        D
        E
        F
        G
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#f9f,stroke:#333,stroke-width:2px
```

## 2. Key Technical Decisions

- **RESTful API with Flask**: Flask is chosen for its lightweight nature and flexibility, suitable for building a clear RESTful interface.
- **LangChain for Embeddings**: LangChain provides a convenient abstraction for integrating with Google Gemini Embeddings, simplifying the process of converting text chunks into vector representations.
- **Pinecone for Vector Storage**: Pinecone is selected as the dedicated vector database for its efficiency in similarity search and scalability, crucial for handling large volumes of book data.
- **Google Agent Development Kit (ADK)**: ADK is central to orchestrating the various AI agents, allowing for structured and extensible agent logic.
- **Google Gemini Pro as LLM**: Gemini Pro is the chosen large language model for all AI agent interactions, providing advanced natural language understanding and generation capabilities.
- **Modular Codebase**: The project is structured into `agents/`, `services/`, ``routes/`, and `config/` directories to promote separation of concerns and improve maintainability.

## 3. Design Patterns in Use

- **API Gateway Pattern**: Flask acts as an API Gateway, providing a single entry point for frontend requests and routing them to appropriate backend services.
- **Service Layer Pattern**: The `services/` directory encapsulates core business logic (embedding, vector storage, retrieval), promoting reusability and testability.
- **Agent-Based Architecture**: Leveraging Google ADK, the system employs distinct AI agents for specific tasks (chat, Q&A generation, answer selection), enhancing modularity and specialized intelligence.
- **Dependency Injection (Implicit)**: Configuration and external service clients (Pinecone, Gemini) will likely be passed into services and agents, promoting loose coupling.

## 4. Component Relationships

- **Frontend <--> Flask API**: The frontend communicates exclusively with the Flask API endpoints for all backend operations.
- **Flask API <--> Services**: Flask routes delegate requests to the appropriate functions within the `services/` layer.
- **Services <--> Pinecone**: The `vector_store.py` service interacts directly with Pinecone for storing and retrieving vector embeddings.
- **Services <--> AI Agents**: The `retriever.py` service fetches relevant context, which is then passed to the AI agents for processing.
- **AI Agents <--> LLM**: AI agents utilize the Google Gemini Pro LLM (via LangChain) to generate responses based on retrieved context and user queries.
