from fastapi import APIRouter
from models.schemas import SkillGapRequest
from services.skill_service import analyze_skill_gap

router = APIRouter(
    prefix="/api/skill-gap",
    tags=["Skill Gap Analysis"]
)


@router.post("/analyze")
def get_skill_gap(request: SkillGapRequest):
    return analyze_skill_gap(request.career, request.skills)