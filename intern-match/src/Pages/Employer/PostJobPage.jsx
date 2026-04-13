// src/Pages/Employer/PostJobPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEmployer } from "../../context/EmployerContext";
import { useToast } from "../../context/ToastContext";

const CATEGORIES = ["Engineering", "Design", "Data", "Marketing", "Operations", "Finance", "Other"];
const LOCATIONS  = ["Lagos", "Abuja", "Port Harcourt", "Remote", "Ibadan", "Kano", "Enugu"];
const TYPES      = ["Remote", "Hybrid", "On-site"];
const DURATIONS  = ["1 month", "2 months", "3 months", "4 months", "6 months", "1 year"];

const SKILL_SUGGESTIONS = [
  "React", "Python", "Figma", "Node.js", "TypeScript", "SQL", "JavaScript",
  "UI/UX", "Django", "Flutter", "Excel", "Marketing", "SEO", "Data Analysis",
];

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white";

export const PostJobPage = () => {
  const navigate     = useNavigate();
  const { addJob }   = useEmployer();
  const { addToast } = useToast();
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [form, setForm] = useState({
    title: "", category: "", location: "", type: "Remote",
    duration: "3 months", stipend: "", slots: 1, deadline: "",
    skills: [], description: "", responsibilities: "", requirements: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = (s) => {
    const t = s.trim();
    if (t && !form.skills.includes(t)) setForm({ ...form, skills: [...form.skills, t] });
    setSkillInput("");
  };

  const removeSkill = (s) => setForm({ ...form, skills: form.skills.filter((x) => x !== s) });

  const validate = () => {
    if (!form.title.trim())       return "Please enter a job title.";
    if (!form.category)           return "Please select a category.";
    if (!form.location)           return "Please select a location.";
    if (!form.deadline)           return "Please set an application deadline.";
    if (form.skills.length === 0) return "Please add at least one required skill.";
    if (!form.description.trim()) return "Please add a job description.";
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setTimeout(() => {
      addJob(form);
      setLoading(false);
      addToast("Job posted successfully! 🎉", "success");
      navigate("/employer/jobs");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm bg-transparent border-none cursor-pointer mb-4"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Post a Job</h1>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
          Fill in the details below to find the perfect interns
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
          {error}
        </div>
      )}

      {/* ── Basic Info ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-200 mb-5">
        <h2 className="text-base font-extrabold text-gray-900 mb-5">Basic Information</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Job Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Frontend Developer Intern" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Work Type *</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Location *</label>
              <select name="location" value={form.location} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                <option value="">Select location...</option>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Duration</label>
              <select name="duration" value={form.duration} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Monthly Stipend</label>
              <input type="text" name="stipend" value={form.stipend} onChange={handleChange} placeholder="e.g. ₦80,000/month" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Open Slots</label>
              <input type="number" name="slots" value={form.slots} onChange={handleChange} min={1} max={50} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Application Deadline *</label>
            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
          </div>
        </div>
      </motion.div>

      {/* ── Skills ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-200 mb-5">
        <h2 className="text-base font-extrabold text-gray-900 mb-5">Required Skills *</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.skills.map((s) => (
            <span key={s} className="flex items-center gap-1.5 bg-green-50 text-green-800 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ fontFamily: "system-ui, sans-serif" }}>
              {s}
              <button onClick={() => removeSkill(s)} className="text-green-600 bg-transparent border-none cursor-pointer text-sm leading-none p-0 hover:text-green-900">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
            placeholder="Add a required skill..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-700 transition-all" style={{ fontFamily: "system-ui, sans-serif" }}
          />
          <button onClick={() => addSkill(skillInput)} className="w-10 h-10 bg-green-900 text-white rounded-xl text-xl flex items-center justify-center hover:bg-green-800 transition-colors cursor-pointer border-none">+</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Suggestions:</span>
          {SKILL_SUGGESTIONS.filter((s) => !form.skills.includes(s)).slice(0, 8).map((s) => (
            <button key={s} onClick={() => addSkill(s)} className="text-xs text-green-700 font-medium bg-transparent border-none cursor-pointer hover:text-green-900 px-1" style={{ fontFamily: "system-ui, sans-serif" }}>
              + {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Details ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-5">Job Details</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              placeholder="Describe the role and what the intern will be doing..."
              className={`${inputClass} resize-y`} style={{ fontFamily: "system-ui, sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
              Responsibilities <span className="text-gray-400 font-normal">(one per line)</span>
            </label>
            <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows={4}
              placeholder="Build user interfaces&#10;Write clean code&#10;Participate in code reviews"
              className={`${inputClass} resize-y`} style={{ fontFamily: "system-ui, sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
              Requirements <span className="text-gray-400 font-normal">(one per line)</span>
            </label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4}
              placeholder="Currently enrolled in Computer Science&#10;Familiarity with React&#10;Good communication skills"
              className={`${inputClass} resize-y`} style={{ fontFamily: "system-ui, sans-serif" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Submit */}
      <button
        onClick={handleSubmit} disabled={loading}
        className={`w-full py-4 rounded-xl text-white font-bold text-base border-none transition-all ${
          loading ? "bg-green-700 opacity-70 cursor-not-allowed" : "bg-green-900 hover:bg-green-800 cursor-pointer"
        }`}
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Publishing...
          </span>
        ) : "Publish Job →"}
      </button>
    </div>
  );
};