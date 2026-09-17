import React, { useState } from "react";
import { 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  FileText, 
  MessageSquare, 
  Mic2,
  CheckCircle2
} from "lucide-react";
import { PitchResult } from "../types";

interface PitchStudioProps {
  targetRole: string;
}

export const PitchStudio: React.FC<PitchStudioProps> = ({ targetRole }) => {
  const [role, setRole] = useState(targetRole || "Senior AI Solutions Engineer");
  const [companyName, setCompanyName] = useState("OpenAI / Anthropic / Enterprise AI Labs");
  const [keyStrengths, setKeyStrengths] = useState(
    "Full-stack TypeScript architecture, Google GenAI SDK, Vector database retrieval (RAG), low-latency distributed APIs, high ownership"
  );
  const [tone, setTone] = useState("Confident & Direct");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PitchResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: role,
          companyName,
          keyStrengths,
          tone,
          type: "Cover Letter and LinkedIn Pitch",
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Send className="w-3.5 h-3.5" />
          <span>Outreach & Branding Studio</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
          AI Cover Letter & LinkedIn Pitch Studio
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Convert your technical strengths into recruiter outreach messages, tailored cover letters, and high-impact 30-second elevator pitches.
        </p>
      </div>

      {/* Input Parameters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Role
            </label>
            <input
              id="pitch-target-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Company / Org
            </label>
            <input
              id="pitch-company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Anthropic, Google, Stripe"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Communication Tone
            </label>
            <select
              id="pitch-tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="Confident & Direct">Confident & Direct</option>
              <option value="Technical Authority">Technical Authority</option>
              <option value="Executive Visionary">Executive Visionary</option>
              <option value="Passionate & Mission-Driven">Passionate & Mission-Driven</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Key Accomplishments & Core Strengths
          </label>
          <textarea
            id="pitch-strengths-textarea"
            rows={2}
            value={keyStrengths}
            onChange={(e) => setKeyStrengths(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <button
          id="generate-pitch-button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Generating Targeted Pitch Suite...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Generate Pitch & Cover Letter</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Outputs */}
      {result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cover Letter (Left Column) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Tailored Cover Letter</span>
              </div>

              <button
                onClick={() => handleCopy(result.coverLetter, "cover")}
                className="flex items-center space-x-1.5 text-xs text-indigo-300 hover:text-white px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 transition cursor-pointer"
              >
                {copiedKey === "cover" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <span className="text-indigo-300 font-semibold">Subject:</span> {result.subjectLine}
            </div>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 font-sans">
              {result.coverLetter}
            </div>
          </div>

          {/* LinkedIn Pitch & Elevator Pitch (Right Column) */}
          <div className="lg:col-span-5 space-y-4">
            {/* LinkedIn InMail Pitch */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center space-x-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4" />
                  <span>LinkedIn Recruiter DM</span>
                </div>

                <button
                  onClick={() => handleCopy(result.linkedinPitch, "linkedin")}
                  className="flex items-center space-x-1 text-xs text-sky-300 hover:text-white px-2 py-0.5 rounded bg-sky-500/20 hover:bg-sky-500/40 transition cursor-pointer"
                >
                  {copiedKey === "linkedin" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedKey === "linkedin" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-xs text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-sans">
                {result.linkedinPitch}
              </div>
            </div>

            {/* 30-Second Elevator Pitch */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center space-x-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
                  <Mic2 className="w-4 h-4" />
                  <span>30-Second Elevator Pitch</span>
                </div>

                <button
                  onClick={() => handleCopy(result.elevatorPitch, "elevator")}
                  className="flex items-center space-x-1 text-xs text-violet-300 hover:text-white px-2 py-0.5 rounded bg-violet-500/20 hover:bg-violet-500/40 transition cursor-pointer"
                >
                  {copiedKey === "elevator" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedKey === "elevator" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 leading-relaxed italic">
                &quot;{result.elevatorPitch}&quot;
              </div>
            </div>

            {/* Key Selling Points */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Value Proposition Anchors
              </div>
              <ul className="space-y-1.5">
                {result.keySellingPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
