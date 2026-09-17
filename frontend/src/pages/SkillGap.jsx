function SkillGap({ onRoadmap }) {
  const skills = [
    {
      name: "Python",
      level: "Strong",
      percentage: 85,
      status: "strong",
    },
    {
      name: "SQL",
      level: "Needs Improvement",
      percentage: 55,
      status: "medium",
    },
    {
      name: "Statistics",
      level: "Beginner",
      percentage: 30,
      status: "weak",
    },
    {
      name: "Data Visualization",
      level: "Needs Improvement",
      percentage: 45,
      status: "medium",
    },
  ];

  return (
    <div className="skill-gap-page">
      <div className="recommendations-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <span className="ai-badge">
          🎯 Skill Gap Analysis
        </span>
      </div>

      <main className="skill-gap-container">
        <div className="skill-gap-intro">
          <p className="assessment-label">
            DATA ANALYST
          </p>

          <h1>
            Your skill
            <br />
            <span>gap analysis.</span>
          </h1>

          <p>
            We've compared your current skills with the skills commonly
            required for a Data Analyst career.
          </p>
        </div>

        <div className="skill-summary">
          <div>
            <span>Overall Readiness</span>
            <strong>61%</strong>
          </div>

          <div className="summary-bar">
            <div style={{ width: "61%" }}></div>
          </div>

          <p>
            You're on the right track. Focus on the highlighted skills to
            become career-ready.
          </p>
        </div>

        <div className="skills-analysis">
          <h2>Skills Analysis</h2>

          {skills.map((skill) => (
            <div className="skill-row" key={skill.name}>
              <div className="skill-info">
                <div>
                  <strong>{skill.name}</strong>

                  <span
                    className={`skill-status ${skill.status}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <span>{skill.percentage}%</span>
              </div>

              <div className="skill-bar">
                <div
                  style={{
                    width: `${skill.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="next-steps">
          <h2>Recommended next steps</h2>

          <div className="step-card">
            <div className="step-icon">📊</div>

            <div>
              <h3>Learn SQL fundamentals</h3>

              <p>
                Practice queries, joins, filtering, grouping,
                and database concepts.
              </p>
            </div>

            <span>2–3 weeks</span>
          </div>

          <div className="step-card">
            <div className="step-icon">📈</div>

            <div>
              <h3>Master data visualization</h3>

              <p>
                Learn how to create meaningful charts and
                dashboards using popular tools.
              </p>
            </div>

            <span>2 weeks</span>
          </div>

          <div className="step-card">
            <div className="step-icon">🧮</div>

            <div>
              <h3>Strengthen statistics</h3>

              <p>
                Build your understanding of probability,
                distributions, and statistical analysis.
              </p>
            </div>

            <span>3–4 weeks</span>
          </div>
        </div>

        <button
          className="submit-btn"
          onClick={onRoadmap}
        >
          View Personalized Roadmap →
        </button>
      </main>
    </div>
  );
}

export default SkillGap;