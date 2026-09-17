
import React from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
} from "lucide-react";
import { CareerRecommendationResponse, StudentProfile } from "../types";

interface RoadmapViewProps {
  careerData?: CareerRecommendationResponse | null;
  studentProfile?: StudentProfile | null;
  targetRole?: string;
  onExploreSkillGap?: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  careerData,
  studentProfile,
  targetRole,
  onExploreSkillGap,
}) => {
  const recommendation = careerData?.primaryRecommendation;

  const role = recommendation?.career || targetRole || "Your Target Career";
  const matchScore = recommendation?.matchScore ?? 0;
  const matchedSkills = recommendation?.matchedSkills ?? [];
  const skillsToDevelop = recommendation?.skillsToDevelop ?? [];
  const nextSteps = recommendation?.recommendedNextSteps ?? [];

  const hasPersonalizedData = Boolean(careerData && recommendation);

  if (!hasPersonalizedData) {
    return (
      <div className="space-y-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Personalized Learning Path</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Learning Roadmap
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Your roadmap is generated from your CareerX assessment results.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Build your personalized roadmap
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto mt-3 leading-relaxed">
            Complete your CareerX assessment to generate a learning path based
            on your skills, interests, goals, and recommended career.
          </p>

          <button
            onClick={onExploreSkillGap}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
          >
            Explore Skill Gap
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const foundationSkills = matchedSkills.slice(0, 6);
  const developmentSkills = skillsToDevelop.slice(0, 8);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Personalized Learning Path</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Learning Roadmap
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            A learning sequence built from your CareerX career recommendation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-700">
            Target: {role}
          </div>
        </div>
      </div>

      {/* Personalized overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Target Career
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                {role}
              </h2>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {recommendation?.explanation || "Your roadmap is based on your assessment results and current skill profile."}
              </p>
            </div>

            <div className="shrink-0 text-center">
              <div className="text-2xl font-extrabold text-indigo-600">
                {Math.round(matchScore)}%
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase">
                Match
              </div>
            </div>
          </div>

          {studentProfile && (
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600">
                {studentProfile.education}
              </span>

              <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600">
                {studentProfile.study_hours} hrs/week
              </span>

              {studentProfile.goal && (
                <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600">
                  Goal: {studentProfile.goal}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">
              Your Starting Point
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Foundation
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {matchedSkills.length} matched skill
                {matchedSkills.length === 1 ? "" : "s"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Development Areas
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1">
                {skillsToDevelop.length} skill
                {skillsToDevelop.length === 1 ? "" : "s"} to develop
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Foundation */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>

          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Your Foundation
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mt-1">
              Skills you already bring
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              These skills were identified in your career recommendation as
              relevant to the target role.
            </p>
          </div>
        </div>

        {foundationSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-6">
            {foundationSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-500">
            Your assessment did not identify matched skills yet.
          </p>
        )}
      </section>

      {/* Skill gap */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Circle className="w-4 h-4" />
          </div>

          <div>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
              Skill Gap → Learning Sequence
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mt-1">
              What to learn next
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your development areas are ordered from the career recommendation
              data instead of using a generic curriculum.
            </p>
          </div>
        </div>

        {developmentSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {developmentSkills.map((skill, index) => (
              <div
                key={skill}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-indigo-600 shrink-0">
                  {index + 1}
                </div>

                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-800">
              No additional development skills were returned for this
              recommendation.
            </p>
          </div>
        )}
      </section>

      {/* Recommended sequence */}
      <section>
        <div className="mb-5">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            Recommended Sequence
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
            Your next learning steps
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow the recommendation engine's next-step guidance.
          </p>
        </div>

        <div className="space-y-4">
          {nextSteps.length > 0 ? (
            nextSteps.map((step, index) => (
              <div
                key={`${step.step}-${step.title}`}
                className="relative bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
              >
                {index < nextSteps.length - 1 && (
                  <div className="hidden sm:block absolute left-[29px] top-[58px] bottom-[-17px] w-px bg-slate-200" />
                )}

                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 relative z-10">
                    {step.step}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h3>

                      {step.timeframe && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500 self-start">
                          <Clock className="w-3 h-3" />
                          {step.timeframe}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-sm text-slate-500">
              No additional learning steps were returned by the recommendation
              engine yet.
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      {onExploreSkillGap && (
        <div className="flex justify-center pt-2">
          <button
            onClick={onExploreSkillGap}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition cursor-pointer"
          >
            Review Skill Gap
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
