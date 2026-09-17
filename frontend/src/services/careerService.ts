import { 
  StudentProfile, 
  CareerRecommendationResponse, 
  SkillGapAnalyzeResponse 
} from "../types";

// Base API configuration (configurable via VITE_API_BASE_URL)
const rawBaseUrl = ((import.meta as any).env?.VITE_API_BASE_URL as string) || "";
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

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
        "We couldn't connect to the CareerX career engine. Please ensure the backend is running and reachable."
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const detail = errorData.detail || errorData.message || errorData.error;
      throw new Error(detail || `Server returned ${response.status}: Failed to generate recommendations.`);
    }

    return response.json();
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
        "We couldn't connect to the CareerX career engine. Please ensure the backend is running and reachable."
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const detail = errorData.detail || errorData.message || errorData.error;
      throw new Error(detail || `Server returned ${response.status}: Failed to analyze skill gap.`);
    }

    return response.json();
  },
};
