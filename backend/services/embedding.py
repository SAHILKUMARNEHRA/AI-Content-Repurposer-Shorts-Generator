from sentence_transformers import SentenceTransformer
import numpy as np

# Load local HuggingFace embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> np.ndarray:
    return model.encode(text)
