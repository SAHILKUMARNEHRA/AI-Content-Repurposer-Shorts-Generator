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

