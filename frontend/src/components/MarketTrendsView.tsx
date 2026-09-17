import React from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Building2, 
  Sparkles,
  Clock,
  BarChart3,
  ShieldCheck
} from "lucide-react";

export const MarketTrendsView: React.FC = () => {
  const plannedMetrics = [
    {
      title: "Verified Compensation Benchmarks",
      icon: DollarSign,
      description: "Aggregated, real-world base salary, equity, and bonus distributions (25th, 50th, 75th percentiles) derived from verified labor data.",
    },
    {
      title: "Hiring Demand Velocity",
      icon: TrendingUp,
      description: "Quarterly and annual hiring volume indicators tracking active open requisitions across startup, mid-market, and enterprise tiers.",
    },
    {
      title: "Market-Indexed Skill Requirements",
      icon: Briefcase,
      description: "Automated extraction of high-frequency technical proficiencies and tooling requirements directly from job specifications.",
    },
    {
      title: "Employer Hiring Footprints",
      icon: Building2,
      description: "Analysis of top hiring companies, remote versus on-site flexibility patterns, and regional tech cluster demand.",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Labor Market Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Industry Salary & Demand Trends
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real compensation benchmarks, hiring velocity, and in-demand tech stacks across top product companies.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Coming Next</span>
        </div>
      </div>

      {/* Honest Coming Next Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Labor Telemetry Integration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Verified Market Insights Coming Soon
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          To ensure strict data integrity, CareerX does not display estimated or fabricated salary statistics. Live compensation distributions and hiring demand will be powered by verified labor market endpoints in an upcoming release.
        </p>
        <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Only verified, backend-backed labor data will be displayed</span>
        </div>
      </div>

      {/* Planned Feature Architecture Overview */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Architecture Foundation
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plannedMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2 shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 text-indigo-600">
                  <Icon className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
