from fastapi import FastAPI
from routes.career import router as career_router

app = FastAPI(
    title="CareerX AI API",
    description="AI-powered career guidance system for students",
    version="1.0.0"
)

app.include_router(career_router)


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

