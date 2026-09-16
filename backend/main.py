from fastapi import FastAPI

app = FastAPI(
    title="CareerX AI API",
    description="AI-powered career guidance system for students",
    version="1.0.0"
)


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
