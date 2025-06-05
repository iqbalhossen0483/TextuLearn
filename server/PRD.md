# 📘 **Product Requirements Document (PRD)**

## Project: AI Book Agent Platform (Flask + LangChain + Pinecone + Google ADK)

---

## 🧭 Overview

The **AI Book Agent** is a Python-based backend system that provides intelligent interaction with the contents of a specific book. The system allows users to upload pre-chunked contextual data from a book and interact with it using multiple AI agents. It supports functionalities such as chatting about the book, generating short and long Q\&A, and selecting the best answer—all powered by vector search (Pinecone), language models (Google Gemini via LangChain), and orchestrated via Google’s Agent Development Kit (ADK).

---

## 🎯 Goals & Objectives

- Accept pre-split contextual chunks of a book and embed them.
- Store vector data in Pinecone for similarity-based retrieval.
- Provide a set of intelligent agents using Google ADK:

  - Chat agent
  - Short Q\&A generator
  - Long Q\&A generator
  - Best answer selector

- Expose functionality via a REST API built with **Flask**.
- Design a modular, scalable backend for future extension.

---

## 👥 Target Users

- Students, educators, and researchers
- AI-powered reading or learning apps
- Content summarization platforms
- Book analysis tools

---

## 🏗 Architecture Overview

```
Frontend (splits book into contexts)
         |
         v
Backend (Flask API)
  ├── Receives context chunks
  ├── Embeds with LangChain
  ├── Stores in Pinecone
  └── Routes to AI agents via Google ADK
```

---

## 🔧 Tech Stack

| Purpose        | Tool/Library                  |
| -------------- | ----------------------------- |
| API Server     | Flask                         |
| Embedding      | LangChain (Gemini Embeddings) |
| Vector Store   | Pinecone                      |
| Agents         | Google Agent Development Kit  |
| LLM            | Google Gemini Pro             |
| Storage Format | JSON + Pinecone Metadata      |
| Deployment     | Gunicorn + Docker (optional)  |

---

## 🛠 Functional Requirements

### 1. **Upload Contextual Book Chunks**

- **Input**: Array of contextual text chunks from the frontend.
- **Backend Tasks**:

  - Embed each chunk using LangChain
  - Store each vector in Pinecone with `book_id`, chunk index, and metadata

#### `/upload-book`

- **Method**: `POST`
- **Payload**:

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

- **Response**: `{ "status": "success", "stored": <number_of_chunks> }`

---

### 2. **Chat with Book**

Use retriever to find top relevant chunks, then LLM to answer.

#### `/chat`

- **Method**: `POST`
- **Payload**:

```json
{
  "book_id": "unique_book_id",
  "question": "What happened to the main character?"
}
```

- **Response**: `{ "response": "..." }`

---

### 3. **Short Question-Answer Generator**

Generates short Q\&A pairs based on book context.

#### `/short-qa`

- **Method**: `POST`
- **Payload**:

```json
{
  "book_id": "unique_book_id",
  "topic": "Chapter 3 summary"
}
```

- **Response**:

```json
{
  "qa_pairs": [
    {
      "q": "What is the conflict in chapter 3?",
      "a": "The character discovers..."
    }
  ]
}
```

---

### 4. **Long Question-Answer Generator**

Provides a more detailed Q\&A response.

#### `/long-qa`

- **Method**: `POST`
- **Payload**:

```json
{
  "book_id": "unique_book_id",
  "topic": "Theme of betrayal in chapter 4"
}
```

- **Response**:

```json
{
  "question": "...",
  "answer": "In chapter 4, betrayal is shown when..."
}
```

---

### 5. **Best Answer Selector**

Given multiple answers, the agent selects the best one.

#### `/best-answer`

- **Method**: `POST`
- **Payload**:

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

- **Response**:

```json
{
  "best_answer": "To find the sword of truth",
  "reason": "This directly relates to the main quest."
}
```

---

### 6. **Health Check**

#### `/status`

- **Method**: `GET`
- **Response**: `{ "status": "ok" }`

---

## 🗃 Data Flow

1. **Frontend**: Splits book → sends `chunks[]` to backend
2. **Backend**: Embeds & stores in Pinecone
3. **User**: Sends queries → routed to appropriate agent via ADK
4. **ADK Agents**: Fetch context from Pinecone, respond via Gemini

---

## 🧱 File Structure

```
book-agent-backend/
├── app.py
├── .env
├── requirements.txt
│
├── agents/                 # Google ADK agent logic
│   ├── chat_agent.py
│   ├── short_qa_agent.py
│   ├── long_qa_agent.py
│   └── best_answer_agent.py
│
├── services/               # Core functionality
│   ├── embedder.py
│   ├── vector_store.py
│   └── retriever.py
│
├── routes/                 # Flask routes
│   ├── upload.py
│   ├── chat.py
│   └── qa.py
│
└── config/
    └── settings.py
```

---

## 🔐 Environment Variables

```bash
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
GOOGLE_API_KEY=...
PINECONE_INDEX_NAME=book-index
```

---

## 📊 Non-Functional Requirements

- ⏱ Fast query response (< 2s)
- 🧩 Modular architecture
- 🔐 Secure secrets and payload validation
- ⚙️ Retry mechanism for embedding & storage failures
- 🧪 Unit tested endpoints
- 🔍 Logging and error tracking
