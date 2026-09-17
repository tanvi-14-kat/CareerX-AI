import React, { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ChevronRight, 
  Lightbulb, 
  Award,
  BookOpen,
  Volume2,
  Check
} from "lucide-react";
import { InterviewSession, InterviewQuestion, AnswerEvaluation } from "../types";

interface MockInterviewProps {
  targetRole: string;
}

export const MockInterview: React.FC<MockInterviewProps> = ({ targetRole }) => {
  const [level, setLevel] = useState("Senior");
  const [interviewType, setInterviewType] = useState("Technical & Architecture");
  const [role, setRole] = useState(targetRole || "Senior AI Solutions Engineer");
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [evalHistory, setEvalHistory] = useState<Record<number, AnswerEvaluation>>({});

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (targetRole) {
      setRole(targetRole);
    }
  }, [targetRole]);

  // Speech Recognition setup if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer((prev) => prev + " " + transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type your answer directly.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn("Speech error:", err);
      }
    }
  };

  const handleStartInterview = async () => {
    setLoadingSession(true);
    setEvaluation(null);
    setEvalHistory({});
    setCurrentIdx(0);
    setAnswer("");

    try {
      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, level, interviewType }),
      });
      const data = await res.json();
      setSession(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSession(false);
    }
  };

  const handleEvaluate = async () => {
    if (!session || !answer.trim()) return;
    setEvaluating(true);

    try {
      const activeQ = session.questions[currentIdx];
      const res = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQ.question,
          answer,
          role: session.role,
          level: session.level,
        }),
      });
      const data = await res.json();
      setEvaluation(data);
      setEvalHistory((prev) => ({
        ...prev,
        [currentIdx]: data,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (!session) return;
    if (currentIdx < session.questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setAnswer("");
      setShowHint(false);
      setEvaluation(evalHistory[nextIdx] || null);
    }
  };

  const handleSampleAnswer = () => {
    setAnswer(
      "In my previous architecture, we needed to scale LLM RAG pipelines across 50,000 requests per day. The major constraint was strict P95 latency under 800ms while retaining citation accuracy. I redesigned the ingestion layer using semantic chunking with pgvector embeddings, introduced an in-memory Redis cache for frequent semantic clusters, and implemented streaming responses with Server-Sent Events. This reduced median latency by 62% and brought zero-hallucination guardrails into compliance with SOC2 standards."
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Mic className="w-3.5 h-3.5" />
          <span>Bar Raiser Interview Simulator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
          AI Mock Interview & Bar Raiser Coach
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Simulate realistic technical and behavioral interviews. Receive instant rubric evaluations, STAR scoring, technical depth critique, and model answers.
        </p>
      </div>

      {/* Setup Form */}
      {!session ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                id="interview-role-input"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior AI Solutions Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Seniority Level
              </label>
              <select
                id="interview-level-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                <option value="Junior / Entry">Junior / Entry</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Staff / Principal">Staff / Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Interview Track
              </label>
              <select
                id="interview-track-select"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                <option value="Technical & Architecture">Technical & Architecture</option>
                <option value="Behavioral & STAR Leadership">Behavioral & STAR Leadership</option>
                <option value="System Design & Scale">System Design & Scale</option>
                <option value="Executive Problem Solving">Executive Problem Solving</option>
              </select>
            </div>
          </div>

          <button
            id="start-mock-interview-button"
            onClick={handleStartInterview}
            disabled={loadingSession}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loadingSession ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Assembling Question Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Start AI Mock Interview Loop</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Active Interview Session */
        <div className="space-y-5">
          {/* Top Session Progress Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
                {session.trackTitle}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Interviewer: <span className="text-slate-200 font-medium">{session.interviewerPersona}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">
                Question {currentIdx + 1} of {session.questions.length}
              </span>
              <button
                id="reset-interview-button"
                onClick={() => setSession(null)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
              >
                Change Track
              </button>
            </div>
          </div>

          {/* Question Card */}
          {session.questions[currentIdx] && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {session.questions[currentIdx].category}
                </span>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-slate-400 hover:text-indigo-300 flex items-center space-x-1 transition"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? "Hide Hint" : "Strategy Hint"}</span>
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                &quot;{session.questions[currentIdx].question}&quot;
              </h3>

              <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="font-semibold text-slate-300">Bar Raiser Criteria:</span>{" "}
                {session.questions[currentIdx].evalCriteria}
              </div>

              {showHint && (
                <div className="text-xs text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/50 flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{session.questions[currentIdx].hint}</span>
                </div>
              )}

              {/* Answer Input Box */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Your Response
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSampleAnswer}
                      className="text-[11px] text-slate-400 hover:text-indigo-300 transition"
                    >
                      Fill Sample Answer
                    </button>
                    <button
                      onClick={toggleRecording}
                      className={`flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg border transition ${
                        isRecording
                          ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-indigo-400" />}
                      <span>{isRecording ? "Recording..." : "Voice Mic"}</span>
                    </button>
                  </div>
                </div>

                <textarea
                  id="candidate-interview-answer"
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Structure your answer using the STAR method: Situation, Task, Action taken, and quantifiable Result..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition leading-relaxed resize-y font-mono"
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    {answer.trim().split(/\s+/).filter(Boolean).length} words
                  </div>

                  <button
                    id="submit-answer-button"
                    onClick={handleEvaluate}
                    disabled={evaluating || !answer.trim()}
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20 flex items-center space-x-2 cursor-pointer"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Evaluating Response...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                        <span>Submit for Evaluation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback & Scorecard */}
          {evaluation && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
              {/* Verdict Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-800 gap-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    evaluation.verdict === "Strong Hire" || evaluation.verdict === "Hire"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {evaluation.verdict}
                  </div>
                  <span className="text-sm font-semibold text-slate-200">
                    Bar Raiser Recommendation
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <div>
                    <span className="text-slate-400">Clarity: </span>
                    <span className="font-bold text-slate-200">{evaluation.clarityScore}/10</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tech Depth: </span>
                    <span className="font-bold text-slate-200">{evaluation.technicalDepthScore}/10</span>
                  </div>
                  <div>
                    <span className="text-slate-400">STAR Adherence: </span>
                    <span className="font-bold text-slate-200">{evaluation.starAdherenceScore}/10</span>
                  </div>
                </div>
              </div>

              {/* Highlights & Growth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-emerald-950/60 rounded-xl p-4">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Effective Aspects</span>
                  </div>
                  <ul className="space-y-1">
                    {evaluation.keyHighlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-emerald-400">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/60 border border-amber-950/60 rounded-xl p-4">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Actionable Improvements</span>
                  </div>
                  <ul className="space-y-1">
                    {evaluation.growthAreas.map((g, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-amber-400">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer */}
              <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Principal / Staff Bar Raiser Benchmark Answer</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {evaluation.modelAnswer}
                </p>
              </div>

              {/* Next Question / Finish Loop */}
              <div className="flex justify-end pt-2">
                {currentIdx < session.questions.length - 1 ? (
                  <button
                    id="next-interview-question-button"
                    onClick={handleNextQuestion}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    <span>Next Question ({currentIdx + 2}/{session.questions.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Interview Loop Completed! Review your scores above or start a new track.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
