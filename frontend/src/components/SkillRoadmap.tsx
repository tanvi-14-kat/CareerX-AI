import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Code2, 
  Award, 
  ChevronRight,
  ListChecks,
  Briefcase
} from "lucide-react";
import { SkillGapResult } from "../types";

interface SkillRoadmapProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  currentSkills: string;
  setCurrentSkills: (skills: string) => void;
  experienceYears: string;
  setExperienceYears: (yrs: string) => void;
}

export const SkillRoadmap: React.FC<SkillRoadmapProps> = ({
  currentRole,
  setCurrentRole,
  targetRole,
  setTargetRole,
  currentSkills,
  setCurrentSkills,
  experienceYears,
  setExperienceYears,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentRole,
          targetRole,
          currentSkills,
          experienceYears,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate career roadmap.");
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Compass className="w-3.5 h-3.5" />
          <span>Strategic Career Architect</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
          Skill Gap Analysis & Transition Blueprint
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Map your trajectory from your current baseline to target senior roles. Discover high-leverage skill gaps, enterprise portfolio projects, and actionable weekly milestones.
        </p>
      </div>

      {/* Input Configuration */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Role / Baseline
            </label>
            <input
              id="current-role-input"
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Full-Stack Software Engineer"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Dream Role
            </label>
            <input
              id="target-role-roadmap-input"
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior AI Solutions Engineer"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Years of Experience
            </label>
            <select
              id="experience-years-select"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="0-1">0 - 1 Year (Entry)</option>
              <option value="2-3">2 - 3 Years (Mid-Level)</option>
              <option value="4-6">4 - 6 Years (Senior)</option>
              <option value="7+">7+ Years (Staff / Lead)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Current Skill Stack & Proficiencies
          </label>
          <input
            id="current-skills-input"
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="e.g. TypeScript, React, Node.js, Express, PostgreSQL, Docker, AWS"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <button
          id="generate-roadmap-button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Synthesizing Tailored Transition Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Architect Career Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Roadmap Output */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 font-bold font-display text-lg">
                {result.readinessPercentage}%
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Target Readiness</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {result.readinessPercentage >= 70 ? "Advanced Foundation" : "Moderate Progression"}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Industry Demand</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  {result.targetRoleDemand} Velocity
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Target Timeline</div>
                <div className="text-sm font-bold text-violet-300 mt-0.5">
                  {result.estimatedTransitionTime}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Matrix: Mastered vs To Acquire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Existing Transferable Strengths</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skillsMastered.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Critical Skill Gaps to Bridge</span>
              </div>
              <div className="space-y-2">
                {result.skillsToAcquire.map((item, idx) => (
                  <div key={idx} className="p-2 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{item.skill}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.reason}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      item.priority === "Critical" 
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase-by-Phase Timeline */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-sm font-semibold text-white font-display">
                <ListChecks className="w-4 h-4 text-indigo-400" />
                <span>Structured Milestone Roadmap</span>
              </div>
              <span className="text-xs text-slate-400">
                Click checkboxes to track active mastery
              </span>
            </div>

            <div className="space-y-6">
              {result.roadmap.map((phase) => (
                <div key={phase.phase} className="relative pl-6 border-l-2 border-indigo-500/30 space-y-3">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[9px] text-white font-bold">
                    {phase.phase}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                      <span>Phase {phase.phase}: {phase.title}</span>
                    </h4>
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/40 w-fit">
                      {phase.timeframe}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{phase.focus}</p>

                  {/* Milestones */}
                  <div className="space-y-1.5 pt-1">
                    {phase.keyMilestones.map((m, mIdx) => {
                      const mKey = `phase-${phase.phase}-m-${mIdx}`;
                      const isDone = Boolean(completedMilestones[mKey]);
                      return (
                        <div
                          key={mIdx}
                          onClick={() => toggleMilestone(mKey)}
                          className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer transition text-xs ${
                            isDone 
                              ? "bg-emerald-950/30 text-slate-400 line-through border border-emerald-800/30" 
                              : "bg-slate-950/60 text-slate-300 hover:bg-slate-950 border border-slate-800/80"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}}
                            className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                          />
                          <span>{m}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommended Capstone Project */}
                  {phase.recommendedProject && (
                    <div className="mt-3 bg-gradient-to-r from-indigo-950/30 to-slate-950 p-3.5 rounded-xl border border-indigo-500/20 space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-300">
                        <Code2 className="w-4 h-4 text-indigo-400" />
                        <span>Portfolio Project: {phase.recommendedProject.title}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {phase.recommendedProject.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {phase.recommendedProject.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Certifications & Interview Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Target Industry Certifications</span>
              </div>
              <ul className="space-y-1.5">
                {result.recommendedCertifications.map((cert, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-indigo-400 font-bold">#</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                <Briefcase className="w-4 h-4 text-violet-400" />
                <span>Bar Raiser Interview Topics</span>
              </div>
              <ul className="space-y-1.5">
                {result.interviewFocusAreas.map((topic, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                    <span className="text-violet-400">•</span>
                    <span>{topic}</span>
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
