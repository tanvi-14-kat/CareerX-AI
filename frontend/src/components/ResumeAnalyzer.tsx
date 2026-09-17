import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Layers, 
  Target,
  Upload,
  BarChart3,
  Award
} from "lucide-react";
import { ResumeAnalysisResult } from "../types";

interface ResumeAnalyzerProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  targetJobDescription: string;
  setTargetJobDescription: (jd: string) => void;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  resumeText,
  setResumeText,
  targetRole,
  setTargetRole,
  targetJobDescription,
  setTargetJobDescription,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showJdInput, setShowJdInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setErrorMsg("Please paste or upload your resume text first.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          targetRole,
          jobDescription: targetJobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setResumeText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Hero Overview */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS Bar Raiser Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Resume & ATS Optimization Scanner
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Audit your resume against modern ATS algorithms (Workday, Greenhouse, Lever) and get instant STAR-method bullet enhancements with quantifiable impact metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="toggle-job-description-button"
              onClick={() => setShowJdInput(!showJdInput)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              {showJdInput ? "Hide Job Description" : "+ Add Target Job Description"}
            </button>
            <label className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Upload .txt / .md</span>
              <input type="file" accept=".txt,.md,.json,.csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Input Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Job Title / Domain
              </label>
              <input
                id="target-role-input"
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior AI Solutions Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {showJdInput && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Job Description (for Keyword Gap Scoring)
                </label>
                <textarea
                  id="target-jd-textarea"
                  rows={4}
                  value={targetJobDescription}
                  onChange={(e) => setTargetJobDescription(e.target.value)}
                  placeholder="Paste the target job description or requirements here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-y font-mono"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Resume Content
                </label>
                <span className="text-[11px] text-slate-500">
                  {resumeText.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                id="resume-text-input"
                rows={12}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume markdown or plain text here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono leading-relaxed resize-y"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="analyze-resume-button"
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing ATS Fit & Metrics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Run Bar Raiser ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Results or Placeholder */}
        <div className="lg:col-span-7">
          {!result && !loading && (
            <div className="h-full min-h-[380px] bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-slate-200 mb-1">Ready for Assessment</h3>
              <p className="text-slate-400 text-xs max-w-sm mb-5">
                Click &quot;Run Bar Raiser ATS Audit&quot; to calculate your ATS pass-rate, highlight missing critical keywords, and receive tailored STAR rewrites.
              </p>
              <button
                id="quick-start-analysis-button"
                onClick={handleAnalyze}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
              >
                Scan alex.rivera (SWE → AI)
              </button>
            </div>
          )}

          {loading && (
            <div className="min-h-[420px] bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <Sparkles className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Benchmarking Against ATS Engines</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Parsing keywords, evaluating quantifiable impact verbs, and verifying seniority alignment...
                </p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Overall Fit</div>
                  <div className="text-2xl font-bold text-white font-display mt-1">
                    <span className={result.overallScore >= 80 ? "text-emerald-400" : result.overallScore >= 65 ? "text-amber-400" : "text-rose-400"}>
                      {result.overallScore}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">/100</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">ATS Compatibility</div>
                  <div className="text-2xl font-bold text-white font-display mt-1">
                    <span className={result.atsScore >= 75 ? "text-emerald-400" : "text-amber-400"}>
                      {result.atsScore}%
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Bullet Impact</div>
                  <div className="text-2xl font-bold text-white font-display mt-1">
                    <span className={result.impactScore >= 70 ? "text-indigo-400" : "text-amber-400"}>
                      {result.impactScore}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">/100</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Seniority Tier</div>
                  <div className="text-sm font-bold text-indigo-300 mt-2 truncate">
                    {result.experienceLevel || "Mid-Level"}
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Executive Recruiter Assessment</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Strengths & Critical Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/70 border border-emerald-950/60 rounded-xl p-4">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Competitive Strengths</span>
                  </div>
                  <ul className="space-y-1.5">
                    {result.strengths.map((s, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/70 border border-amber-950/60 rounded-xl p-4">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>High-Priority Refinements</span>
                  </div>
                  <ul className="space-y-1.5">
                    {result.criticalGaps.map((g, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ATS Keywords Matrix */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>ATS Keyword Match Matrix</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {result.atsKeywordsFound.length} Matched / {result.atsKeywordsMissing.length} Missing
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-emerald-400 block mb-1.5">
                    ✓ Indexed Keywords Found:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.atsKeywordsFound.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-amber-400 block mb-1.5">
                    ⚠ Recommended Keywords to Inject for {targetRole || "Role"}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.atsKeywordsMissing.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-950/50 border border-amber-800/60 text-amber-300">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* STAR Bullet Point Rewriter */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>STAR Method Bullet Enhancements</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Metric-driven rewrites
                  </span>
                </div>

                <div className="space-y-3">
                  {result.bulletImprovements.map((b, idx) => (
                    <div key={idx} className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          <span>Original Bullet Point</span>
                          <span className="text-amber-400">Lacks Metric Punch</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 italic pl-2 border-l-2 border-slate-700">
                          &quot;{b.original}&quot;
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-500 bg-slate-900/60 rounded p-2 border border-slate-800">
                        <span className="font-semibold text-slate-400">Diagnosis:</span> {b.critique}
                      </div>

                      <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            <span>STAR Quantified Rewrite</span>
                          </span>
                          <button
                            onClick={() => handleCopyBullet(b.improved, idx)}
                            className="flex items-center space-x-1 text-[11px] text-indigo-300 hover:text-white px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/40 transition cursor-pointer"
                          >
                            {copiedIdx === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed">
                          {b.improved}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Breakdown */}
              {result.sectionFeedback && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                    Section-by-Section Health Check
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.sectionFeedback.map((sec, i) => (
                      <div key={i} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-200">{sec.section}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            sec.rating === "Excellent"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : sec.rating === "Good"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}>
                            {sec.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{sec.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
