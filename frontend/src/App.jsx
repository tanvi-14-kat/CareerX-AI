import Roadmap from "./pages/Roadmap";
import { useState } from "react";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import SkillGap from "./pages/SkillGap";
import Mentor from "./pages/Mentor";
import MarketTrends from "./pages/MarketTrends";
import "./index.css";

function App() {
const [page, setPage] = useState("home");
if (page === "assessment") {
  return (
    <Assessment
      onBack={() => setPage("home")}
      onComplete={() => setPage("recommendations")}
    />
  );
}

if (page === "recommendations") {
  return (
    <Recommendations
      onSkillGap={() => setPage("skillgap")}
    />
  );
}
if (page === "skillgap") {
  return (
    <SkillGap
      onRoadmap={() => setPage("roadmap")}
    />
  );
}

if (page === "roadmap") {
  return (
    <Roadmap
      onMentor={() => setPage("mentor")}
    />
  );
}

if (page === "mentor") {
  return <Mentor />;
}
if (page === "market") {
  return <MarketTrends />;
}

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <div className="nav-links">
  <a href="#features">Features</a>

  <button
    className="nav-market-btn"
    onClick={() => setPage("market")}
  >
    Market Trends
  </button>

  <button className="login-btn">Log In</button>
</div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <div className="badge">✨ AI-Powered Career Guidance</div>

          <h1>
            Discover the career
            <br />
            <span>that fits you.</span>
          </h1>

          <p>
            CareerX AI analyzes your skills, interests, and goals to recommend
            career paths and create a personalized roadmap for you.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setPage("assessment")}
            >
              Start Your Career Journey →
            </button>

            <a href="#features" className="secondary-btn">
              Explore Careers
            </a>
          </div>

          <div className="trust">
            <div className="avatars">
              <span>👩🏻</span>
              <span>👨🏻</span>
              <span>👩🏽</span>
              <span>👨🏽</span>
            </div>

            <p>Helping students make smarter career decisions</p>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <div>
              <small>Your Career Match</small>
              <h3>Data Analyst</h3>
            </div>

            <div className="score">94%</div>
          </div>

          <div className="progress">
            <div></div>
          </div>

          <p className="match-text">
            Strong match based on your interests and skills.
          </p>

          <div className="skills">
            <span>Python</span>
            <span>SQL</span>
            <span>Analytics</span>
          </div>

          <button className="card-btn">View Career Path →</button>
        </div>
      </main>

      <section id="features" className="features">
        <h2>Everything you need to plan your career.</h2>

        <p>
          From discovering careers to building the skills you need to succeed.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">🎯</div>
            <h3>AI Career Recommendations</h3>
            <p>
              Find career paths that match your interests, skills, and goals.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Skill Gap Analysis</h3>
            <p>
              Discover which skills you need to develop for your target career.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🗺️</div>
            <h3>Personalized Roadmap</h3>
            <p>
              Get a step-by-step learning plan designed around your goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;