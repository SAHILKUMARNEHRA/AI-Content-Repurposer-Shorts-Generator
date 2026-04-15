import os
import groq
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Setup Groq
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = groq.Client(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

# Setup Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    gemini_model = genai.GenerativeModel('gemini-pro')
else:
    gemini_model = None

def get_answer_groq(context: str, query: str) -> str:
    if not groq_client:
        return "Groq API key not configured."
