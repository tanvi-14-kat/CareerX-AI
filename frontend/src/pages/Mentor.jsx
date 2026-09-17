import { useState } from "react";

function Mentor() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your CareerX AI Mentor. 👋 Ask me anything about your career, skills, learning plan, or job preparation.",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "That's a great question! Based on your Data Analyst career path, I recommend focusing on SQL, statistics, data visualization, and building practical projects.",
        },
      ]);
    }, 700);

    setMessage("");
  };

  return (
    <div className="mentor-page">
      <div className="recommendations-header">
        <div className="logo">
          CareerX<span>AI</span>
        </div>

        <span className="ai-badge">
          🤖 AI Career Mentor
        </span>
      </div>

      <main className="mentor-container">
        <div className="mentor-intro">
          <p className="assessment-label">YOUR AI MENTOR</p>

          <h1>
            Ask anything about
            <br />
            <span>your career.</span>
          </h1>

          <p>
            Get personalized guidance based on your skills, interests,
            career goals, and learning roadmap.
          </p>
        </div>

        <div className="mentor-card">
          <div className="mentor-header">
            <div className="mentor-avatar">
              🤖
            </div>

            <div>
              <h2>CareerX AI Mentor</h2>
              <span>● Online</span>
            </div>
          </div>

          <div className="chat-area">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="chat-avatar">🤖</div>
                )}

                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="suggestions">
            <button
              onClick={() =>
                setMessage("What skills should I learn first?")
              }
            >
              What skills should I learn first?
            </button>

            <button
              onClick={() =>
                setMessage("How can I get my first Data Analyst job?")
              }
            >
              How can I get my first job?
            </button>

            <button
              onClick={() =>
                setMessage("What projects should I build?")
              }
            >
              What projects should I build?
            </button>
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask your AI mentor anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">
              Send →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Mentor;