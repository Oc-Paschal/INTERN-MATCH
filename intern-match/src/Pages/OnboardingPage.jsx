// src/Pages/OnboardingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

// ── Data ───────────────────────────────────────────────────────────────────────
const SKILLS_OPTIONS = [
  "React", "Python", "Figma", "Node.js", "TypeScript", "SQL",
  "JavaScript", "UI/UX", "Django", "Flutter", "TensorFlow", "Data Analysis",
  "Excel", "Marketing", "SEO", "PostgreSQL", "Firebase", "NLP",
];

const INTERESTS = [
  { id: "engineering", label: "Engineering",  emoji: "⚙️" },
  { id: "design",      label: "Design",       emoji: "🎨" },
  { id: "data",        label: "Data & AI",    emoji: "📊" },
  { id: "marketing",   label: "Marketing",    emoji: "📣" },
  { id: "operations",  label: "Operations",   emoji: "📋" },
  { id: "finance",     label: "Finance",      emoji: "💰" },
];

const GOALS = [
  { id: "experience",  label: "Gain work experience",       emoji: "💼" },
  { id: "skills",      label: "Build my skills",            emoji: "⚡" },
  { id: "network",     label: "Grow my network",            emoji: "🤝" },
  { id: "fulltime",    label: "Land a full-time job",       emoji: "🎯" },
  { id: "portfolio",   label: "Build my portfolio",         emoji: "🗂️" },
  { id: "allowance",   label: "Earn a stipend",             emoji: "💸" },
];

// ── Step progress bar ──────────────────────────────────────────────────────────
const StepBar = ({ current, total }) => (
  <div className="flex gap-2 mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className={`h-1.5 flex-1 rounded-full ${i < current ? "bg-green-900" : "bg-gray-200"}`}
        animate={{ scaleX: i < current ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      />
    ))}
  </div>
);

// ── Step wrapper with animation ────────────────────────────────────────────────
const StepWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

// ── Toggle chip ────────────────────────────────────────────────────────────────
const Chip = ({ label, emoji, selected, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
      selected
        ? "bg-green-900 text-white border-green-900"
        : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
    }`}
    style={{ fontFamily: "system-ui, sans-serif" }}
  >
    {emoji && <span>{emoji}</span>}
    {label}
    {selected && (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )}
  </motion.button>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
export const OnboardingPage = () => {
  const navigate  = useNavigate();
  const { user, login } = useAuth();
  const { addToast }    = useToast();

  const [step, setStep]           = useState(1);
  const [skills, setSkills]       = useState([]);
  const [interests, setInterests] = useState([]);
  const [goals, setGoals]         = useState([]);

  const TOTAL_STEPS = 3;

  const toggleItem = (list, setList, id) => {
    setList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    // Save onboarding data to user profile
    login({
      ...user,
      skills,
      interests,
      goals,
      onboarded: true,
    });
    addToast("You're all set! Welcome to InternMatch NG 🎉", "success");
    navigate("/internships");
  };

  const canNext = () => {
    if (step === 1) return skills.length >= 1;
    if (step === 2) return interests.length >= 1;
    if (step === 3) return goals.length >= 1;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 bg-green-900 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            InternMatch NG
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">

          {/* Step bar */}
          <StepBar current={step} total={TOTAL_STEPS} />

          <AnimatePresence mode="wait">

            {/* ── Step 1: Skills ── */}
            {step === 1 && (
              <StepWrapper key="step1">
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    ⚡
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                    What are your skills?
                  </h1>
                  <p className="text-sm text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Pick at least 1. This helps us find your best matches.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {SKILLS_OPTIONS.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      selected={skills.includes(s)}
                      onClick={() => toggleItem(skills, setSkills, s)}
                    />
                  ))}
                </div>

                {skills.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-green-700 font-semibold text-center mb-4"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {skills.length} skill{skills.length > 1 ? "s" : ""} selected
                  </motion.p>
                )}
              </StepWrapper>
            )}

            {/* ── Step 2: Interests ── */}
            {step === 2 && (
              <StepWrapper key="step2">
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    🎯
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                    What are you interested in?
                  </h1>
                  <p className="text-sm text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Choose the fields you want to work in.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {INTERESTS.map((item) => (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleItem(interests, setInterests, item.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        interests.includes(item.id)
                          ? "bg-green-900 text-white border-green-900"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-sm font-bold" style={{ fontFamily: "'Georgia', serif" }}>
                        {item.label}
                      </span>
                      {interests.includes(item.id) && (
                        <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </motion.button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* ── Step 3: Goals ── */}
            {step === 3 && (
              <StepWrapper key="step3">
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    🚀
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                    What are your goals?
                  </h1>
                  <p className="text-sm text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                    What do you want to get out of your internship?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  {GOALS.map((item) => (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleItem(goals, setGoals, item.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        goals.includes(item.id)
                          ? "bg-green-900 text-white border-green-900"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{item.emoji}</span>
                      <span className="text-sm font-semibold flex-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {item.label}
                      </span>
                      {goals.includes(item.id) && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </motion.button>
                  ))}
                </div>
              </StepWrapper>
            )}

          </AnimatePresence>

          {/* ── Navigation buttons ── */}
          <div className="flex gap-3 mt-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                ← Back
              </button>
            )}

            {step < TOTAL_STEPS ? (
              <button
                onClick={() => canNext() && setStep((s) => s + 1)}
                disabled={!canNext()}
                className={`flex-1 py-3.5 rounded-xl text-white font-bold text-sm border-none transition-all ${
                  canNext()
                    ? "bg-green-900 hover:bg-green-800 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => canNext() && handleFinish()}
                disabled={!canNext()}
                className={`flex-1 py-3.5 rounded-xl text-white font-bold text-sm border-none transition-all ${
                  canNext()
                    ? "bg-green-900 hover:bg-green-800 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Find My Matches 🎉
              </button>
            )}
          </div>

          {/* Skip */}
          <button
            onClick={() => {
              login({ ...user, onboarded: true });
              navigate("/internships");
            }}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4 bg-transparent border-none cursor-pointer"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Skip for now
          </button>

          {/* Step label */}
          <p className="text-center text-xs text-gray-400 mt-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>
      </div>
    </div>
  );
};