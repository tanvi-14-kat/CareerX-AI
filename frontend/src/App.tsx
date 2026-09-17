import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { AssessmentModal } from "./components/AssessmentModal";
import { CareerResultsView } from "./components/CareerResultsView";
import { DashboardMyCareer } from "./components/DashboardMyCareer";
import { SkillGapView } from "./components/SkillGapView";
import { RoadmapView } from "./components/RoadmapView";
import { MarketTrendsView } from "./components/MarketTrendsView";
import { MentorView } from "./components/MentorView";

import { 
  ActiveTab, 
  StudentProfile, 
  CareerRecommendationResponse 
} from "./types";
import { careerApi } from "./services/careerService";
import { AlertCircle, RefreshCw } from "lucide-react";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("discover");
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Student Profile & Career Recommendations
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [careerResults, setCareerResults] = useState<CareerRecommendationResponse | null>(null);

  // Skill gap target context
  const [activeSkillGapTarget, setActiveSkillGapTarget] = useState<string>("AI/ML Engineer");
  const [activeCurrentSkills, setActiveCurrentSkills] = useState<string[]>([
    "Python",
    "JavaScript",
    "SQL",
    "Git",
  ]);

  // Load any previously completed session from localStorage if available
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("careerx_profile");
      const savedResults = localStorage.getItem("careerx_results");
      if (savedProfile) {
        setStudentProfile(JSON.parse(savedProfile));
      }
      if (savedResults) {
        setCareerResults(JSON.parse(savedResults));
      }
    } catch {
      // Ignore parse errors on storage
    }
  }, []);

  // Handle Assessment Completion
  const handleAssessmentComplete = async (profile: StudentProfile) => {
    setIsAssessmentOpen(false);
    setIsAnalyzing(true);
    setApiError(null);
    setStudentProfile(profile);

    try {
      localStorage.setItem("careerx_profile", JSON.stringify(profile));
    } catch {}

    try {
      const results = await careerApi.recommendCareer(profile);
      setCareerResults(results);
      try {
        localStorage.setItem("careerx_results", JSON.stringify(results));
      } catch {}

      // Default next skill gap target to the top recommended career
      if (results?.primaryRecommendation?.career) {
        setActiveSkillGapTarget(results.primaryRecommendation.career);
      }
      if (results?.primaryRecommendation?.matchedSkills) {
        setActiveCurrentSkills(results.primaryRecommendation.matchedSkills);
      }

      // Navigate immediately to the personalized results view
      setActiveTab("results");
    } catch (err: any) {
      console.error("Assessment Error:", err);
      setApiError(err.message || "We couldn't generate your recommendations right now.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExploreSkillGap = (careerTitle: string, skills: string[]) => {
    setActiveSkillGapTarget(careerTitle);
    setActiveCurrentSkills(skills);
    setActiveTab("skill-gap");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 flex flex-col antialiased">
      
      {/* Primary Global Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAssessmentResults={!!careerResults}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Loading Overlay when generating AI career recommendations */}
        {isAnalyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-2xl max-w-md w-full text-center space-y-4">
              <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Analyzing Your Career Trajectory...
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluating your education, capabilities, and goals against industry benchmarks to synthesize your personalized recommendation.
              </p>
            </div>
          </div>
        )}

        {/* Global Error Banner with Try Again & Go Back */}
        {apiError && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-3 shadow-2xs max-w-2xl mx-auto">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-950 font-display">
                We couldn't connect to the CareerX career engine.
              </h4>
              <p className="text-xs text-red-700 mt-1 max-w-lg mx-auto leading-relaxed">
                {apiError}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => {
                  setApiError(null);
                  if (studentProfile) {
                    handleAssessmentComplete(studentProfile);
                  } else {
                    setIsAssessmentOpen(true);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition cursor-pointer shadow-xs"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setApiError(null);
                  setActiveTab("discover");
                }}
                className="px-4 py-2 rounded-xl bg-white border border-red-200 text-red-800 text-xs font-semibold hover:bg-red-50 transition cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* 1. DISCOVER / LANDING PAGE */}
        {activeTab === "discover" && (
          <LandingPage
            onStartAssessment={() => setIsAssessmentOpen(true)}
            onExploreCareers={() => {
              if (careerResults) {
                setActiveTab("results");
              } else {
                setActiveTab("market");
              }
            }}
          />
        )}

        {/* 2. CAREER RESULTS VIEW */}
        {activeTab === "results" && careerResults && (
          <CareerResultsView
            data={careerResults}
            onExploreSkillGap={handleExploreSkillGap}
            onViewRoadmap={() => setActiveTab("roadmap")}
            onRetakeAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {/* Fallback to Discover if no results yet */}
        {activeTab === "results" && !careerResults && (
          <div className="text-center py-16 space-y-4 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-800 font-display">
              No assessment taken yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Please take the guided assessment first to compute your personalized career matches.
            </p>
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm cursor-pointer hover:bg-indigo-700"
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* 3. MY CAREER PORTAL */}
        {activeTab === "my-career" && (
          <DashboardMyCareer
            careerData={careerResults}
            onTakeAssessment={() => setIsAssessmentOpen(true)}
            onExploreSkillGap={() => {
              if (careerResults?.primaryRecommendation) {
                setActiveSkillGapTarget(careerResults.primaryRecommendation.career);
                setActiveCurrentSkills(careerResults.primaryRecommendation.matchedSkills);
              }
              setActiveTab("skill-gap");
            }}
            onViewRoadmap={() => setActiveTab("roadmap")}
            onOpenMarketTrends={() => setActiveTab("market")}
            onOpenMentor={() => setActiveTab("mentor")}
          />
        )}

        {/* 4. SKILL GAP INTELLIGENCE */}
        {activeTab === "skill-gap" && (
          <SkillGapView
            initialCareer={activeSkillGapTarget}
            initialSkills={activeCurrentSkills}
            onNavigateToRoadmap={() => setActiveTab("roadmap")}
          />
        )}

        {/* 5. LEARNING ROADMAP (Coming Next preview) */}
        {activeTab === "roadmap" && (
  <RoadmapView
    careerData={careerResults}
    studentProfile={studentProfile}
    targetRole={activeSkillGapTarget}
    onExploreSkillGap={() => setActiveTab("skill-gap")}
  />
)}

        {/* 6. MARKET DEMAND & SALARY TRENDS (Coming Next) */}
        {activeTab === "market" && <MarketTrendsView />}

        {/* 7. INTERACTIVE AI MENTOR (Coming Next) */}
        {activeTab === "mentor" && <MentorView />}

      </main>

      {/* Assessment Modal */}
      {isAssessmentOpen && (
        <AssessmentModal
          initialProfile={studentProfile || undefined}
          onComplete={handleAssessmentComplete}
          onCancel={() => setIsAssessmentOpen(false)}
        />
      )}

      {/* Modern Light Premium Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-[10px] font-display">
              CX
            </div>
            <span className="font-bold text-slate-800 font-display">CareerX AI</span>
            <span>•</span>
            <span>Human-Centered Career Guidance Platform for Students</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Discover → Understand → Improve → Progress</span>
            <span>•</span>
            <span className="text-indigo-600 font-medium">FastAPI Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
