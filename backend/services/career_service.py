import json
from pathlib import Path
from typing import List, Dict, Any

from models.schemas import StudentProfile

WEIGHT_SKILLS    = 0.60
WEIGHT_INTERESTS = 0.30
WEIGHT_EDUCATION = 0.10
TOP_N = 3

_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "careers.json"


def _load_careers() -> List[Dict[str, Any]]:
    with open(_DATA_PATH, "r", encoding="utf-8") as fh:
        return json.load(fh)


def _normalise(items: List[str]) -> List[str]:
    return [item.strip().lower() for item in items if item.strip()]


def _skill_score(student_skills: List[str], career_skills: List[str]) -> tuple:
    if not career_skills:
        return 0.0, []
    s_norm = set(_normalise(student_skills))
    matched = [cs for cs in career_skills if cs.strip().lower() in s_norm]
    return min(len(matched) / len(career_skills), 1.0), matched


def _interest_score(student_interests: List[str], career_interests: List[str]) -> tuple:
    if not career_interests:
        return 0.0, []
    s_norm = set(_normalise(student_interests))
    matched = [ci for ci in career_interests if ci.strip().lower() in s_norm]
    return min(len(matched) / len(career_interests), 1.0), matched


def _education_score(student_edu: str, career_edu: List[str]) -> float:
    if not career_edu or not student_edu.strip():
        return 0.0
    s_lower = student_edu.strip().lower()
    for edu in career_edu:
        e_lower = edu.strip().lower()
        if e_lower in s_lower or s_lower in e_lower:
            return 1.0
    return 0.0


def _build_reasons(matched_skills, matched_interests, student_edu, edu_score):
    reasons = []
    for skill in matched_skills[:3]:
        reasons.append(f"You already have {skill}")
    if len(matched_skills) > 3:
        reasons.append(f"... and {len(matched_skills) - 3} more skill(s) match")
    for interest in matched_interests[:2]:
        reasons.append(f"Your interest in '{interest}' matches this career")
    if edu_score > 0:
        reasons.append(f"Your {student_edu} education is relevant")
    if not reasons:
        reasons.append("This career has potential overlap with your profile")
    return reasons


def recommend_careers(profile: StudentProfile) -> List[Dict[str, Any]]:
    careers = _load_careers()
    results = []
    for career in careers:
        sk_score, matched_skills    = _skill_score(profile.skills, career["skills"])
        in_score, matched_interests = _interest_score(profile.interests, career["interests"])
        ed_score                    = _education_score(profile.education, career["education"])
        composite = round(
            sk_score * WEIGHT_SKILLS +
            in_score * WEIGHT_INTERESTS +
            ed_score * WEIGHT_EDUCATION,
            4
        )
        results.append({
            "career":            career["career"],
            "description":       career["description"],
            "relevant_skills":   career["skills"],
            "matched_skills":    matched_skills,
            "matched_interests": matched_interests,
            "why_it_matches":    _build_reasons(matched_skills, matched_interests, profile.education, ed_score),
            "score":             composite,
        })
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:TOP_N]
