from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import os

from database import engine, get_db, Base
import models
from services.pdf_parser import extract_text_from_pdf, chunk_text
from services.embedding import get_embeddings_batch, get_embedding
from services.ai_chat import get_answer

# Initialize Database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Content Repurposer API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to AI Content Repurposer API"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    # Save to db
    doc = models.Document(filename=file.filename)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    
    # Extract & Chunk
    text_content = extract_text_from_pdf(file_path)
    chunks = chunk_text(text_content)
    
    if not chunks:
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
    # Embed
    embeddings = get_embeddings_batch(chunks)
    
    # Save chunks
    for i, chunk_text_data in enumerate(chunks):
        chunk_model = models.DocumentChunk(
            document_id=doc.id,
            content=chunk_text_data,
            embedding=embeddings[i].tolist()
        )
        db.add(chunk_model)
        
    db.commit()
    return {"message": "Document processed and stored", "document_id": doc.id, "chunks_created": len(chunks)}

from pydantic import BaseModel
