"""
career_service.py
-----------------
Transparent, deterministic career recommendation engine for CareerX AI.

Evaluates student profiles across four clear dimensions:
1. Skills Match (50%) - Direct overlap with career required skills.
2. Interests Match (25%) - Alignment with career interest domains.
3. Goal Relevance (15%) - Stated aspirations matching career focus.
4. Education Match (10%) - Academic pathway relevance.

Scoring Scale: 0 - 100.
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Any, Tuple, Set

from models.schemas import StudentProfile

WEIGHT_SKILLS = 50.0
WEIGHT_INTERESTS = 25.0
WEIGHT_GOAL = 15.0
WEIGHT_EDUCATION = 10.0

MAX_RECOMMENDATIONS = 5
MIN_RECOMMENDATIONS = 3
MIN_MATCH_THRESHOLD = 5.0

_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "careers.json"

_STOPWORDS = {
    "a", "an", "the", "in", "on", "at", "to", "for", "of", "and", "or",
    "with", "as", "by", "is", "be", "become", "build", "learn", "want",
    "work", "looking", "into", "job", "career", "role", "field", "like"
}

_DEGREE_VARIANTS = {
    "btech": ["bachelor of technology", "b.tech", "btech"],
    "be": ["bachelor of engineering", "b.e."],
    "bca": ["bachelor of computer applications", "bca"],
    "mca": ["master of computer applications", "mca"],
    "mtech": ["master of technology", "m.tech", "mtech"],
    "bsc": ["bachelor of science", "b.sc", "bsc"],
    "msc": ["master of science", "m.sc", "msc"],
    "bdes": ["bachelor of design", "b.des", "bdes"],
    "bfa": ["bachelor of fine arts", "bfa"],
    "mba": ["master of business administration", "mba"],
    "bba": ["bachelor of business administration", "bba"]
}


def _load_careers() -> List[Dict[str, Any]]:
    """Load career catalog from careers.json."""
    with open(_DATA_PATH, "r", encoding="utf-8") as fh:
        return json.load(fh)


def _normalise_list(items: List[str]) -> List[str]:
    """Clean, trim, and deduplicate input items preserving case-insensitive uniqueness."""
    seen: Set[str] = set()
    cleaned: List[str] = []
    for item in items:
        if item and item.strip():
            norm = item.strip().lower()
            if norm not in seen:
                seen.add(norm)
                cleaned.append(item.strip())
    return cleaned


def _tokenize(text: str) -> Set[str]:
    """Extract meaningful keyword tokens excluding common stopwords."""
    if not text:
        return set()
    tokens = re.findall(r"[a-zA-Z0-9#+]+", text.lower())
    return {tok for tok in tokens if tok not in _STOPWORDS and len(tok) > 1}


def _evaluate_skills(
    student_skills: List[str], career_skills: List[str]
) -> Tuple[float, List[str], List[str]]:
    """
    Compute exact case-insensitive skill overlap.
    Returns (ratio_0_to_1, matched_skills, missing_skills).
    """
    if not career_skills or not student_skills:
        return 0.0, [], career_skills[:]

    norm_student = {s.strip().lower() for s in student_skills if s and s.strip()}
    matched: List[str] = []
    missing: List[str] = []

    for cs in career_skills:
        if cs.strip().lower() in norm_student:
            matched.append(cs)
        else:
            missing.append(cs)

    ratio = len(matched) / len(career_skills)
    return ratio, matched, missing


def _evaluate_interests(
    student_interests: List[str], career_interests: List[str]
) -> Tuple[float, List[str]]:
    """
    Compute interest overlap supporting exact matches and acronym/token equivalence.
    Returns (ratio_0_to_1, matched_interests).
    """
    if not career_interests or not student_interests:
        return 0.0, []

    matched: List[str] = []
    student_norm = {i.strip().lower() for i in student_interests if i and i.strip()}
    student_tokens = set()
    for s_int in student_interests:
        student_tokens.update(_tokenize(s_int))

    for ci in career_interests:
        ci_lower = ci.strip().lower()
        ci_tokens = _tokenize(ci)
        if ci_lower in student_norm or (ci_tokens and bool(ci_tokens & student_tokens)):
            matched.append(ci)

    ratio = len(matched) / len(career_interests)
    return min(ratio, 1.0), matched


def _evaluate_education(
    student_edu: str, career_edu: List[str]
) -> Tuple[float, bool]:
    """
    Evaluate education relevance using substring and known degree variant matching.
    Returns (score_0_or_1, is_matched).
    """
    if not career_edu or not student_edu or not student_edu.strip():
        return 0.0, False

    s_lower = student_edu.strip().lower()
    s_clean = re.sub(r"[^a-z0-9]", "", s_lower)

    for edu in career_edu:
        edu_lower = edu.strip().lower()
        if edu_lower in s_lower or s_lower in edu_lower:
            return 1.0, True

        edu_clean = re.sub(r"[^a-z0-9]", "", edu_lower)
        if edu_clean and (edu_clean in s_clean or s_clean in edu_clean):
            return 1.0, True

        variants = _DEGREE_VARIANTS.get(edu_clean, [edu_lower])
        for v in variants:
            if v in s_lower:
                return 1.0, True

    return 0.0, False


def _evaluate_goal(
    student_goal: str, career_name: str, career_desc: str, career_interests: List[str]
) -> Tuple[float, bool]:
    """
    Evaluate if student's stated goal aligns with career title, description, or interests.
    Returns (ratio_0_to_1, is_matched).
    """
    if not student_goal or not student_goal.strip():
        return 0.0, False

    goal_tokens = _tokenize(student_goal)
    if not goal_tokens:
        return 0.0, False

    career_tokens = _tokenize(career_name) | _tokenize(career_desc)
    for interest in career_interests:
        career_tokens.update(_tokenize(interest))

    overlap = goal_tokens & career_tokens
    if overlap:
        score = min(len(overlap) / 2.0, 1.0)
        return score, True

    return 0.0, False


def _generate_reason(
    career_name: str,
    matched_skills: List[str],
    matched_interests: List[str],
    edu_matched: bool,
    student_edu: str,
    goal_matched: bool,
    match_score: float
) -> str:
    """Generate dynamic, explainable reasoning reflecting actual match dimensions."""
    if match_score == 0.0:
        return f"Suggested as an exploratory tech career path; no matching skills or interests detected in profile."

    sentences = []

    if matched_skills and matched_interests:
        sk_str = ", ".join(matched_skills[:2])
        int_str = ", ".join(matched_interests[:2])
        sentences.append(f"Strong match with your {sk_str} skills and interest in {int_str}.")
    elif matched_skills:
        sk_str = ", ".join(matched_skills[:3])
        sentences.append(f"Technical alignment: you already have key required skills ({sk_str}).")
    elif matched_interests:
        int_str = ", ".join(matched_interests[:2])
        sentences.append(f"Domain alignment: your interests ({int_str}) strongly match this career path.")
    elif goal_matched:
        sentences.append("Your stated career goal directly aligns with the focus of this profession.")

    context = []
    if edu_matched and student_edu.strip():
        context.append(f"your {student_edu.strip()} education is directly relevant")
    if goal_matched and (matched_skills or matched_interests):
        context.append("your stated career goal reinforces this path")

    if context:
        sentences.append(f"Additionally, {' and '.join(context)}.")

    if not sentences:
        sentences.append(f"Found foundational alignment with your profile for {career_name}.")

    return " ".join(sentences)


def _generate_next_steps(
    missing_skills: List[str], learning_path: List[str]
) -> List[str]:
    """Generate actionable, dataset-grounded next steps."""
    steps: List[str] = []

    if missing_skills:
        top_missing = missing_skills[:3]
        steps.append(f"Target key missing skills: {', '.join(top_missing)}.")

    if learning_path:
        steps.append(f"Follow recommended curriculum milestone: '{learning_path[0]}'.")
        if len(learning_path) > 1:
            steps.append(f"Progress to: '{learning_path[1]}'.")

    steps.append("Build portfolio projects demonstrating proficiency in these areas.")
    return steps


def recommend_careers(profile: StudentProfile) -> List[Dict[str, Any]]:
    """
    Recommend ranked careers based on multi-dimensional evaluation of student profile.

    Parameters
    ----------
    profile : StudentProfile
        Validated student profile.

    Returns
    -------
    List[Dict[str, Any]]
        Top recommended careers sorted descending by match_score.
    """
    careers = _load_careers()
    results: List[Dict[str, Any]] = []

    cleaned_skills = _normalise_list(profile.skills)
    cleaned_interests = _normalise_list(profile.interests)

    for career in careers:
        career_title = career.get("career", "")
        career_skills = career.get("skills", [])
        career_interests = career.get("interests", [])
        career_edu = career.get("education", [])
        career_desc = career.get("description", "")
        learning_path = career.get("learning_path", [])

        sk_ratio, matched_skills, missing_skills = _evaluate_skills(cleaned_skills, career_skills)
        in_ratio, matched_interests = _evaluate_interests(cleaned_interests, career_interests)
        ed_score, edu_matched = _evaluate_education(profile.education, career_edu)
        goal_score, goal_matched = _evaluate_goal(profile.goal, career_title, career_desc, career_interests)

        raw_score = (
            (sk_ratio * WEIGHT_SKILLS) +
            (in_ratio * WEIGHT_INTERESTS) +
            (goal_score * WEIGHT_GOAL) +
            (ed_score * WEIGHT_EDUCATION)
        )
        match_score = round(min(raw_score, 100.0), 1)

        reason = _generate_reason(
            career_title,
            matched_skills,
            matched_interests,
            edu_matched,
            profile.education,
            goal_matched,
            match_score
        )

        next_steps = _generate_next_steps(missing_skills, learning_path)

        results.append({
            "career": career_title,
            "description": career_desc,
            "match_score": match_score,
            "score": round(match_score / 100.0, 4),
            "relevant_skills": career_skills,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "matched_interests": matched_interests,
            "reason": reason,
            "why_it_matches": [reason],
            "recommended_next_steps": next_steps,
        })

    # Sort deterministically: match_score desc, matched_skills count desc, career name asc
    results.sort(
        key=lambda x: (-x["match_score"], -len(x["matched_skills"]), x["career"])
    )

    # If matches exist above threshold, return up to MAX_RECOMMENDATIONS
    qualifying = [r for r in results if r["match_score"] >= MIN_MATCH_THRESHOLD]
    if qualifying:
        return qualifying[:MAX_RECOMMENDATIONS]

    # For empty/unmatched profiles, return top 3 exploratory options clearly marked
    return results[:MIN_RECOMMENDATIONS]