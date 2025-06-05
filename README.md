# AI Book Agent Platform (Backend Server)

## Overview

The AI Book Agent Platform is a Python-based backend system designed to provide intelligent interaction with book content. It allows users to upload pre-chunked contextual data from books and interact with it using various AI agents. This platform supports functionalities such as chatting about a book, generating short and long Q&A, and selecting the best answer from a list. It leverages vector search (Pinecone), large language models (Google Gemini via LangChain), and is orchestrated using Google’s Agent Development Kit (ADK).

## Core Mission

To develop a robust and scalable backend system that handles the ingestion and vectorization of book content, manages interactions with AI agents, and exposes these functionalities via a REST API.

## Features & API Endpoints

The backend provides the following RESTful API endpoints:

### 1. Upload Contextual Book Chunks

- **Endpoint**: `/upload-book`
- **Method**: `POST`
- **Description**: Accepts an array of contextual text chunks from the frontend, embeds each chunk, and stores the vectors in Pinecone with `book_id` and metadata.
- **Payload Example**:
  ```json
  {
    "book_id": "unique_book_id",
    "chunks": [
      "context chunk 1...",
      "context chunk 2...",
      ...
    ]
  }
  ```
- **Response Example**: `{ "status": "success", "stored": 2 }`

### 2. Chat with Book

- **Endpoint**: `/chat`
- **Method**: `POST`
- **Description**: Finds the most relevant chunks from the book based on the question and uses an LLM to generate an answer.
- **Payload Example**:
  ```json
  {
    "book_id": "unique_book_id",
    "question": "What happened to the main character?"
  }
  ```
- **Response Example**: `{ "response": "The main character embarked on a journey..." }`

### 3. Short Question-Answer Generator

- **Endpoint**: `/short-qa`
- **Method**: `POST`
- **Description**: Generates concise Q&A pairs based on the provided book context and topic.
- **Payload Example**:
  ```json
  {
    "book_id": "unique_book_id",
    "topic": "Chapter 3 summary"
  }
  ```
- **Response Example**:
  ```json
  {
    "qa_pairs": [
      {
        "q": "What is the conflict in chapter 3?",
        "a": "The character discovers a hidden secret."
      }
    ]
  }
  ```

### 4. Long Question-Answer Generator

- **Endpoint**: `/long-qa`
- **Method**: `POST`
- **Description**: Provides a more detailed Q&A response based on the book context and topic.
- **Payload Example**:
  ```json
  {
    "book_id": "unique_book_id",
    "topic": "Theme of betrayal in chapter 4"
  }
  ```
- **Response Example**:
  ```json
  {
    "question": "What is the theme of betrayal in chapter 4?",
    "answer": "In chapter 4, betrayal is shown when a trusted ally reveals their true intentions, leading to a significant plot twist and challenging the protagonist's perceptions."
  }
  ```

### 5. Best Answer Selector

- **Endpoint**: `/best-answer`
- **Method**: `POST`
- **Description**: Given a question and multiple possible answers, the agent selects the most relevant and accurate one.
- **Payload Example**:
  ```json
  {
    "question": "Why did the hero leave the village?",
    "answers": [
      "To find the sword of truth",
      "To escape danger",
      "Because the elders told him to"
    ]
  }
  ```
- **Response Example**:
  ```json
  {
    "best_answer": "To find the sword of truth",
    "reason": "This directly relates to the main quest and the hero's stated objective."
  }
  ```

### 6. Health Check

- **Endpoint**: `/status`
- **Method**: `GET`
- **Description**: Checks the health and availability of the backend server.
- **Response Example**: `{ "status": "ok" }`

## Technologies Used

| Purpose        | Tool/Library                  |
| :------------- | :---------------------------- |
| API Server     | Flask                         |
| Embedding      | LangChain (Gemini Embeddings) |
| Vector Store   | Pinecone                      |
| Agents         | Google Agent Development Kit  |
| LLM            | Google Gemini Pro             |
| Storage Format | JSON + Pinecone Metadata      |
| Deployment     | Gunicorn + Docker (optional)  |
| Environment    | Python                        |

## Architecture Overview

The backend follows a modular, layered architecture. Flask acts as an API Gateway, routing requests to a Services Layer. This layer interacts with Pinecone for vector storage and orchestrates AI Agents built with Google ADK, which in turn utilize Google Gemini Pro as the underlying LLM.

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
```

## Setup Instructions

### Prerequisites

- Python 3.9+ installed
- `pip` (Python package installer)

### 1. Clone the Repository (if applicable)

```bash
# Assuming this is the root of your project
# git clone [repository-url]
# cd book-agent-backend
```

### 2. Create a Virtual Environment

It is highly recommended to use a virtual environment to manage dependencies.

```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

Navigate to the `server/` directory and install the required Python packages.

```bash
cd server/
pip install -r requirements.txt
cd .. # Go back to the root directory
```

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory and add your API keys and configurations.

```
# server/.env
PINECONE_API_KEY=YOUR_PINECONE_API_KEY
PINECONE_ENVIRONMENT=YOUR_PINECONE_ENVIRONMENT # e.g., us-west-2
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
PINECONE_INDEX_NAME=book-index
```

**Note**: Replace `YOUR_PINECONE_API_KEY`, `YOUR_PINECONE_ENVIRONMENT`, and `YOUR_GOOGLE_API_KEY` with your actual credentials.

## How to Run the Application

After setting up the environment and dependencies:

1. **Activate your virtual environment** (if not already active).
2. **Navigate to the `server/` directory**:
   ```bash
   cd server/
   ```
3. **Run the Flask application**:
   ```bash
   python run.py
   ```
   The server will typically run on `http://127.0.0.1:5000`.

## Project Structure

```
.
├── README.md
├── .clinerules
├── memory-bank/            # Documentation and context for Cline
│   ├── activeContext.md
│   ├── productContext.md
│   ├── progress.md
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   └── techContext.md
│
└── server/
    ├── app.py              # Main Flask application instance
    ├── .env                # Environment variables (local, not committed)
    ├── requirements.txt    # Python dependencies
    ├── run.py              # Script to run the Flask app
    ├── PRD.md              # Product Requirements Document
    │
    ├── agents/             # Google ADK agent logic
    │   ├── chat_agent.py
    │   ├── short_qa_agent.py
    │   ├── long_qa_agent.py
    │   └── best_answer_agent.py
    │
    ├── services/           # Core business logic (embedding, vector store, retrieval)
    │   ├── embedder.py
    │   ├── vector_store.py
    │   └── retriever.py
    │
    ├── routes/             # Flask blueprints for API endpoints
    │   ├── upload.py
    │   ├── chat.py
    │   └── qa.py
    │   └── main.py         # Example/placeholder route
    │
    └── config/
        └── settings.py     # Configuration settings
```

## Future Enhancements (Frontend)

This repository currently focuses on the backend server. A separate frontend application will be developed in a later phase to provide a user interface for interacting with this backend.
