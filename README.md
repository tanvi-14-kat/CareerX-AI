# CareerX-AI 🚀

### AI-Powered Career Guidance System for Students

> **ED-02 — Develop an AI-powered career guidance system for students based on skills, interests, and market trends.**

CareerX-AI is a personalized career guidance platform designed to help students understand **which career paths align with their current skills, interests, education, goals, and available study time**.

Instead of giving students generic career suggestions, CareerX-AI creates a personalized journey from **self-assessment → career recommendation → skill-gap analysis → learning roadmap**.

---

## 🎯 Problem

Students often struggle to decide:

* Which career path is suitable for them
* Whether their current skills match a career
* Which skills they are missing
* What they should learn next
* How to turn a career goal into an actionable learning path

CareerX-AI addresses this by bringing these steps together into one guided experience.

---

## 💡 Solution

CareerX-AI analyzes a student's:

* 🎓 Education
* 💡 Interests
* 🛠️ Existing skills
* 🎯 Career goals
* ⏱️ Available study time

The system uses this information to generate personalized career recommendations and connect them with relevant skill-gap information and a learning roadmap.

### Core Flow

```text
Student Assessment
       ↓
Student Profile
       ↓
AI Career Recommendation
       ↓
Career Match & Explanation
       ↓
Skill Gap Analysis
       ↓
Personalized Learning Roadmap
```

---

# ✨ Key Features

## 1. 🧠 AI Career Recommendations

Students complete a guided career assessment covering their educational background, interests, capabilities, goals, and study availability.

The system then provides:

* Primary career recommendation
* Career match score
* Explanation of the recommendation
* Skills that already align with the career
* Skills that need development
* Recommended next steps
* Alternative career options

---

## 2. 📊 Career Match Analysis

Career recommendations are presented with an understandable breakdown of how the student's profile contributes to the recommendation.

Students can see how factors such as:

* Skills
* Interests
* Career goals
* Education

contribute to their overall career alignment.

---

## 3. 🔍 Skill Gap Analyzer

The Skill Gap feature helps students understand the difference between their current skill set and the skills required for their selected career.

It identifies:

* Existing skills
* Skills to develop
* Areas requiring improvement
* Recommended learning direction

This transforms a career recommendation into an actionable development plan.

---

## 4. 🗺️ Personalized Learning Roadmap

CareerX-AI connects the student's recommendation and skill-gap information with a personalized roadmap.

The roadmap uses the student's actual assessment and recommendation data, including:

* Target career
* Current skill foundation
* Skills to develop
* Recommended next steps
* Study-time information
* Career explanation

This allows students to move from **"What career should I choose?"** to **"What should I work on next?"**

---

## 5. 👤 My Career

The My Career area provides a centralized view of the student's career journey and profile information.

It helps students keep track of their selected career direction and related career-development information.

---

## 6. 🔎 Discover

The Discover experience acts as the entry point to the CareerX-AI platform and guides students toward exploring their career journey.

---

# 🏗️ System Architecture

CareerX-AI uses a React frontend connected to a FastAPI backend.

```text
┌─────────────────────────────┐
│          Student            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       React Frontend        │
│     Vite + TypeScript       │
│                             │
│ • Assessment               │
│ • Career Results            │
│ • Skill Gap                 │
│ • Roadmap                   │
│ • My Career                 │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│       FastAPI Backend       │
│                             │
│ • Career Recommendation     │
│ • Skill Gap Analysis        │
│ • Validation & Schemas      │
│ • Career Data               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Career Data Layer      │
│                             │
│      careers.json           │
└─────────────────────────────┘
```

---

# 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Motion

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### Development & Testing

* Git
* GitHub
* VS Code
* TypeScript compiler
* Python unittest

---

# 📁 Project Structure

```text
CareerX-AI/
│
├── backend/
│   ├── data/
│   │   └── careers.json
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   ├── routes/
│   │   ├── career.py
│   │   └── skill.py
│   │
│   ├── services/
│   │   ├── career_service.py
│   │   └── skill_service.py
│   │
│   ├── tests/
│   │   └── test_*.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── types.ts
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

# 🔄 Application Flow

### Step 1 — Assessment

The student provides information about:

```text
Education
   +
Interests
   +
Skills
   +
Career Goal
   +
Study Hours
```

### Step 2 — Career Recommendation

The frontend sends the student profile to:

```text
POST /api/career/recommend
```

The backend analyzes the profile and returns career recommendations.

### Step 3 — Career Results

The student receives:

* Recommended career
* Match score
* Explanation
* Strength alignment
* Matched skills
* Skills to develop
* Recommended next steps
* Alternative careers

### Step 4 — Skill Gap

The selected career can be analyzed through:

```text
POST /api/skill-gap/analyze
```

The student can then understand which skills need development.

### Step 5 — Roadmap

The recommendation and skill-gap information are connected to the personalized learning roadmap.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

* Python
* Node.js
* npm
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/tanvi-14-kat/CareerX-AI.git
cd CareerX-AI
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create/activate the Python environment if required.

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Frontend Setup

Open a **new terminal**.

Navigate to the frontend:

```powershell
cd "C:\path\to\CareerX-AI\frontend"
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The frontend will be available at the URL shown by Vite, typically:

```text
http://localhost:3000
```

---

# 🧪 Testing

## Frontend TypeScript Check

From the `frontend` directory:

```powershell
npm run lint
```

## Production Build

```powershell
npm run build
```

## Backend Tests

From the `backend` directory:

```powershell
.\venv\Scripts\python.exe -m unittest discover -s tests -p "test_*.py" -v
```

---

# 🔌 API Endpoints

### Career Recommendation

```text
POST /api/career/recommend
```

Accepts a student profile containing:

```json
{
  "education": "Computer Science",
  "interests": ["AI", "Technology"],
  "skills": ["Python", "SQL", "Git"],
  "goal": "Build AI-powered applications",
  "study_hours": 10
}
```

Returns personalized career recommendations and supporting information.

---

### Skill Gap Analysis

```text
POST /api/skill-gap/analyze
```

Analyzes the relationship between a target career and the student's current skills.

---

# 🎨 Design Principles

CareerX-AI follows a modern AI SaaS design approach focused on:

* Clean visual hierarchy
* Student-friendly language
* Responsive layouts
* Accessible information presentation
* Clear career progression
* Minimal cognitive overload
* Action-oriented recommendations

The interface uses a warm, premium visual direction with deep navy, indigo/violet accents, subtle borders, and restrained shadows.

---

# 🔐 Data & Privacy

CareerX-AI is designed as a hackathon prototype.

Student assessment information used by the frontend is handled as part of the application's current prototype flow. The project does not claim to provide production-grade data security or privacy infrastructure.

For production deployment, additional authentication, authorization, secure storage, privacy controls, monitoring, and compliance measures would be required.

---

# 🚧 Prototype Scope

CareerX-AI is a hackathon prototype focused on demonstrating the core personalized career-guidance journey.

The implemented core experience includes:

```text
Assessment
    ↓
Career Recommendation
    ↓
Career Results
    ↓
Skill Gap
    ↓
Personalized Roadmap
```

Additional career guidance capabilities can be extended in future versions using richer labor-market data, additional career datasets, conversational mentoring, and deeper personalization.

---

# 🚀 Future Expansion

Potential future improvements include:

* Live labor-market and job-demand data
* Conversational AI career mentor
* Personalized course recommendations
* Resume and portfolio assistance
* Career simulation / What-If analysis
* Skill assessment quizzes
* Gamification
* Mentor and counselor connections
* More detailed market intelligence
* Progress analytics

These are planned expansion areas rather than claims about the current prototype.

---

# 🏆 Hackathon Context

**Problem Statement:**
**ED-02 — Develop an AI-powered career guidance system for students based on skills, interests, and market trends.**

**Project:** CareerX-AI

CareerX-AI aims to make career exploration more personalized and actionable by connecting a student's current profile with career recommendations, skill-gap insights, and a structured learning path.

---

## 👥 Team

Built as a collaborative hackathon project.

### Contributions

* **Backend:** Career recommendation API, skill-gap services, data models, career data, API integration
* **Frontend:** Student-facing interface, assessment flow, career results, skill-gap experience, roadmap, and responsive UI

---

# 📌 Project Status

**Hackathon Prototype — Functional**

The current prototype demonstrates an end-to-end personalized career guidance workflow from student assessment through career recommendation, skill-gap analysis, and roadmap generation.

---

## 📄 License

This project was created as a hackathon prototype for educational and demonstration purposes.
