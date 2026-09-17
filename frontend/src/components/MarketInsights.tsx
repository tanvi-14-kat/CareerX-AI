import React, { useState } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Globe2, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart2
} from "lucide-react";

interface RoleMarketData {
  title: string;
  category: string;
  medianSalary: string;
  p25: string;
  p75: string;
  p90: string;
  demandGrowth: string;
  remotePct: string;
  topSkills: string[];
  growthDescription: string;
}

const MARKET_ROLES: RoleMarketData[] = [
  {
    title: "Senior AI Solutions Engineer",
    category: "Generative AI & LLMs",
    medianSalary: "$185,000",
    p25: "$155,000",
    p75: "$225,000",
    p90: "$270,000",
    demandGrowth: "+68% YoY",
    remotePct: "64% Remote",
    topSkills: ["Google GenAI SDK", "LangChain", "Vector DBs (Pinecone/Chroma)", "Python", "TypeScript", "RAG Systems"],
    growthDescription: "Massive corporate demand for engineers capable of converting prototype LLMs into resilient, low-latency enterprise software.",
  },
  {
    title: "Applied Machine Learning Scientist",
    category: "Data Science & Deep Learning",
    medianSalary: "$195,000",
    p25: "$165,000",
    p75: "$240,000",
    p90: "$310,000",
    demandGrowth: "+42% YoY",
    remotePct: "52% Remote",
    topSkills: ["PyTorch", "Transformers", "Distributed Training", "CUDA", "MLflow", "Statistical Inference"],
    growthDescription: "Continued investment in fine-tuning, domain-specific foundation models, and multi-modal alignment architectures.",
  },
  {
    title: "Staff Full-Stack Cloud Architect",
    category: "Software & Distributed Systems",
    medianSalary: "$175,000",
    p25: "$145,000",
    p75: "$210,000",
    p90: "$260,000",
    demandGrowth: "+24% YoY",
    remotePct: "71% Remote",
    topSkills: ["TypeScript", "React/Next.js", "Docker", "Kubernetes", "GCP/AWS", "PostgreSQL"],
    growthDescription: "Evergreen demand for high-ownership architects who bridge modern frontend velocity with rock-solid cloud microservices.",
  },
  {
    title: "Lead AI Product Manager",
    category: "Product & Strategy",
    medianSalary: "$180,000",
    p25: "$150,000",
    p75: "$220,000",
    p90: "$265,000",
    demandGrowth: "+55% YoY",
    remotePct: "58% Remote",
    topSkills: ["LLM UX Patterns", "Token Economics", "AI Safety & Guardrails", "Data Strategy", "A/B Testing"],
    growthDescription: "Critical organizational necessity to identify real enterprise AI ROI versus novelty features.",
  },
  {
    title: "MLOps & AI Infrastructure Engineer",
    category: "Infrastructure & DevOps",
    medianSalary: "$178,000",
    p25: "$148,000",
    p75: "$215,000",
    p90: "$255,000",
    demandGrowth: "+61% YoY",
    remotePct: "66% Remote",
    topSkills: ["Kubernetes", "Ray", "Triton Inference Server", "Terraform", "Model Quantization", "Prometheus"],
    growthDescription: "Severe talent scarcity in serving high-throughput inference endpoints with cost-efficient GPU utilization.",
  },
];

export const MarketInsights: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState(MARKET_ROLES[0]);
  const [currentSalary, setCurrentSalary] = useState(115000);

  const targetMedian = parseInt(selectedRole.medianSalary.replace(/[$,]/g, ""), 10);
  const salaryUpside = Math.max(0, targetMedian - currentSalary);
  const pctIncrease = Math.round((salaryUpside / currentSalary) * 100);

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Talent Economics & Compensation Intelligence</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
          Tech Job Market & Salary Benchmarks
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Explore compensation percentiles, hiring velocity, and skill premiums across the most in-demand AI and engineering disciplines.
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {MARKET_ROLES.map((r) => {
          const isSelected = selectedRole.title === r.title;
          return (
            <button
              key={r.title}
              onClick={() => setSelectedRole(r)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {r.title}
            </button>
          );
        })}
      </div>

      {/* Role Profile & Compensation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Role Details & Salary Percentiles */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                  {selectedRole.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
                  {selectedRole.title}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                  {selectedRole.demandGrowth}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 rounded-lg">
                  {selectedRole.remotePct}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRole.growthDescription}
            </p>

            {/* Compensation Percentiles Bar */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>US Market Compensation Percentiles (Base + Bonus)</span>
                <span className="text-emerald-400 font-bold">Median: {selectedRole.medianSalary}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">25th Percentile</span>
                  <div className="text-base font-bold text-slate-300 mt-1">{selectedRole.p25}</div>
                  <span className="text-[10px] text-slate-500">Early-stage / Regional</span>
                </div>

                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-indigo-300 font-semibold uppercase">50th (Median)</span>
                  <div className="text-base font-bold text-indigo-200 mt-1">{selectedRole.medianSalary}</div>
                  <span className="text-[10px] text-indigo-300/70">National Standard</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">75th Percentile</span>
                  <div className="text-base font-bold text-emerald-400 mt-1">{selectedRole.p75}</div>
                  <span className="text-[10px] text-slate-500">Tier 1 Remote / Tech Hub</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">90th (Top Tier)</span>
                  <div className="text-base font-bold text-violet-400 mt-1">{selectedRole.p90}</div>
                  <span className="text-[10px] text-slate-500">Big Tech / AI Labs</span>
                </div>
              </div>
            </div>

            {/* In-Demand Skill Premiums */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Top Hiring Skill Requirements
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRole.topSkills.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Career Transition ROI Estimator */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Upskilling ROI Calculator</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Annual Compensation ($ USD)
            </label>
            <input
              type="number"
              step="5000"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="text-xs text-slate-400">Target Role:</div>
            <div className="text-xs font-bold text-slate-200">{selectedRole.title}</div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Estimated Upside</div>
              <div className="text-2xl font-bold text-emerald-400 font-display mt-0.5">
                +${salaryUpside.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal ml-1">/yr (+{pctIncrease}%)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              Based on completing our structured 3-month skill roadmap and passing the Bar Raiser mock interview loop.
            </p>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Grounded in Q1 2026 tech hiring indices</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Highest premiums for GenAI SDK & RAG systems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
