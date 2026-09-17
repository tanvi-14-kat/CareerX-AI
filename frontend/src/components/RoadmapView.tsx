import React from "react";
import { 
  BarChart3, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  Layers,
  Award
} from "lucide-react";

interface RoadmapViewProps {
  targetRole?: string;
  onExploreSkillGap?: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  targetRole = "AI / ML Solutions Engineer",
  onExploreSkillGap,
}) => {
  const phases = [
    {
      stage: "STAGE 01",
      title: "FOUNDATIONS & CORE PRINCIPLES",
      timeframe: "Month 1 (Weeks 1 - 4)",
      focus: "Master foundational programming paradigms, data structures, and algorithmic problem-solving.",
      milestones: [
        "Deepen Python & TypeScript object-oriented and functional paradigms.",
        "Implement memory-efficient data structures and asynchronous I/O.",
        "Version control best practices, branch workflows, and atomic commits.",
      ],
      project: "Command-line Workflow Automator & Data Scraper",
    },
    {
      stage: "STAGE 02",
      title: "CORE ENGINEERING & TOOLING",
      timeframe: "Month 2 (Weeks 5 - 8)",
      focus: "Learn specialized domain frameworks, API communication standards, and database design.",
      milestones: [
        "Build type-safe REST and RPC microservices.",
        "Relational schema modeling, index optimization, and transaction handling.",
        "Integrate modern LLM SDKs and structured JSON output validation.",
      ],
      project: "Knowledge Retrieval API with Vector Embeddings",
    },
    {
      stage: "STAGE 03",
      title: "ADVANCED ARCHITECTURE & SYSTEMS",
      timeframe: "Month 3 (Weeks 9 - 12)",
      focus: "Distributed systems, concurrency, caching, and production cloud infrastructure.",
      milestones: [
        "Containerization with Docker and multi-stage build optimization.",
        "Rate-limiting, authentication tokens, and security guardrails.",
        "Set up automated CI/CD deployment pipelines on Cloud Run or Kubernetes.",
      ],
      project: "Production AI Workflow Orchestrator with Telemetry",
    },
    {
      stage: "STAGE 04",
      title: "PORTFOLIO & INTERVIEW READINESS",
      timeframe: "Month 4 (Weeks 13 - 16)",
      focus: "Polish public GitHub repositories, architecture diagrams, and system design communication.",
      milestones: [
        "Author technical READMEs with performance benchmarks and live demo URLs.",
        "Practice Bar Raiser system design interview questions.",
        "Conduct mock behavioral interviews using the STAR method.",
      ],
      project: "Complete Career Portfolio Showcase & Live Applet",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Curriculum & Milestone Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            A structured, progressive pathway to guide you from foundational knowledge to production engineering.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            Coming Next
          </span>
          <div className="bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-700">
            Target: {targetRole}
          </div>
        </div>
      </div>

      {/* Honest Prototype Notice */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Curriculum Preview (Coming Next):</strong> Below is the representative milestone roadmap blueprint for {targetRole}. Dynamic, week-by-week progress synchronization will be enabled when connected to the backend learning engine.
          </span>
        </div>
      </div>

      {/* Vertical Career Journey */}
      <div className="space-y-6">
        {phases.map((p, idx) => (
          <div
            key={p.stage}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center font-display">
                  {idx + 1}
                </span>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {p.stage}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {p.title}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                {p.timeframe}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {p.focus}
            </p>

            {/* Milestones & Recommended Project */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-7 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Key Learning Milestones
                </span>
                <div className="space-y-1.5">
                  {p.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Capstone Portfolio Project
                </span>
                <div className="text-xs font-bold text-slate-900 font-display">
                  {p.project}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Proves hands-on mastery for resume and portfolio demonstrations to prospective recruiters.
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {onExploreSkillGap && (
        <div className="text-center pt-4">
          <button
            onClick={onExploreSkillGap}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
          >
            <span>Review Verified Skill Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
