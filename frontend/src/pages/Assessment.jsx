import { useState } from "react";

function Assessment({ onComplete }) {
      const [formData, setFormData] = useState({
    education: "",
    interests: [],
    skills: [],
    goal: "",
    studyTime: "",
  });

  const interests = [
    "Technology",
    "Business",
    "Design",
    "Science",
    "Finance",
    "Healthcare",
  ];

  const skills = [
    "Python",
    "JavaScript",
    "SQL",
    "Communication",
    "Problem Solving",
    "Data Analysis",
  ];

  const toggleItem = (category, item) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((value) => value !== item)
        : [...prev[category], item],
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Student Assessment:", formData);

  localStorage.setItem(
    "careerx_assessment",
    JSON.stringify(formData)
  );

onComplete();
};

  return (
    <div className="assessment-page">
      <div className="assessment-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <div className="step">
          Step 1 of 4
        </div>
      </div>

      <div className="assessment-container">
        <div className="assessment-intro">
          <p className="assessment-label">AI CAREER ASSESSMENT</p>

          <h1>
            Tell us about
            <br />
            <span>yourself.</span>
          </h1>

          <p>
            Answer a few questions so CareerX AI can understand your
            interests, skills, and goals.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="assessment-card">
            <h2>1. What's your current education?</h2>

            <select
              value={formData.education}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  education: e.target.value,
                })
              }
              required
            >
              <option value="">Select your education</option>
              <option value="School">School</option>
              <option value="Diploma">Diploma</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Other">Other</option>
            </select>
          </section>

          <section className="assessment-card">
            <h2>2. What are you interested in?</h2>

            <div className="option-grid">
              {interests.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className={
                    formData.interests.includes(interest)
                      ? "option selected"
                      : "option"
                  }
                  onClick={() => toggleItem("interests", interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </section>

          <section className="assessment-card">
            <h2>3. What skills do you already have?</h2>

            <div className="option-grid">
              {skills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  className={
                    formData.skills.includes(skill)
                      ? "option selected"
                      : "option"
                  }
                  onClick={() => toggleItem("skills", skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </section>

          <section className="assessment-card">
            <h2>4. What is your career goal?</h2>

            <textarea
              placeholder="Example: I want to become a data scientist..."
              value={formData.goal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goal: e.target.value,
                })
              }
              required
            />
          </section>

          <section className="assessment-card">
            <h2>5. How much time can you study each day?</h2>

            <div className="option-grid">
              {["1 hour", "2 hours", "3 hours", "4+ hours"].map(
                (time) => (
                  <button
                    type="button"
                    key={time}
                    className={
                      formData.studyTime === time
                        ? "option selected"
                        : "option"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        studyTime: time,
                      })
                    }
                  >
                    {time}
                  </button>
                )
              )}
            </div>
          </section>

          <button className="submit-btn" type="submit">
            Analyze My Career →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Assessment;