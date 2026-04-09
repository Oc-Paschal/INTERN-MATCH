import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Footer } from "../Component/Shared/Footer";

const SUGGESTED_SKILLS = ["JavaScript", "Figma", "Node.js", "SQL", "Django", "Flutter", "React", "Python", "UI/UX", "Data Analysis"];

const FloatingInput = ({ label, value, onChange, placeholder, type = "text" }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          focused || hasValue
            ? "top-1.5 text-xs text-green-700"
            : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
        }`}
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? "" : placeholder}
        className={`w-full border rounded-lg px-4 pt-5 pb-2 text-sm outline-none transition-colors bg-white ${
          focused ? "border-green-600 ring-2 ring-green-100" : "border-gray-200"
        }`}
        style={{ fontFamily: "system-ui, sans-serif" }}
      />
    </div>
  );
};

const SectionCard = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 mb-5 border border-gray-200"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-800">
        <span className="text-lg">{icon}</span>
      </div>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export const ProfilePage = () => {
  const { user, login } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    location: user?.location || "",
    course: user?.course || "",
    bio: user?.bio || "",
    github: user?.github || "",
    portfolio: user?.portfolio || "",
    linkedin: user?.linkedin || "",
    availability: user?.availability || "",
  });

  const calculateProgress = () => {
    const fields = [
      profile.fullName,
      profile.email,
      profile.location,
      profile.course,
      profile.bio,
      profile.github,
      profile.linkedin,
      skills.length > 0,
      avatar,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const progress = calculateProgress();

  useEffect(() => {
    const timeout = setTimeout(() => {
      login({ ...user, ...profile, skills, avatar });
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, skills, avatar]);

  const updateProfile = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        addToast("Profile photo updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (s) => {
    const t = s.trim();
    if (t && !skills.includes(t)) setSkills([...skills, t]);
    setSkillInput("");
  };

  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));

  const handleSave = () => {
    login({ ...user, ...profile, skills, avatar });
    setSaved(true);
    addToast("Profile saved successfully!", "success");
    setTimeout(() => setSaved(false), 2000);
  };

  const progressColor = progress === 100 ? "bg-green-500" : progress > 50 ? "bg-green-400" : "bg-yellow-400";

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header with progress */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">Your Profile</h1>
          
          {/* Progress bar */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                Profile Completion
              </span>
              <span className="text-sm font-bold text-gray-900">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full ${progressColor}`}
              />
            </div>
            {progress < 100 && (
              <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                Complete all fields to get better internship matches
              </p>
            )}
          </div>
        </div>

        {/* Avatar section */}
        <SectionCard icon="👤" title="Profile Photo">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-800 transition-colors border-none cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Profile Photo</p>
              <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                JPG, PNG up to 2MB
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Basic Info */}
        <SectionCard icon="📋" title="Basic Information">
          <div className="grid gap-4">
            <FloatingInput
              label="Full Name"
              value={profile.fullName}
              onChange={(v) => updateProfile("fullName", v)}
              placeholder="Adebayo Ogunlesi"
            />
            <FloatingInput
              label="Email Address"
              value={profile.email}
              onChange={(v) => updateProfile("email", v)}
              placeholder="adebayo@email.com"
              type="email"
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Preferred Location"
                value={profile.location}
                onChange={(v) => updateProfile("location", v)}
                placeholder="Lagos, Nigeria"
              />
              <FloatingInput
                label="Course of Study"
                value={profile.course}
                onChange={(v) => updateProfile("course", v)}
                placeholder="Computer Science"
              />
            </div>
            <FloatingInput
              label="When can you start?"
              value={profile.availability}
              onChange={(v) => updateProfile("availability", v)}
              placeholder="Immediately / June 2026"
            />
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateProfile("bio", e.target.value)}
                placeholder="Tell companies about yourself, your goals, and what you're looking for..."
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all resize-y"
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
            </div>
          </div>
        </SectionCard>

        {/* Skills */}
        <SectionCard icon="⚡" title="Skills">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((s) => (
              <motion.span
                key={s}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5 bg-green-50 text-green-800 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  className="text-green-600 bg-transparent border-none cursor-pointer text-sm leading-none p-0 hover:text-green-900"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
              placeholder="Add a skill..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all"
              style={{ fontFamily: "system-ui, sans-serif" }}
            />
            <button
              onClick={() => addSkill(skillInput)}
              className="w-10 h-10 bg-green-900 text-white rounded-lg text-xl flex items-center justify-center hover:bg-green-800 transition-colors cursor-pointer border-none"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Popular:</span>
            {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                className="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors cursor-pointer border-none"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                + {s}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Social Links */}
        <SectionCard icon="🔗" title="Social Links">
          <div className="grid gap-4">
            <FloatingInput
              label="GitHub Profile"
              value={profile.github}
              onChange={(v) => updateProfile("github", v)}
              placeholder="https://github.com/yourusername"
            />
            <FloatingInput
              label="LinkedIn Profile"
              value={profile.linkedin}
              onChange={(v) => updateProfile("linkedin", v)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <FloatingInput
              label="Portfolio Website"
              value={profile.portfolio}
              onChange={(v) => updateProfile("portfolio", v)}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </SectionCard>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full text-white font-bold py-4 rounded-xl text-base transition-colors cursor-pointer border-none ${
            saved ? "bg-green-500" : "bg-green-900 hover:bg-green-800"
          }`}
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {saved ? "✓ Profile Saved!" : "Save Profile"}
        </motion.button>
      </div>

      <Footer />
    </div>
  );
};