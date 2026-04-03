import { useState } from "react";
import { Footer } from "../Component/Shared/Footer";
 
const SUGGESTED_SKILLS = ["JavaScript", "Figma", "Node.js", "SQL", "Django", "Flutter"];
 
const inputClass =
  "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-green-700 transition-colors";
 
export const ProfilePage = () => {
  const [skills, setSkills]         = useState(["React", "TypeScript", "Python"]);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved]           = useState(false);
 
  const addSkill = (s) => {
    const t = s.trim();
    if (t && !skills.includes(t)) setSkills([...skills, t]);
    setSkillInput("");
  };
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));
  const handleSave  = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
 
  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-xl mx-auto px-4 py-10">
 
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">Your Profile</h1>
        <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
          Complete your profile to get better internship matches
        </p>
 
        {/* ── Basic Info ── */}
        <div className="bg-white rounded-2xl p-6 mb-5 border border-gray-200">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-lg">👤</span>
            <h2 className="text-base font-extrabold text-gray-900 m-0">Basic Information</h2>
          </div>
 
          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Full Name</label>
              <input defaultValue="Adebayo Ogunlesi" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
 
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Email</label>
              <input defaultValue="adebayo@email.com" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
 
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>📍 Preferred Location</label>
                <div className="relative">
                  <input defaultValue="Lagos, Nigeria" className={`${inputClass} pr-8`} style={{ fontFamily: "system-ui, sans-serif" }} />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">◈</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>⊞ Course of Study</label>
                <input defaultValue="Computer Science" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
            </div>
 
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Bio</label>
              <textarea
                placeholder="Tell companies about yourself..."
                rows={4}
                className={`${inputClass} resize-y`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
            </div>
          </div>
        </div>
 
        {/* ── Skills ── */}
        <div className="bg-white rounded-2xl p-6 mb-5 border border-gray-200">
          <h2 className="text-base font-extrabold text-gray-900 mb-4">Skills</h2>
 
          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 bg-green-50 text-green-800 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  className="text-green-600 bg-transparent border-none cursor-pointer text-sm leading-none p-0 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
 
          {/* Add skill input */}
          <div className="flex gap-2 mb-3">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
              placeholder="Add a skill..."
              className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-green-700 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            />
            <button
              onClick={() => addSkill(skillInput)}
              className="w-9 h-9 bg-green-900 text-white rounded-lg text-xl flex items-center justify-center hover:bg-green-800 transition-colors cursor-pointer border-none"
            >
              +
            </button>
          </div>
 
          {/* Suggested */}
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Suggested:</span>
            {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                className="text-xs font-semibold text-green-700 bg-transparent border-none cursor-pointer px-1 hover:text-green-900"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
 
        {/* ── Portfolio & CV ── */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
          <h2 className="text-base font-extrabold text-gray-900 mb-4">Portfolio & CV</h2>
 
          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>⊓ GitHub Profile</label>
              <input placeholder="https://github.com/yourusername" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>⊕ Portfolio Website</label>
              <input placeholder="https://yourportfolio.com" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Upload CV</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-2xl mb-2">⤴</div>
                <p className="text-sm text-gray-500 m-0" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Drag & drop your CV here, or{" "}
                  <span className="text-green-700 font-semibold underline cursor-pointer">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                  PDF, DOC up to 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Save button */}
        <button
          onClick={handleSave}
          className={`w-full text-white font-bold py-4 rounded-xl text-base transition-colors cursor-pointer border-none ${
            saved ? "bg-green-500" : "bg-green-900 hover:bg-green-800"
          }`}
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {saved ? "✓ Profile Saved!" : "Save Profile"}
        </button>
      </div>
 
      <Footer />
    </div>
  );
};
 