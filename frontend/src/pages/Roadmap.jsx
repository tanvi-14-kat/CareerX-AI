function Roadmap({ onMentor }) {
  const roadmap = [
    {
      week: "Week 1–2",
      title: "Master SQL Fundamentals",
      description:
        "Learn queries, filtering, joins, grouping, and basic database concepts.",
      skills: ["SELECT & WHERE", "JOINs", "GROUP BY", "Subqueries"],
      icon: "🗄️",
    },
    {
      week: "Week 3–4",
      title: "Strengthen Statistics",
      description:
        "Build a strong foundation in statistics used in data analysis.",
      skills: ["Probability", "Distributions", "Mean & Variance", "Hypothesis Testing"],
      icon: "📊",
    },
    {
      week: "Week 5–6",
      title: "Learn Data Visualization",
      description:
        "Create meaningful charts and dashboards to communicate insights.",
      skills: ["Charts", "Dashboards", "Power BI", "Data Storytelling"],
      icon: "📈",
    },
    {
      week: "Week 7–8",
      title: "Build Real Projects",
      description:
        "Apply your skills by working on practical data analysis projects.",
      skills: ["Portfolio Project", "Data Cleaning", "Analysis", "Presentation"],
      icon: "🚀",
    },
  ];

  return (
    <div className="roadmap-page">
      <div className="recommendations-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <span className="ai-badge">🗺️ Personalized Roadmap</span>
      </div>

      <main className="roadmap-container">
        <div className="roadmap-intro">
          <p className="assessment-label">YOUR LEARNING PLAN</p>

          <h1>
            Your path to becoming a
            <br />
            <span>Data Analyst.</span>
          </h1>

          <p>
            Based on your skill gap analysis, CareerX AI created a personalized
            8-week learning roadmap to help you become career-ready.
          </p>
        </div>

        <div className="roadmap-summary">
          <div>
            <span>Target Career</span>
            <strong>Data Analyst</strong>
          </div>

          <div>
            <span>Estimated Duration</span>
            <strong>8 Weeks</strong>
          </div>

          <div>
            <span>Current Readiness</span>
            <strong>61%</strong>
          </div>
        </div>

        <div className="roadmap-list">
          {roadmap.map((item, index) => (
            <div className="roadmap-card" key={item.title}>
              <div className="roadmap-number">
                {index + 1}
              </div>

              <div className="roadmap-icon">
                {item.icon}
              </div>

              <div className="roadmap-content">
                <span className="roadmap-week">{item.week}</span>

                <h2>{item.title}</h2>

                <p>{item.description}</p>

                <div className="roadmap-skills">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="roadmap-status">
                {index === 0 ? "Start Here" : "Upcoming"}
              </div>
            </div>
          ))}
        </div>

        <div className="roadmap-footer">
          <h2>🎯 Your goal</h2>

          <p>
            Complete the roadmap, build a strong portfolio, and become ready
            to apply for Data Analyst opportunities.
          </p>
        </div>
        <button className="submit-btn" onClick={onMentor}>
  Talk to Your AI Mentor →
</button>
      </main>
    </div>
  );
}

export default Roadmap;