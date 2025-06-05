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

## Future Enhancements (Frontend)

This repository currently focuses on the backend server. A separate frontend application will be developed in a later phase to provide a user interface for interacting with this backend.
