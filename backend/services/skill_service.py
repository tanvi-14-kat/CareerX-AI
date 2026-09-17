import json
from pathlib import Path
from typing import List, Dict, Any

_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "careers.json"


def _load_careers() -> List[Dict[str, Any]]:
    """Load career data from careers.json."""
    with open(_DATA_PATH, "r", encoding="utf-8") as fh:
        return json.load(fh)


def _normalise(items: List[str]) -> List[str]:
    """Helper to trim and lower-case non-empty string items."""
    return [item.strip().lower() for item in items if item and item.strip()]


def _generate_recommendations(
    missing_skills: List[str], learning_path: List[str]
) -> List[str]:
    """Generate beginner-friendly recommendations based on missing skills."""
    if not missing_skills:
        return [
            "You have covered all the core skills listed for this career!",
            "Consider working on advanced projects, contributing to open-source, "
            "or preparing for interviews.",
        ]

    reasons: List[str] = []

    top_missing = missing_skills[:3]
    reasons.append(
        f"Focus on learning core missing skills: {', '.join(top_missing)}."
    )

    if len(missing_skills) > 3:
        reasons.append(
            f"Plan a phased study schedule to cover the remaining "
            f"{len(missing_skills) - 3} skills over time."
        )

    if learning_path:
        reasons.append(
            f"Recommended starting point from the curriculum: "
            f"'{learning_path[0]}'."
        )

    reasons.append(
        "Build hands-on practical projects to demonstrate proficiency "
        "in these skills."
    )

    return reasons


def analyze_skill_gap(
    career_name: str, current_skills: List[str]
) -> Dict[str, Any]:
    """Analyze the skill gap between a student and a selected career."""
    careers = _load_careers()

    if not career_name or not career_name.strip():
        raise ValueError("Career name cannot be empty.")

    target_career_name_lower = career_name.strip().lower()

    selected_career = None

    for career in careers:
        if career.get("career", "").strip().lower() == target_career_name_lower:
            selected_career = career
            break

    if not selected_career:
        raise ValueError(
            f"Career '{career_name}' not found in career dataset."
        )

    career_display_name = selected_career.get("career", career_name)
    required_skills: List[str] = selected_career.get("skills", [])
    learning_path: List[str] = selected_career.get("learning_path", [])

    norm_current_set = set(_normalise(current_skills))

    existing_skills: List[str] = []
    missing_skills: List[str] = []

    for skill in required_skills:
        if skill.strip().lower() in norm_current_set:
            existing_skills.append(skill)
        else:
            missing_skills.append(skill)

    recommendations = _generate_recommendations(
        missing_skills, learning_path
    )

    return {
        "career": career_display_name,
        "required_skills": required_skills,
        "existing_skills": existing_skills,
        "missing_skills": missing_skills,
        "skill_gap_count": len(missing_skills),
        "recommendations": recommendations,
    }
