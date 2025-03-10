from django.shortcuts import render
import arxiv, json
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_KEY = os.environ("DEEPSEEK_API_KEY")

# arxiv api to get data
def search() -> str:
    pass
    
# deepseek api to summarize 
def summarize() -> str:
    client = OpenAI(api_key=, base_url="https://api.deepseek.com")
    pass

# Create your views here.
