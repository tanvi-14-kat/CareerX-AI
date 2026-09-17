import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Target, 
  Layers, 
  TrendingUp, 
  Bot, 
  CheckCircle2, 
  GraduationCap,
  Briefcase,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface LandingPageProps {
  onStartAssessment: () => void;
  onExploreCareers: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExploreCareers,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Powered Career Intelligence for Students</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
            Your career isn't a guess. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
              It's a path you can build.
            </span>
          </h1>

          {/* Human-Centered Body Description */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            CareerX AI analyzes your skills, interests, goals, and education to help you discover 
            meaningful career paths and understand exactly what to learn next.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Discover My Career</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreCareers}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <span>Explore Sample Paths</span>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>5-minute guided assessment</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Personalized skill-gap analysis</span>
            </span>
            <span className="hidden sm:flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Actionable learning roadmap</span>
            </span>
          </div>

        </div>

        {/* Hero Interactive Visualization Preview */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-br from-indigo-100/40 to-violet-100/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  Visual Career Match Engine
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  Dynamic Alignment Example
                </h3>
              </div>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium self-start sm:self-auto">
                Student Profile Simulation
              </span>
            </div>

            {/* Illustrative Career Alignment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6">
              {[
                { role: "AI / ML Engineer", match: "87%", label: "Top Recommendation", color: "indigo" },
                { role: "Software Developer", match: "74%", label: "Strong Core Match", color: "slate" },
                { role: "Data Scientist", match: "68%", label: "High Analytical Fit", color: "slate" },
                { role: "Product Designer", match: "61%", label: "Emerging Direction", color: "slate" },
              ].map((item, idx) => {
                const isTop = idx === 0;
                return (
                  <div
                    key={item.role}
                    className={`p-4 rounded-xl transition-all ${
                      isTop
                        ? "bg-gradient-to-b from-indigo-50/70 to-white border-2 border-indigo-200/90 shadow-sm"
                        : "bg-slate-50/60 border border-slate-200/70 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className={isTop ? "text-indigo-700" : "text-slate-500"}>
                        {item.label}
                      </span>
                      <span
                        className={`font-bold font-display text-sm ${
                          isTop ? "text-indigo-600" : "text-slate-700"
                        }`}
                      >
                        {item.match}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-900 font-display">
                      {item.role}
                    </div>
                    <div className="mt-3 w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isTop ? "bg-indigo-600" : "bg-slate-400"
                        }`}
                        style={{ width: item.match }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <span className="italic">
                * Match scores are calculated from your specific skills, coursework, and problem-solving interests.
              </span>
              <button
                onClick={onStartAssessment}
                className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center space-x-1"
              >
                <span>Calculate My Real Scores</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE STUDENT JOURNEY: From uncertainty to direction */}
      <section className="max-w-6xl mx-auto pt-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            The Student Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
            From uncertainty to direction.
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A cohesive 4-step pathway that transforms ambiguous career questions into clear, confidence-building milestones.
          </p>
        </div>

        {/* Horizontal Journey on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            {
              step: "01",
              title: "Discover",
              headline: "Tell us about yourself",
              desc: "Share your education level, technical skills, favorite problems to solve, and personal goals.",
              icon: Compass,
              accent: "indigo",
            },
            {
              step: "02",
              title: "Understand",
              headline: "Discover career matches",
              desc: "Receive algorithmic matches weighted by your genuine strengths, explaining why each path fits you.",
              icon: Target,
              accent: "violet",
            },
            {
              step: "03",
              title: "Improve",
              headline: "Unpack your skill gaps",
              desc: "See exactly which skills you've mastered and the next high-value competencies to develop.",
              icon: Layers,
              accent: "emerald",
            },
            {
              step: "04",
              title: "Progress",
              headline: "Build your path forward",
              desc: "Step through structured learning milestones, portfolio projects, and future market demand.",
              icon: TrendingUp,
              accent: "blue",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between relative hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-display">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {item.title}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {item.headline}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE CAPABILITIES (Visual Storytelling) */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Intelligent Guidance Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
            Built for how students actually grow.
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No generic job boards or robotic rejection scores. Every capability is engineered to provide clarity and encouragement.
          </p>
        </div>

        {/* Capability 1: Personalized Matching */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Personalized Career Matching</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Discover paths that align with your unique aptitude.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We look beyond keywords to analyze the intersection of your coursework, current programming languages, 
              preferred problem categories, and long-term ambition. The result is an honest breakdown of why a career matches 
              your trajectory.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Weighted across Skills, Interests, Education, and Goals</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Clear "Why This Fits You" plain-English explanations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 rounded-xl p-5 border border-slate-200/80">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">Top Recommendation</span>
                  <h4 className="text-sm font-bold text-slate-900 font-display">AI / ML Solutions Engineer</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  88% Match
                </span>
              </div>
              <p className="text-xs text-slate-600">
                "Your foundation in Python and data structures combined with interest in generative algorithms creates exceptional alignment."
              </p>
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Skills</div>
                  <div className="text-xs font-bold text-slate-800">82%</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Interests</div>
                  <div className="text-xs font-bold text-slate-800">94%</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Goal</div>
                  <div className="text-xs font-bold text-slate-800">90%</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Education</div>
                  <div className="text-xs font-bold text-slate-800">85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capability 2: Skill Gap Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="lg:col-span-6 order-2 lg:order-1 bg-slate-50 rounded-xl p-5 border border-slate-200/80">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">Skills Coverage for Target Role</span>
                <span className="text-indigo-600 font-bold">2 / 8 Covered (25%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: "25%" }} />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Your Strengths (Already Mastered)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100">
                    ✓ Python
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100">
                    ✓ TensorFlow
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Next Skills to Develop
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100">
                    ○ PyTorch
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-medium border border-amber-100">
                    ○ Deep Learning
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    ○ MLOps & Docker
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-violet-50 text-violet-700 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Skill Gap Intelligence</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              See what you have, and exactly what to learn next.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never label missing skills as failures. Instead, they are framed as your highest-yield opportunities for growth, 
              ranked by market necessity and sequence priority.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct ratio calculation (Covered vs Target skills)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Actionable sequence of what to study first</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto text-center bg-gradient-to-b from-indigo-50/70 to-white rounded-3xl border border-indigo-100 p-8 sm:p-12 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Ready to discover your career trajectory?
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Take the 5-minute guided assessment to map your current education, skills, and goals 
          to proven career trajectories.
        </p>
        <div>
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start My Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
