import React, { useState, useEffect } from "react";
import { 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  BookOpen, 
  Target,
  RefreshCw
} from "lucide-react";
import { SkillGapAnalyzeResponse } from "../types";
import { skillGapApi } from "../services/careerService";

interface SkillGapViewProps {
  initialCareer?: string;
  initialSkills?: string[];
  onNavigateToRoadmap?: () => void;
}

const CAREER_PRESETS = [
  "AI / ML Solutions Engineer",
  "AI/ML Engineer",
  "Full-Stack Software Engineer",
  "Product Designer & Design Technologist",
  "Data Scientist",
];

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  initialCareer = "AI / ML Solutions Engineer",
  initialSkills = ["Python", "JavaScript", "SQL", "Git"],
  onNavigateToRoadmap,
}) => {
  const [targetCareer, setTargetCareer] = useState(initialCareer);
  const [currentSkills, setCurrentSkills] = useState<string[]>(initialSkills);
  const [data, setData] = useState<SkillGapAnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSkillGap = async (career: string, skills: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await skillGapApi.analyzeSkillGap(career, skills);
      setData(res);
    } catch (err: any) {
      setError(err.message || "Could not analyze skill gap at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(targetCareer, currentSkills);
  }, [targetCareer]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Target Competency Breakdown</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Skill Gap Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Evaluate your verified technical capabilities against actual enterprise role requirements.
          </p>
        </div>

        {/* Role Preset Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={targetCareer}
            onChange={(e) => setTargetCareer(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
          >
            {CAREER_PRESETS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            onClick={() => fetchSkillGap(targetCareer, currentSkills)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition cursor-pointer"
            title="Refresh Analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-sm font-bold text-slate-800 font-display">
            Analyzing Skill Gap...
          </h3>
          <p className="text-xs text-slate-500">
            Comparing profile against modern tech hiring requirements
          </p>
        </div>
      )}

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
          <h4 className="text-sm font-bold text-amber-900 font-display">Connection Error</h4>
          <p className="text-xs text-amber-800">{error}</p>
          <button
            onClick={() => fetchSkillGap(targetCareer, currentSkills)}
            className="text-xs font-semibold text-amber-900 underline mt-2 inline-block cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-6">
          
          {/* Coverage Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  Current Readiness
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {data.career}
                </h2>
              </div>

              {/* Fractional coverage badge */}
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Skills Covered</span>
                  <div className="text-base font-extrabold text-indigo-600 font-display">
                    {data.skillsCoveredCount} of {data.totalTargetSkillsCount} ({data.coveragePercentage}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Core Competency Progress</span>
                <span>{data.coveragePercentage}% Ready</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, data.coveragePercentage))}%` }}
                />
              </div>
            </div>

            {/* 2-Column Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Mastered Skills */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Current Skills (Mastered)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded-full">
                    {data.currentSkills.length} Verified
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {data.currentSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-950 shadow-2xs"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-emerald-800/80 pt-1 leading-snug">
                  Competencies currently documented in your profile.
                </p>
              </div>

              {/* Skills to Develop */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Skills to Develop</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    {data.skillsToDevelop.length} Identified
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {data.skillsToDevelop.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      ○ {s}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 pt-1 leading-snug">
                  Key technical proficiencies that will accelerate your interview pass rates.
                </p>
              </div>

            </div>

            {/* Recommendations Timeline List */}
            {data.recommendations && data.recommendations.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Strategic Advisor Guidance
                </span>
                <div className="space-y-2">
                  {data.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/70"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Turn these skill gaps into an actionable, weekly learning roadmap.
              </span>

              {onNavigateToRoadmap && (
                <button
                  onClick={onNavigateToRoadmap}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
                >
                  <span>Build My Learning Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
