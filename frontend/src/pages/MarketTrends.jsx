function MarketTrends() {
  const careers = [
    {
      title: "Data Analyst",
      demand: "High Demand",
      growth: "+23%",
      salary: "₹6–12 LPA",
      skills: ["SQL", "Python", "Power BI"],
      icon: "📊",
    },
    {
      title: "AI / ML Engineer",
      demand: "Very High Demand",
      growth: "+35%",
      salary: "₹8–18 LPA",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      icon: "🤖",
    },
    {
      title: "Software Developer",
      demand: "High Demand",
      growth: "+28%",
      salary: "₹6–15 LPA",
      skills: ["JavaScript", "React", "Git"],
      icon: "💻",
    },
    {
      title: "Cybersecurity Analyst",
      demand: "Growing Fast",
      growth: "+31%",
      salary: "₹6–14 LPA",
      skills: ["Networking", "Security", "Linux"],
      icon: "🔐",
    },
  ];

  return (
    <div className="market-page">
      <div className="recommendations-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <span className="ai-badge">
          📈 Live Market Trends
        </span>
      </div>

      <main className="market-container">
        <div className="market-intro">
          <p className="assessment-label">CAREER MARKET INSIGHTS</p>

          <h1>
            Careers that are
            <br />
            <span>growing fast.</span>
          </h1>

          <p>
            Explore career paths with strong market demand and discover
            the skills employers are looking for.
          </p>
        </div>

        <div className="market-banner">
          <div>
            <span>MARKET UPDATE</span>
            <h2>Technology careers continue to grow</h2>
            <p>
              Demand for data, AI, software, and cybersecurity skills
              continues to create new career opportunities.
            </p>
          </div>

          <div className="trend-icon">📈</div>
        </div>

        <div className="market-section">
          <div className="section-heading">
            <div>
              <p className="assessment-label">TOP CAREER TRENDS</p>
              <h2>Explore growing careers</h2>
            </div>

            <span className="updated">
              Updated recently
            </span>
          </div>

          <div className="market-grid">
            {careers.map((career) => (
              <div className="market-card" key={career.title}>
                <div className="market-card-top">
                  <div className="market-career-icon">
                    {career.icon}
                  </div>

                  <span className="demand">
                    {career.demand}
                  </span>
                </div>

                <h3>{career.title}</h3>

                <div className="market-stats">
                  <div>
                    <span>Growth</span>
                    <strong>{career.growth}</strong>
                  </div>

                  <div>
                    <span>Salary</span>
                    <strong>{career.salary}</strong>
                  </div>
                </div>

                <p className="skills-label">
                  In-demand skills
                </p>

                <div className="market-skills">
                  {career.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="market-insight">
          <div className="insight-icon">💡</div>

          <div>
            <h2>What this means for you</h2>

            <p>
              Since your recommended career is Data Analyst, focusing on
              SQL, Python, statistics, and data visualization can help
              you align your skills with current market requirements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MarketTrends;