import React from "react";
import { 
  Bot, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Compass
} from "lucide-react";

export const MentorView: React.FC = () => {
  const plannedAdvisoryTopics = [
    {
      title: "Strategic Specialization Selection",
      icon: Compass,
      description: "Personalized advice on evaluating trade-offs between AI Engineering, Full-Stack development, and specialized domains based on your coursework.",
    },
    {
      title: "Portfolio & Project Architecture",
      icon: Lightbulb,
      description: "Direct feedback on selecting high-impact capstone projects that demonstrate architectural maturity to engineering hiring managers.",
    },
    {
      title: "Interview & Bar-Raiser Preparation",
      icon: MessageSquare,
      description: "Targeted coaching on behavioral STAR narratives, live problem-solving communication, and systems design discussions.",
    },
    {
      title: "Navigating Career Transitions",
      icon: HelpCircle,
      description: "Step-by-step guidance on pivoting from general software engineering or non-technical backgrounds into specialized machine learning roles.",
    },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Bot className="w-3.5 h-3.5" />
            <span>Interactive Career Advisory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            AI Career Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time conversational guidance for portfolio reviews, interview hurdles, and skill acquisition.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Coming Next</span>
        </div>
      </div>

      {/* Honest Coming Next State */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Bot className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Conversational Guidance Foundation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Interactive AI Mentoring Coming Soon
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          To maintain strict fidelity, CareerX does not simulate fake chat interactions. The interactive AI Career Mentor will be activated once connected to the authoritative backend advisory endpoints.
        </p>
        <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time advisory will connect directly to verified CareerX endpoints</span>
        </div>
      </div>

      {/* Planned Advisory Dimensions */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Upcoming Mentorship Capabilities
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plannedAdvisoryTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2 shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 text-indigo-600">
                  <Icon className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
