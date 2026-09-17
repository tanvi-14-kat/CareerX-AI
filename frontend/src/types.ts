export type ActiveTab =
  | "discover"
  | "assessment"
  | "results"
  | "my-career"
  | "skill-gap"
  | "roadmap"
  | "market"
  | "mentor";

// Assessment & Profile
export interface StudentProfile {
  education: string;
  interests: string[];
  skills: string[];
  goal: string;
  study_hours: number;
}

// Recommended Next Step in Career Recommendation
export interface NextStep {
  step: number;
  title: string;
  description: string;
  timeframe?: string;
}

// Market Outlook within recommendation
export interface CareerMarketOutlook {
  demand: "Very High" | "High" | "Growing" | string;
  medianSalary: string;
  growthRate: string;
  keySummary: string;
}

// Strengths breakdown
export interface StrengthsAlignment {
  skillsContribution: number;
  interestsContribution: number;
  goalContribution: number;
  educationContribution: number;
}

// Single Career Recommendation Object
export interface PrimaryCareerRecommendation {
  career: string;
  tagline: string;
  matchScore: number;
  explanation: string;
  strengthsAlignment?: StrengthsAlignment;
  matchedSkills: string[];
  skillsToDevelop: string[];
  recommendedNextSteps: NextStep[];
  marketOutlook?: CareerMarketOutlook;
}

export interface AlternativeCareer {
  career: string;
  tagline: string;
  matchScore: number;
  explanation: string;
  matchedSkills: string[];
  skillsToDevelop: string[];
}

export interface CareerRecommendationResponse {
  primaryRecommendation: PrimaryCareerRecommendation;
  alternativeCareers: AlternativeCareer[];
  studentSummary: string;
}

// Skill Gap API schema
export interface LearningPriority {
  skill: string;
  priority: "Critical" | "High" | "Recommended" | "Nice-to-Have";
  reason: string;
}

export interface SkillGapAnalyzeResponse {
  career: string;
  currentSkills: string[];
  skillsToDevelop: string[];
  skillsCoveredCount: number;
  totalTargetSkillsCount: number;
  coveragePercentage: number;
  recommendations: string[];
  learningPriorities: LearningPriority[];
}

// Existing Resume & Interview Types (Preserved for compatibility)
export interface BulletImprovement {
  original: string;
  critique: string;
  improved: string;
}

export interface SectionFeedback {
  section: string;
  rating: "Excellent" | "Good" | "Needs Work";
  note: string;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  atsScore: number;
  impactScore: number;
  brevityScore: number;
  summary: string;
  detectedRole: string;
  experienceLevel: string;
  strengths: string[];
  criticalGaps: string[];
  atsKeywordsFound: string[];
  atsKeywordsMissing: string[];
  bulletImprovements: BulletImprovement[];
  sectionFeedback: SectionFeedback[];
}

export interface SkillItem {
  skill: string;
  priority: "Critical" | "High" | "Nice-to-Have";
  reason: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeframe: string;
  focus: string;
  keyMilestones: string[];
  recommendedProject: {
    title: string;
    description: string;
    techStack: string[];
  };
}

export interface SkillGapResult {
  readinessPercentage: number;
  targetRoleDemand: "Very High" | "High" | "Moderate";
  estimatedTransitionTime: string;
  skillsMastered: string[];
  skillsToAcquire: SkillItem[];
  roadmap: RoadmapPhase[];
  recommendedCertifications: string[];
  interviewFocusAreas: string[];
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  evalCriteria: string;
  hint: string;
}

export interface InterviewSession {
  trackTitle: string;
  role: string;
  level: string;
  interviewerPersona: string;
  questions: InterviewQuestion[];
}

export interface AnswerEvaluation {
  overallScore: number;
  clarityScore: number;
  technicalDepthScore: number;
  starAdherenceScore: number;
  verdict: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Improvement";
  keyHighlights: string[];
  growthAreas: string[];
  modelAnswer: string;
}

export interface PitchResult {
  subjectLine: string;
  coverLetter: string;
  linkedinPitch: string;
  elevatorPitch: string;
  keySellingPoints: string[];
}
