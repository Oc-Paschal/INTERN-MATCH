// src/Pages/InternshipDetailPage.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import internshipsData from "../data/internships.json";
import { MatchBadge, TypeBadge } from "../Component/Shared/Badges";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";
import { Footer } from "../Component/Shared/Footer";

// ── Apply Modal ────────────────────────────────────────────────────────────────
const ApplyModal = ({ intern, onClose }) => {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", coverLetter: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      addToast(`Application sent to ${intern.company}!`, "success");
    }, 1500);
  };

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white dark:bg-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!done ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  Apply to {intern.company}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {intern.title}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent border-none cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Adebayo Ogunlesi" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Cover Letter <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.coverLetter}
                  onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                  placeholder="Tell them why you're a great fit..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={onClose} className="flex-1 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 py-3 rounded-xl text-white font-bold text-sm border-none cursor-pointer transition-all ${loading ? "bg-green-700 opacity-70" : "bg-green-900 hover:bg-green-800"}`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending...
                  </span>
                ) : "Submit Application"}
              </button>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" className="dark:stroke-green-400" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              Application Sent!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
              Your application to <strong>{intern.company}</strong> has been submitted. Good luck! 🎉
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-green-900 text-white font-bold rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Detail section wrapper ─────────────────────────────────────────────────────
const Section = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
    <h2 className="text-base font-extrabold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Georgia', serif" }}>
      {title}
    </h2>
    {children}
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
export const InternshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [showApply, setShowApply] = useState(false);

  const intern = internshipsData.find((i) => i.id === parseInt(id));

  // 404 state
  if (!intern) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white" style={{ fontFamily: "'Georgia', serif" }}>
          Internship not found
        </p>
        <Link to="/internships" className="text-green-700 dark:text-green-400 font-semibold hover:text-green-900 dark:hover:text-green-300 no-underline" style={{ fontFamily: "system-ui, sans-serif" }}>
          ← Back to Internships
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(intern.id);

  const handleFavorite = () => {
    toggleFavorite(intern);
    addToast(favorited ? "Removed from saved" : "Saved to favourites", favorited ? "error" : "success");
  };

  // Days until deadline
  const daysLeft = intern.deadline
    ? Math.max(0, Math.ceil((new Date(intern.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-br from-green-900 to-green-800 px-6 md:px-16 pt-10 pb-24">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-200 hover:text-white text-sm font-medium bg-transparent border-none cursor-pointer mb-6 transition-colors"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6">
          {/* Company logo box */}
          <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <MatchBadge match={intern.match} />
              <TypeBadge type={intern.type} />
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {intern.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              {intern.title}
            </h1>
            <p className="text-green-200 text-lg font-medium">{intern.company}</p>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column (main content) ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Quick info strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: "📍", label: "Location",  value: intern.location },
                { icon: "⏱",  label: "Duration",  value: intern.duration || "3 months" },
                { icon: "💰", label: "Stipend",   value: intern.stipend  || "Negotiable" },
                { icon: "👥", label: "Open Slots", value: `${intern.slots || 1} position${intern.slots > 1 ? "s" : ""}` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-400 dark:text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>{icon} {label}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: "system-ui, sans-serif" }}>{value}</span>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Section title="About this Role">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {intern.description}
                </p>
              </Section>
            </motion.div>

            {/* Responsibilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="What You'll Do">
                <ul className="space-y-3">
                  {(intern.responsibilities || []).map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Requirements">
                <ul className="space-y-3">
                  {(intern.requirements || []).map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>
                      <div className="w-5 h-5 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Section title="Required Skills">
                <div className="flex flex-wrap gap-2">
                  {intern.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 text-sm font-semibold rounded-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            </motion.div>

            {/* Perks */}
            {intern.perks && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Section title="Perks & Benefits">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {intern.perks.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3">
                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">⭐</span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </motion.div>
            )}

            {/* Company info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Section title={`About ${intern.company}`}>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {intern.companyDesc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {intern.companySize}
                  </span>
                  {intern.companyWebsite && (
                    <a href={intern.companyWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-green-700 hover:text-green-900 no-underline font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Visit website
                    </a>
                  )}
                </div>
              </Section>
            </motion.div>
          </div>

          {/* ── Right column (sticky sidebar) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">

              {/* Apply card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                {/* Deadline */}
                {daysLeft !== null && (
                  <div className={`flex items-center gap-2 text-xs font-semibold mb-4 px-3 py-2 rounded-lg ${
                    daysLeft <= 3 ? "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400" : daysLeft <= 7 ? "bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400" : "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-400"
                  }`} style={{ fontFamily: "system-ui, sans-serif" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    {daysLeft === 0 ? "Deadline is today!" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left to apply`}
                  </div>
                )}

                <button
                  onClick={() => setShowApply(true)}
                  className="w-full py-3.5 bg-green-900 text-white font-bold rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Apply Now
                </button>

                <button
                  onClick={handleFavorite}
                  className={`w-full py-3 rounded-xl font-semibold text-sm border transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    favorited
                      ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={favorited ? "#dc2626" : "none"} stroke={favorited ? "#dc2626" : "#6b7280"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {favorited ? "Saved" : "Save for Later"}
                </button>

                <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Posted {intern.posted} · {intern.slots} slot{intern.slots > 1 ? "s" : ""} available
                </p>
              </motion.div>

              {/* Match breakdown card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                  Your Match Score
                </h3>

                {/* Big score circle */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" className="dark:stroke-gray-700" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke={intern.match >= 85 ? "#22c55e" : intern.match >= 70 ? "#f59e0b" : "#94a3b8"}
                        strokeWidth="3"
                        strokeDasharray={`${intern.match} ${100 - intern.match}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{intern.match}%</span>
                    </div>
                  </div>
                </div>

                {/* Skill match breakdown */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                    SKILL MATCH
                  </p>
                  {intern.skills.map((s) => (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-300" style={{ fontFamily: "system-ui, sans-serif" }}>{s}</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Match
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                  Share this Role
                </h3>
                <div className="flex gap-2">
                  {[
                    { label: "Twitter/X", bg: "bg-black", icon: "𝕏" },
                    { label: "WhatsApp", bg: "bg-green-500", icon: "W" },
                    { label: "Copy Link", bg: "bg-gray-100", icon: "🔗", dark: true },
                  ].map(({ label, bg, icon, dark }) => (
                    <button
                      key={label}
                      onClick={() => addToast("Link copied!", "success")}
                      className={`flex-1 py-2 ${bg} ${dark ? "text-gray-700" : "text-white"} text-xs font-bold rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity`}
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Apply Modal */}
      {showApply && <ApplyModal intern={intern} onClose={() => setShowApply(false)} />}

      <Footer />
    </div>
  );
};