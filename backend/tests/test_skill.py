import asyncio
import json
import unittest
from main import app


def _make_asgi_request(app, method: str, path: str, payload: dict):
    """
    Execute an HTTP request directly against the FastAPI ASGI app without external dependencies.
    """
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


class TestSkillGapEndpoint(unittest.TestCase):
    def test_skill_gap_partial_skills(self):
        payload = {
            "career": "AI/ML Engineer",
            "skills": ["Python", "TensorFlow"],
        }
        status_code, data = _make_asgi_request(app, "POST", "/api/skill-gap/analyze", payload)

        # 1. Verify HTTP status is 200
        self.assertEqual(status_code, 200)

        # 2. Verify returned career is "AI/ML Engineer"
        self.assertEqual(data.get("career"), "AI/ML Engineer")

        # 3. Verify existing_skills contains "Python" and "TensorFlow"
        existing = data.get("existing_skills", [])
        self.assertIn("Python", existing)
        self.assertIn("TensorFlow", existing)

        # 4. Verify missing_skills contains remaining required skills
        missing = data.get("missing_skills", [])
        for skill in ["PyTorch", "Deep Learning", "MLOps", "Docker", "REST APIs", "Cloud Platforms"]:
            self.assertIn(skill, missing)

        # 5. Verify skill_gap_count is 6
        self.assertEqual(data.get("skill_gap_count"), 6)

        # 6. Verify recommendations is present and non-empty
        recommendations = data.get("recommendations")
        self.assertIsInstance(recommendations, list)
        self.assertGreater(len(recommendations), 0)

    def test_skill_gap_complete_skills(self):
        payload = {
            "career": "AI/ML Engineer",
            "skills": [
                "Python",
                "TensorFlow",
                "PyTorch",
                "Deep Learning",
                "MLOps",
                "Docker",
                "REST APIs",
                "Cloud Platforms",
            ],
        }
        status_code, data = _make_asgi_request(app, "POST", "/api/skill-gap/analyze", payload)

        self.assertEqual(status_code, 200)
        self.assertEqual(data.get("career"), "AI/ML Engineer")
        self.assertEqual(data.get("skill_gap_count"), 0)
        self.assertEqual(len(data.get("missing_skills", [])), 0)
        self.assertIn("recommendations", data)


if __name__ == "__main__":
    unittest.main()