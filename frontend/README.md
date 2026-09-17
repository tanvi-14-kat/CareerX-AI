# CareerX AI

CareerX AI is an AI-powered career intelligence, resume ATS scoring, skill gap roadmap, and mock interview coaching platform.

## Features

- **Resume & ATS Optimization Scanner**: Evaluates ATS pass rates, identifies missing high-yield keywords, and rewrites bullet points into quantified STAR-format achievements.
- **Skill Gap & Career Roadmap Architect**: Compares baseline proficiencies with target dream roles (AI Engineer, ML Scientist, AI Product Manager, etc.) to generate milestone-driven learning blueprints.
- **AI Mock Interview & Bar Raiser Coach**: Simulates technical, behavioral, and system design interviews with instant rubric evaluations, voice dictation, and benchmark answers.
- **Pitch & Cover Letter Studio**: Generates tailored cover letters, recruiter LinkedIn InMails, and 30-second elevator pitches with customizable communication tones.
- **Market Intelligence & Compensation Benchmarks**: Real-time salary percentiles (25th, median, 75th, 90th) and upskilling ROI projections across top technology disciplines.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: FastAPI
  - `GET /`
  - `GET /health`
  - `POST /api/career/recommend`
  - `POST /api/skill-gap/analyze`

