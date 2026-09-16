from fastapi import APIRouter
from models.schemas import StudentProfile
from services.career_service import recommend_careers

router = APIRouter(
    prefix="/api/career",
    tags=["Career Recommendations"]
)


@router.post("/recommend")
def get_career_recommendations(profile: StudentProfile):
    recommendations = recommend_careers(profile)
    return {
        "recommendations": recommendations
    }
