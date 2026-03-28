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
