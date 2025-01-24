from fastapi.staticfiles import StaticFiles
import os
from fastapi import FastAPI
from api import router  
from database import engine, Base  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the uploads directory
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


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
    return {"message": "Hello Dear! Welcome to our bookshop "}