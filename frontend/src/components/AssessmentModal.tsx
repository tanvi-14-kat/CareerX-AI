import React, { useState } from "react";
import { 
  GraduationCap, 
  Sparkles, 
  Code2, 
  Target, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  X,
  Compass
} from "lucide-react";
import { StudentProfile } from "../types";

interface AssessmentModalProps {
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
  initialProfile?: StudentProfile;
}

const EDUCATION_OPTIONS = [
  "B.Tech / B.E. (Computer Science / IT)",
  "B.Tech / B.E. (Other Branches)",
  "BCA (Bachelor of Computer Applications)",
  "B.Sc. (Computer Science / Data Science)",
  "B.Des (Design / Interaction)",
  "MCA (Master of Computer Applications)",
  "M.Tech / M.S.",
  "Other Degree / Self-Taught",
];

const INTEREST_OPTIONS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Software Development",
  "Data Science & Analytics",
  "Product & UI/UX Design",
  "Cybersecurity",
  "Cloud & DevOps",
  "Robotics & Automation",
  "Web3 & Blockchain",
  "Product Management",
  "Research & Algorithms",
  "Creative Technology",
];

const POPULAR_SKILLS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Java",
  "C++",
  "SQL",
  "Git",
  "Docker",
  "TensorFlow",
  "PyTorch",
  "UI/UX Design",
  "Data Structures",
  "REST APIs",
  "Linux",
];

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  onComplete,
  onCancel,
  initialProfile,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [education, setEducation] = useState(initialProfile?.education || EDUCATION_OPTIONS[0]);
  const [customEducation, setCustomEducation] = useState("");
  const [interests, setInterests] = useState<string[]>(
    initialProfile?.interests || ["Artificial Intelligence", "Software Development"]
  );
  const [skills, setSkills] = useState<string[]>(
    initialProfile?.skills || ["Python", "JavaScript", "SQL", "Git"]
  );
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [goal, setGoal] = useState(
    initialProfile?.goal || "Build intelligent full-stack applications and secure a high-growth engineering role."
  );
  const [studyHours, setStudyHours] = useState(initialProfile?.study_hours || 6);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillInput.trim() && !skills.includes(customSkillInput.trim())) {
      setSkills([...skills, customSkillInput.trim()]);
      setCustomSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleFinalSubmit = () => {
    const finalEducation = education === "Other Degree / Self-Taught" && customEducation.trim() 
      ? customEducation.trim() 
      : education;

    onComplete({
      education: finalEducation,
      interests: interests.length > 0 ? interests : ["Software Development"],
      skills: skills.length > 0 ? skills : ["Problem Solving"],
      goal: goal.trim() || "Become a professional software engineer",
      study_hours: studyHours,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6 my-8 transition-all duration-200">
        
        {/* Header & Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs font-display">
              {step}/{totalSteps}
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Career Discovery Assessment
              </span>
              <h3 className="text-sm font-bold text-slate-800 font-display">
                {step === 1 && "Education Background"}
                {step === 2 && "Problem-Solving Interests"}
                {step === 3 && "Existing Capabilities"}
                {step === 4 && "Career Ambition"}
                {step === 5 && "Study Investment"}
              </h3>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close assessment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* STEP 1: EDUCATION */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Where are you in your education journey?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your current degree or educational program. This helps calibrate role seniority and foundation expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {EDUCATION_OPTIONS.map((opt) => {
                const isSelected = education === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setEducation(opt)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs"
                        : "border-slate-200/90 bg-slate-50/50 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>

            {education === "Other Degree / Self-Taught" && (
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Specify your background or degree..."
                  value={customEducation}
                  onChange={(e) => setCustomEducation(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 2: INTERESTS */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                What kind of problems do you enjoy solving?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pick as many areas as genuinely spark your curiosity. We match careers that ignite your intrinsic motivation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer border flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100/70"
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>

            {interests.length === 0 && (
              <p className="text-xs text-amber-600 pt-1">
                Please select at least 1 area of interest.
              </p>
            )}
          </div>
        )}

        {/* STEP 3: SKILLS */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                What can you already do?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select tools, frameworks, and programming languages you've practiced, or type your own.
              </p>
            </div>

            {/* Selected Skills Pills */}
            <div className="min-h-[44px] p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap gap-1.5 items-center">
              {skills.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No skills selected yet. Choose from below or add custom.</span>
              ) : (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Custom Skill Input */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill and press Enter (e.g., GraphQL, Go, Next.js)..."
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Popular Suggestions */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Common Tech Foundations
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {POPULAR_SKILLS.map((skill) => {
                  const isSelected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {skill} {isSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CAREER GOAL */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                What do you want to achieve?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                In your own words, describe your dream role, what you'd like to build, or the kind of company you want to join.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <textarea
                rows={4}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Tell us what you want to build, learn, or become..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />

              <div className="space-y-1 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-500">Suggested inspirations:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Build generative AI tools and deploy production RAG pipelines",
                    "Become a full-stack engineer at a fast-moving product startup",
                    "Lead design systems and user research for consumer mobile apps",
                    "Specialize in distributed cloud architecture and Kubernetes",
                  ].map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setGoal(example)}
                      className="text-left text-indigo-600 hover:underline hover:text-indigo-800"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: STUDY HOURS */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                How much time can you invest each week?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Be realistic with your university workload and commitments. Even 4-6 focused hours weekly yields exponential progress.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 text-center space-y-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-display">
                {studyHours} <span className="text-base text-slate-500 font-normal">hours / week</span>
              </div>

              <input
                type="range"
                min={2}
                max={25}
                step={1}
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Light (2-4 hrs)</span>
                <span>Balanced (6-10 hrs)</span>
                <span>Intensive (15+ hrs)</span>
              </div>

              <div className="text-xs text-slate-600 pt-2 bg-white rounded-xl p-3 border border-slate-200/70">
                {studyHours <= 4 && "⚡ Great for steady, low-stress upskilling alongside a heavy semester."}
                {studyHours > 4 && studyHours <= 10 && "🚀 Ideal sweet spot for building 2 substantial portfolio projects in 3 months."}
                {studyHours > 10 && "🔥 Fast-track timeline for upcoming internship hiring cycles and hackathons."}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 active:scale-95 transition cursor-pointer"
            >
              <span>Discover My Career</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
