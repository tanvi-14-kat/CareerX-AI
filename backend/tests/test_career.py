import asyncio
import json
import unittest
from main import app
from models.schemas import StudentProfile
from services.career_service import recommend_careers


def _make_asgi_request(app, method: str, path: str, payload: dict):
    """Execute an HTTP request directly against the FastAPI ASGI app."""
    body = json.dumps(payload).encode("utf-8")
    scope = {
        "type": "http",
        "http_version": "1.1",
        "method": method,
        "path": path,
        "raw_path": path.encode("utf-8"),
        "query_string": b"",
        "headers": [
            (b"host", b"testserver"),
            (b"content-type", b"application/json"),
            (b"content-length", str(len(body)).encode("utf-8")),
        ],
    }

    response_started = {}
    response_body = []

    async def receive():
        return {"type": "http.request", "body": body, "more_body": False}

    async def send(message):
        if message["type"] == "http.response.start":
            response_started["status"] = message["status"]
            response_started["headers"] = message["headers"]
        elif message["type"] == "http.response.body":
            response_body.append(message.get("body", b""))

    async def run():
        await app(scope, receive, send)

    asyncio.run(run())

    status_code = response_started.get("status")
    response_data = json.loads(b"".join(response_body).decode("utf-8"))
    return status_code, response_data


class TestCareerRecommendationEngine(unittest.TestCase):
    def test_strong_aiml_profile(self):
        """1. Verify strong AI/ML profile yields AI/ML Engineer as top recommendation."""
        payload = {
            "education": "B.Tech Computer Science",
            "interests": ["Artificial Intelligence", "Machine Learning"],
            "skills": ["Python", "TensorFlow"],
            "goal": "Build AI applications",
            "study_hours": 3,
        }
        status_code, data = _make_asgi_request(app, "POST", "/api/career/recommend", payload)

        self.assertEqual(status_code, 200)
        recs = data["recommendations"]
        self.assertGreaterEqual(len(recs), 3)

        top = recs[0]
        self.assertEqual(top["career"], "AI/ML Engineer")
        # Formula verification:
        # Skills: 2/8 * 50 = 12.5
        # Interests: 2/5 * 25 = 10.0
        # Education: B.Tech match = 10.0
        # Goal: 'ai' token overlap = 1/2 * 15 = 7.5
        # Total = 40.0
        self.assertEqual(top["match_score"], 40.0)
        self.assertEqual(top["matched_skills"], ["Python", "TensorFlow"])
        self.assertEqual(
            top["missing_skills"],
            ["PyTorch", "Deep Learning", "MLOps", "Docker", "REST APIs", "Cloud Platforms"]
        )
        self.assertIn("reason", top)
        self.assertIn("recommended_next_steps", top)

    def test_different_career_profile_software_developer(self):
        """2. Verify web/software profile produces Software Developer as top recommendation."""
        profile = StudentProfile(
            education="BCA",
            interests=["Programming", "Building Products"],
            skills=["JavaScript", "Java", "Git", "SQL"],
            goal="Build scalable web applications",
            study_hours=4,
        )
        recs = recommend_careers(profile)
        self.assertEqual(recs[0]["career"], "Software Developer")
        self.assertIn("JavaScript", recs[0]["matched_skills"])
        self.assertIn("Java", recs[0]["matched_skills"])
        # Verify AI/ML Engineer is NOT top
        self.assertNotEqual(recs[0]["career"], "AI/ML Engineer")

    def test_different_career_profile_ui_ux(self):
        """3. Verify designer profile produces UI/UX Designer as top match."""
        profile = StudentProfile(
            education="B.Des",
            interests=["Design", "User Experience", "Art"],
            skills=["Figma", "Adobe XD", "Wireframing"],
            goal="Design mobile and web user interfaces",
            study_hours=5,
        )
        recs = recommend_careers(profile)
        self.assertEqual(recs[0]["career"], "UI/UX Designer")
        self.assertIn("Figma", recs[0]["matched_skills"])
        self.assertGreater(recs[0]["match_score"], 40.0)

    def test_empty_profile_exploratory_handling(self):
        """4. Verify empty profile returns exploratory careers with 0 score and clear reason."""
        payload = {
            "education": "",
            "interests": [],
            "skills": [],
            "goal": "",
            "study_hours": 0,
        }
        status_code, data = _make_asgi_request(app, "POST", "/api/career/recommend", payload)

        self.assertEqual(status_code, 200)
        recs = data["recommendations"]
        self.assertEqual(len(recs), 3)
        for r in recs:
            self.assertEqual(r["match_score"], 0.0)
            self.assertEqual(r["score"], 0.0)
            self.assertEqual(r["matched_skills"], [])
            self.assertIn("exploratory", r["reason"].lower())

    def test_case_whitespace_and_duplicate_insensitivity(self):
        """5. Verify casing, whitespace, and duplicates do not inflate score."""
        p_normal = StudentProfile(
            education="B.Tech",
            interests=["Technology"],
            skills=["Python", "SQL"],
            goal="Work in tech",
            study_hours=2,
        )
        p_messy = StudentProfile(
            education="  b.tech  ",
            interests=["  technology ", "TECHNOLOGY", " technology "],
            skills=["  python  ", "PYTHON", "Sql", " SQL "],
            goal="  work in tech  ",
            study_hours=2,
        )
        recs_normal = recommend_careers(p_normal)
        recs_messy = recommend_careers(p_messy)

        self.assertEqual(len(recs_normal), len(recs_messy))
        for r1, r2 in zip(recs_normal, recs_messy):
            self.assertEqual(r1["career"], r2["career"])
            self.assertEqual(r1["match_score"], r2["match_score"])
            self.assertEqual(r1["matched_skills"], r2["matched_skills"])

    def test_score_monotonicity(self):
        """6. Verify adding a valid required skill strictly increases or preserves match score."""
        p_base = StudentProfile(
            education="B.Tech",
            interests=["Artificial Intelligence"],
            skills=["Python"],
            goal="AI Engineer",
            study_hours=3,
        )
        p_added = StudentProfile(
            education="B.Tech",
            interests=["Artificial Intelligence"],
            skills=["Python", "TensorFlow", "PyTorch"],
            goal="AI Engineer",
            study_hours=3,
        )
        score_base = next(r["match_score"] for r in recommend_careers(p_base) if r["career"] == "AI/ML Engineer")
        score_added = next(r["match_score"] for r in recommend_careers(p_added) if r["career"] == "AI/ML Engineer")
        self.assertGreater(score_added, score_base)

    def test_deterministic_ranking(self):
        """7. Verify identical requests produce identical ordering and scores."""
        profile = StudentProfile(
            education="MCA",
            interests=["Cloud Computing", "Automation"],
            skills=["Docker", "Linux", "AWS"],
            goal="Cloud Engineer",
            study_hours=4,
        )
        run1 = recommend_careers(profile)
        run2 = recommend_careers(profile)
        self.assertEqual([r["career"] for r in run1], [r["career"] for r in run2])
        self.assertEqual([r["match_score"] for r in run1], [r["match_score"] for r in run2])

    def test_invalid_study_hours_validation(self):
        """8. Verify validation rejects invalid study hours (>24)."""
        payload = {
            "education": "B.Tech",
            "interests": [],
            "skills": [],
            "goal": "Test",
            "study_hours": 30,
        }
        status_code, _ = _make_asgi_request(app, "POST", "/api/career/recommend", payload)
        self.assertEqual(status_code, 422)


if __name__ == "__main__":
    unittest.main()