import { 
  StudentProfile, 
  CareerRecommendationResponse, 
  SkillGapAnalyzeResponse,
  PrimaryCareerRecommendation,
  AlternativeCareer,
  NextStep,
  LearningPriority
} from "../types";

// Base API configuration (configurable via VITE_API_BASE_URL)
const rawBaseUrl = ((import.meta as any).env?.VITE_API_BASE_URL as string) || "";
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

/**
 * Backend raw career item contract returned from POST /api/career/recommend
 */
export interface BackendCareerItem {
  career: string;
  description: string;
  match_score: number; // 0 - 100
  score?: number;      // 0.0 - 1.0 (backward compatibility)
  relevant_skills?: string[];
  matched_skills?: string[];
  missing_skills?: string[];
  matched_interests?: string[];
  reason?: string;
  why_it_matches?: string[];
  recommended_next_steps?: string[];
}

export interface BackendRecommendResponse {
  recommendations: BackendCareerItem[];
}

/**
 * Backend raw skill gap item contract returned from POST /api/skill-gap/analyze
 */
export interface BackendSkillGapResponse {
  career: string;
  required_skills: string[];
  existing_skills: string[];
  missing_skills: string[];
  skill_gap_count: number;
  recommendations: string[];
}

/**
 * Maps human-readable step strings from the backend into structured NextStep objects.
 */
function parseNextSteps(rawSteps?: string[]): NextStep[] {
  if (!rawSteps || rawSteps.length === 0) {
    return [
      {
        step: 1,
        title: "Explore Core Competencies",
        description: "Review foundational concepts and industry practices for this role.",
        timeframe: "Weeks 1-2",
      },
      {
        step: 2,
        title: "Hands-on Project Building",
        description: "Apply modern workflows and build a tangible capstone artifact.",
        timeframe: "Weeks 3-5",
      },
      {
        step: 3,
        title: "Portfolio & Interview Readiness",
        description: "Document project decisions, prepare explanations, and practice interview questions.",
        timeframe: "Weeks 6-8",
      },
    ];
  }

  return rawSteps.slice(0, 3).map((text, idx) => {
    let title = `Milestone 0${idx + 1}`;
    let description = text;

    if (text.includes(":")) {
      const parts = text.split(":");
      title = parts[0].trim();
      description = parts.slice(1).join(":").trim();
    }

    const timeframes = ["Weeks 1-2", "Weeks 3-4", "Weeks 5-6", "Weeks 7-8"];

    return {
      step: idx + 1,
      title,
      description,
      timeframe: timeframes[idx] || `Phase ${idx + 1}`,
    };
  });
}

/**
 * Adapts the real backend career recommendations payload to the frontend response contract.
 */
export function adaptCareerRecommendationResponse(
  raw: BackendRecommendResponse,
  profile: StudentProfile
): CareerRecommendationResponse {
  const list = raw?.recommendations || [];

  if (list.length === 0) {
    return {
      primaryRecommendation: {
        career: "Software Developer",
        tagline: "Explore core software engineering pathways.",
        matchScore: 0,
        explanation: "No strong match found for this profile. We suggest exploring general software engineering foundational skills.",
        matchedSkills: [],
        skillsToDevelop: ["Python", "JavaScript", "Git", "SQL"],
        recommendedNextSteps: parseNextSteps([]),
      },
      alternativeCareers: [],
      studentSummary: profile.education 
        ? `Student with ${profile.education} background exploring technology careers.`
        : "Student exploring technology career paths.",
    };
  }

  const primaryRaw = list[0];
  const primaryMatchScore = Math.round(primaryRaw.match_score ?? (primaryRaw.score ? primaryRaw.score * 100 : 0));

  const primaryRecommendation: PrimaryCareerRecommendation = {
    career: primaryRaw.career,
    tagline: primaryRaw.description || `Build and grow your career as a ${primaryRaw.career}.`,
    matchScore: primaryMatchScore,
    explanation: primaryRaw.reason || (primaryRaw.why_it_matches?.[0] ?? "Recommended based on your skills and interests."),
    strengthsAlignment: {
      skillsContribution: Math.min(100, Math.round(((primaryRaw.matched_skills?.length || 0) / Math.max(1, primaryRaw.relevant_skills?.length || 5)) * 100)),
      interestsContribution: Math.min(100, Math.round(((primaryRaw.matched_interests?.length || 0) / Math.max(1, profile.interests?.length || 3)) * 100)),
      goalContribution: profile.goal ? 75 : 40,
      educationContribution: profile.education ? 85 : 50,
    },
    matchedSkills: primaryRaw.matched_skills || [],
    skillsToDevelop: primaryRaw.missing_skills || [],
    recommendedNextSteps: parseNextSteps(primaryRaw.recommended_next_steps),
  };

  const alternativeCareers: AlternativeCareer[] = list.slice(1, 5).map((alt) => {
    const altScore = Math.round(alt.match_score ?? (alt.score ? alt.score * 100 : 0));
    return {
      career: alt.career,
      tagline: alt.description || `Alternative opportunity in ${alt.career}.`,
      matchScore: altScore,
      explanation: alt.reason || (alt.why_it_matches?.[0] ?? "Aligned with your complementary technical capabilities."),
      matchedSkills: alt.matched_skills || [],
      skillsToDevelop: alt.missing_skills || [],
    };
  });

  const skillSummary = profile.skills.length > 0 
    ? `demonstrating proficiency in ${profile.skills.slice(0, 3).join(", ")}`
    : "building technical foundations";
  const goalSummary = profile.goal ? `aiming to ${profile.goal.toLowerCase()}` : "exploring high-growth roles";
  const studentSummary = `${profile.education || "Student"} ${skillSummary}, ${goalSummary}.`;

  return {
    primaryRecommendation,
    alternativeCareers,
    studentSummary,
  };
}

/**
 * Adapts the real backend skill gap response payload to the frontend response contract.
 */
export function adaptSkillGapResponse(raw: BackendSkillGapResponse): SkillGapAnalyzeResponse {
  const currentSkills = raw.existing_skills || [];
  const skillsToDevelop = raw.missing_skills || [];
  const totalTarget = (raw.required_skills || []).length || (currentSkills.length + skillsToDevelop.length) || 1;
  const coveredCount = currentSkills.length;
  const coveragePercentage = Math.round((coveredCount / totalTarget) * 100);

  const learningPriorities: LearningPriority[] = skillsToDevelop.map((skill, idx) => {
    let priority: "Critical" | "High" | "Recommended" | "Nice-to-Have" = "Recommended";
    if (idx === 0) priority = "Critical";
    else if (idx === 1) priority = "High";
    else if (idx > 3) priority = "Nice-to-Have";

    return {
      skill,
      priority,
      reason: `Essential competency to close the hiring gap for ${raw.career}.`,
    };
  });

  return {
    career: raw.career,
    currentSkills,
    skillsToDevelop,
    skillsCoveredCount: coveredCount,
    totalTargetSkillsCount: totalTarget,
    coveragePercentage,
    recommendations: raw.recommendations || [],
    learningPriorities,
  };
}

export const careerApi = {
  /**
   * Health check for FastAPI backend
   * Calls GET /health
   */
  async checkHealth(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`Health check returned status ${response.status}`);
      }
      return response.json();
    } catch (err: any) {
      throw new Error(err.message || "Unable to reach FastAPI backend.");
    }
  },

  /**
   * Generates personalized career recommendations based on student profile.
   * Calls POST /api/career/recommend
   */
  async recommendCareer(profile: StudentProfile): Promise<CareerRecommendationResponse> {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/api/career/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
    } catch (err: any) {
      throw new Error(
        "We couldn't connect to the CareerX career engine. Please ensure the backend is running at http://127.0.0.1:8000."
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const detail = errorData.detail || errorData.message || errorData.error;
      throw new Error(detail || `Server returned ${response.status}: Failed to generate recommendations.`);
    }

    const rawData: BackendRecommendResponse = await response.json();
    return adaptCareerRecommendationResponse(rawData, profile);
  },
};

export const skillGapApi = {
  /**
   * Analyzes skill gap for a target career and current skills.
   * Calls POST /api/skill-gap/analyze
   */
  async analyzeSkillGap(career: string, skills: string[]): Promise<SkillGapAnalyzeResponse> {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/api/skill-gap/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ career, skills }),
      });
    } catch (err: any) {
      throw new Error(
        "We couldn't connect to the CareerX career engine. Please ensure the backend is running at http://127.0.0.1:8000."
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const detail = errorData.detail || errorData.message || errorData.error;
      throw new Error(detail || `Server returned ${response.status}: Failed to analyze skill gap.`);
    }

    const rawData: BackendSkillGapResponse = await response.json();
    return adaptSkillGapResponse(rawData);
  },
};