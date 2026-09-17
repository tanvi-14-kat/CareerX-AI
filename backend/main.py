from fastapi import FastAPI
from routes.career import router as career_router
from routes.skill import router as skill_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CareerX AI API",
    description="AI-powered career guidance system for students",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(career_router)
app.include_router(skill_router)




@app.get("/")
def home():
    return {
        "message": "CareerX AI Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

