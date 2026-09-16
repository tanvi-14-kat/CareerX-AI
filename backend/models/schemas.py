from pydantic import BaseModel, Field
from typing import List


class StudentProfile(BaseModel):
    education: str
    interests: List[str]
    skills: List[str]
    goal: str
    study_hours: int = Field(..., ge=0, le=24)
