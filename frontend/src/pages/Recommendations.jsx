function Recommendations({ onSkillGap }) {
      const careers = [
    {
      title: "Data Analyst",
      match: "94%",
      description:
        "Analyze data, discover patterns, and help organizations make better decisions.",
      skills: ["Python", "SQL", "Statistics", "Data Visualization"],
      reason: "Strong match with your interest in technology and data.",
    },
    {
      title: "Software Developer",
      match: "89%",
      description:
        "Build websites, applications, and software products using modern technologies.",
      skills: ["JavaScript", "React", "Problem Solving", "Git"],
      reason: "Matches your technical skills and interest in technology.",
    },
    {
      title: "Business Analyst",
      match: "82%",
      description:
        "Connect business needs with technology and use data to improve processes.",
      skills: ["Communication", "SQL", "Problem Solving", "Analytics"],
      reason: "Good fit for your analytical and communication abilities.",
    },
  ];

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <span className="ai-badge">✨ AI Analysis Complete</span>
      </div>

      <main className="recommendations-container">
        <div className="recommendations-intro">
          <p className="assessment-label">YOUR CAREER MATCHES</p>

          <h1>
            Careers that fit
            <br />
            <span>your profile.</span>
          </h1>

          <p>
            Based on your interests, skills, education, and career goals,
            CareerX AI found these career paths for you.
          </p>
        </div>

        <div className="career-list">
          {careers.map((career, index) => (
            <div className="career-card" key={career.title}>
              <div className="career-top">
                <div className="career-number">0{index + 1}</div>

                <div className="career-info">
                  <h2>{career.title}</h2>
                  <p>{career.description}</p>
                </div>

                <div className="match-score">
                  <strong>{career.match}</strong>
                  <span>match</span>
                </div>
              </div>

              <div className="career-reason">
                🎯 {career.reason}
              </div>

              <div className="career-skills">
                {career.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <button
  className="career-btn"
  onClick={onSkillGap}
>
  View Skill Gap →
</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Recommendations;