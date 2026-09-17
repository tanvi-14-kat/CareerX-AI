import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Layers, 
  Target, 
  ChevronRight,
  BookOpen,
  DollarSign
} from "lucide-react";
import { CareerRecommendationResponse } from "../types";

interface CareerResultsViewProps {
  data: CareerRecommendationResponse;
  onExploreSkillGap: (careerTitle: string, currentSkills: string[]) => void;
  onViewRoadmap: () => void;
  onRetakeAssessment: () => void;
}

export const CareerResultsView: React.FC<CareerResultsViewProps> = ({
  data,
  onExploreSkillGap,
  onViewRoadmap,
  onRetakeAssessment,
}) => {
  const { primaryRecommendation, alternativeCareers, studentSummary } = data;
  const alignment = primaryRecommendation.strengthsAlignment;

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Intelligence Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Your Career Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            We analyzed your skills, interests, education, and ambitions to formulate your highest-growth trajectory.
          </p>
        </div>

        <button
          onClick={onRetakeAssessment}
          className="self-start sm:self-auto text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200/90 hover:bg-slate-50 px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
        >
          Retake Assessment
        </button>
      </div>

      {/* PRIMARY RECOMMENDATION CARD (The "WOW" Screen) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-200/50 relative overflow-hidden space-y-8">
        
        {/* Top Highlight Badge & Title Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Highest Overall Alignment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              {primaryRecommendation.career}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {primaryRecommendation.tagline}
            </p>
          </div>

          {/* Match Score Circular / Ring Representation */}
          <div className="flex items-center space-x-4 bg-gradient-to-br from-indigo-50/80 to-violet-50/50 p-4 sm:p-5 rounded-2xl border border-indigo-100 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-indigo-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600"
                  strokeDasharray={`${primaryRecommendation.matchScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-indigo-900 font-display leading-none">
                  {primaryRecommendation.matchScore}%
                </span>
                <span className="text-[9px] font-bold uppercase text-indigo-600 tracking-tighter mt-0.5">
                  Match
                </span>
              </div>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold text-slate-900 font-display">
                Career Fit Index
              </div>
              <div className="text-[11px] text-slate-500 max-w-[130px] leading-tight mt-0.5">
                Calculated across technical aptitude & market trends
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown of Strengths Alignment (Skills, Interests, Goal, Education) */}
        {alignment && (
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 space-y-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Match Factor Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Skills Alignment</div>
                <div className="text-lg font-bold text-slate-900 font-display mt-0.5">
                  {alignment.skillsContribution}%
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${alignment.skillsContribution}%` }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Interests Synergy</div>
                <div className="text-lg font-bold text-slate-900 font-display mt-0.5">
                  {alignment.interestsContribution}%
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-violet-600 h-full rounded-full" style={{ width: `${alignment.interestsContribution}%` }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Goal Concordance</div>
                <div className="text-lg font-bold text-slate-900 font-display mt-0.5">
                  {alignment.goalContribution}%
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${alignment.goalContribution}%` }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="text-[11px] text-slate-500 font-medium">Education Foundation</div>
                <div className="text-lg font-bold text-slate-900 font-display mt-0.5">
                  {alignment.educationContribution}%
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${alignment.educationContribution}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why this career? (Plain English explanation) */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
            Why this career fits you
          </h3>
          <div className="bg-indigo-50/40 border border-indigo-100/90 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed">
            {primaryRecommendation.explanation}
          </div>
        </div>

        {/* Skills Comparison: Strengths vs Skills to Develop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Your Strengths */}
          <div className="space-y-3 bg-emerald-50/30 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Your Strengths (Matched Skills)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {primaryRecommendation.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-semibold text-emerald-900 shadow-2xs"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-emerald-700/80">
              Direct competencies already reflected in your profile that provide a baseline competitive advantage.
            </p>
          </div>

          {/* Skills to Develop (Growth Opportunities) */}
          <div className="space-y-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-5">
            <div className="flex items-center space-x-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Next Opportunities for Growth</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {primaryRecommendation.skillsToDevelop.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  ○ {skill}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              High-leverage skills to target in your upcoming study phases to achieve full hiring readiness.
            </p>
          </div>

        </div>

        {/* Recommended Next Steps */}
        {primaryRecommendation.recommendedNextSteps && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
              Recommended Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {primaryRecommendation.recommendedNextSteps.map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>STEP 0{stepItem.step}</span>
                    {stepItem.timeframe && (
                      <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-500">
                        {stepItem.timeframe}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 font-display">
                    {stepItem.title}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {stepItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Ready to close the gap? Explore your granular skill analysis or structured roadmap.
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onExploreSkillGap(primaryRecommendation.career, primaryRecommendation.matchedSkills)}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
            >
              <span>Analyze Skill Gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onViewRoadmap}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition cursor-pointer"
            >
              <span>View Learning Roadmap</span>
            </button>
          </div>
        </div>

      </div>

      {/* ALTERNATIVE CAREERS SECTION */}
      {alternativeCareers && alternativeCareers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Other paths worth exploring
              </h3>
              <p className="text-xs text-slate-500">
                Alternative trajectories where your current baseline can be leveraged with minimal pivot friction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternativeCareers.map((alt) => (
              <div
                key={alt.career}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600">Alternative Trajectory</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {alt.matchScore}% Match
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {alt.career}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alt.explanation}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {alt.matchedSkills.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                    {alt.skillsToDevelop.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        ○ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onExploreSkillGap(alt.career, alt.matchedSkills)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Inspect Skill Gap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
