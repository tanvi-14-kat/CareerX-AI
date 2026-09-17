import React from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Layers, 
  TrendingUp, 
  Clock, 
  Sparkles,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { CareerRecommendationResponse } from "../types";

interface DashboardMyCareerProps {
  careerData: CareerRecommendationResponse | null;
  onTakeAssessment: () => void;
  onExploreSkillGap: () => void;
  onViewRoadmap: () => void;
  onOpenMarketTrends: () => void;
  onOpenMentor: () => void;
}

export const DashboardMyCareer: React.FC<DashboardMyCareerProps> = ({
  careerData,
  onTakeAssessment,
  onExploreSkillGap,
  onViewRoadmap,
  onOpenMarketTrends,
  onOpenMentor,
}) => {
  if (!careerData) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
          <Target className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Your career journey starts here.
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Complete the 5-minute career assessment to discover your highest-yield career matches, 
            understand your skill gaps, and track your milestone progress.
          </p>
        </div>
        <div>
          <button
            onClick={onTakeAssessment}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 active:scale-95 transition cursor-pointer"
          >
            <span>Take the Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const { primaryRecommendation } = careerData;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Student Career Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight mt-0.5">
            Your Career Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Current trajectory, verified competency coverage, and recommended milestones.
          </p>
        </div>

        <button
          onClick={onTakeAssessment}
          className="self-start sm:self-auto text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
        >
          Retake Assessment
        </button>
      </div>

      {/* Primary Snapshot Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              Primary Trajectory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              {primaryRecommendation.career}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {primaryRecommendation.tagline}
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Match Score</span>
              <div className="text-2xl font-black text-indigo-600 font-display">
                {primaryRecommendation.matchScore}%
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400">Next Action</span>
              <div className="text-xs font-bold text-slate-800 font-display max-w-[140px] truncate">
                {primaryRecommendation.skillsToDevelop[0] ? `Learn ${primaryRecommendation.skillsToDevelop[0]}` : "Continue Roadmap"}
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Steps through Journey */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Career Journey Progress</span>
            <span className="text-indigo-600">3 of 6 Milestones Active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
            {[
              { name: "Assessment", status: "completed", action: onTakeAssessment },
              { name: "Career Match", status: "completed", action: () => {} },
              { name: "Skill Gap", status: "active", action: onExploreSkillGap },
              { name: "Roadmap", status: "available", action: onViewRoadmap },
              { name: "Market Trends", status: "preview", action: onOpenMarketTrends },
              { name: "AI Mentor", status: "preview", action: onOpenMentor },
            ].map((milestone, idx) => {
              const isDone = milestone.status === "completed";
              const isActive = milestone.status === "active";
              return (
                <button
                  key={milestone.name}
                  onClick={milestone.action}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    isDone
                      ? "bg-emerald-50/50 border-emerald-200/80 text-emerald-950"
                      : isActive
                      ? "bg-indigo-50/60 border-indigo-200 text-indigo-950 shadow-xs"
                      : "bg-slate-50/50 border-slate-200/70 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span>0{idx + 1}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="text-xs font-bold font-display mt-1">
                    {milestone.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Actionable Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 1: Skill Gap Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Skill Analysis
              </span>
              <span className="text-xs text-slate-400">Target: {primaryRecommendation.career}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Skill Coverage & Missing Tools
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify your current strengths against industry benchmarks and review what skills will yield 
              the biggest hiring boost.
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">Immediate focus:</span>
              <div className="flex flex-wrap gap-1.5">
                {primaryRecommendation.skillsToDevelop.slice(0, 3).map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100">
                    ○ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onExploreSkillGap}
              className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer shadow-xs"
            >
              <span>Explore Full Skill Gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Module 2: Learning Roadmap Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
                Action Plan
              </span>
              <span className="text-xs text-slate-400">Structured Path</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Milestone Learning Roadmap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Progress through foundations, core architectural patterns, and end-to-end portfolio projects.
            </p>

            <div className="space-y-2 pt-1">
              {primaryRecommendation.recommendedNextSteps.slice(0, 2).map((s) => (
                <div key={s.step} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-indigo-600 shrink-0">0{s.step}.</span>
                  <span className="leading-snug">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onViewRoadmap}
              className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition cursor-pointer"
            >
              <span>View Full Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
