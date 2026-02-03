# AI Content Repurposer (Shorts/Reels Generator)

An AI-powered tool designed to process documents and content, leveraging Groq (Llama 3) and Google Gemini to repurpose information efficiently.

## Features

*   **PDF Upload & Parsing:** Automatically extracts text from uploaded PDFs.
*   **Vector Database:** Stores document embeddings in PostgreSQL using `pgvector`.
*   **Local Embeddings:** Uses HuggingFace's `all-MiniLM-L6-v2` for fast, free local embeddings.
*   **Multi-Model Chat:** Toggle seamlessly between Groq API and Google Gemini API for responses.
*   **Modern UI:** Built with React, Vite, Tailwind CSS, and Lucide icons. Features Dark Mode!

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS
*   **Backend:** FastAPI (Python), SQLAlchemy
*   **Database:** PostgreSQL with `pgvector` extension
*   **AI/ML:** Sentence-Transformers, Groq API, Google Generative AI

## Getting Started

### Backend Setup
1. `cd backend`
2. `python -m venv venv && source venv/bin/activate`
3. `pip install -r requirements.txt`
4. Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/rag_db
   GROQ_API_KEY=your_groq_key
   GEMINI_API_KEY=your_gemini_key
   ```
5. Run the server: `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
