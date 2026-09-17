import React from "react";
import { 
  Compass, 
  Sparkles, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  Bot, 
  FileText, 
  ChevronRight,
  UserCheck
} from "lucide-react";
import { ActiveTab } from "../types";

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasAssessmentResults: boolean;
  onOpenAssessment: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  hasAssessmentResults,
  onOpenAssessment,
}) => {
  const navItems: { 
    id: ActiveTab; 
    label: string; 
    icon: React.FC<{ className?: string }>;
    comingNext?: boolean;
  }[] = [
    { id: "discover", label: "Discover", icon: Compass },
    { id: "my-career", label: "My Career", icon: UserCheck },
    { id: "skill-gap", label: "Skill Gap", icon: Layers },
    { id: "roadmap", label: "Roadmap", icon: BarChart3, comingNext: true },
    { id: "market", label: "Market Trends", icon: TrendingUp, comingNext: true },
    { id: "mentor", label: "AI Mentor", icon: Bot, comingNext: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <button
            onClick={() => setActiveTab("discover")}
            className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
            aria-label="CareerX AI Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-base tracking-tighter font-display">CX</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-bold text-slate-900 tracking-tight font-display flex items-center space-x-1.5">
                <span>CareerX</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium -mt-0.5">
                Career Guidance Platform
              </span>
            </div>
          </button>

          {/* Center: Global Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-50/80 p-1 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-xs shadow-slate-200/80 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.comingNext && (
                    <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-slate-200/70 text-slate-600">
                      Coming Next
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Assessment CTA */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenAssessment}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>{hasAssessmentResults ? "Retake Assessment" : "Take Assessment"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden flex items-center space-x-1 overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-100 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition ${
                isActive
                  ? "bg-indigo-600 text-white font-medium shadow-xs"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
              {item.comingNext && (
                <span className="text-[8px] font-normal px-1 rounded-full bg-slate-200/80 text-slate-700">
                  Next
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
