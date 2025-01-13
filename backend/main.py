from fastapi import FastAPI
from api import router  
from database import engine, Base  
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Hello Dear! Welcome to our bookshop. backend implemented by Qazal Naderi "}