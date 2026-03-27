import { useState } from "react";
import { Footer } from "../Component/Shared/Footer";
 
const SUGGESTED_SKILLS = ["JavaScript", "Figma", "Node.js", "SQL", "Django", "Flutter"];
 
export const ProfilePage = () => {
  const [skills, setSkills]       = useState(["React", "TypeScript", "Python"]);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved]         = useState(false);
 
  const addSkill = (s) => {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setSkillInput("");
  };
 
  const removeSkill = (s) => setSkills(skills.filter((x) => x !== s));
 
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
 
  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: "system-ui, sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };
 
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
 
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>
          Your Profile
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32, fontFamily: "system-ui, sans-serif" }}>
          Complete your profile to get better internship matches
        </p>
 
        {/* ── Basic Info ── */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 20,
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 18 }}>👤</span>
            <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Basic Information</h2>
          </div>
 
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                Full Name
              </label>
              <input
                defaultValue="Adebayo Ogunlesi"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#1a5c38")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
 
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                Email
              </label>
              <input defaultValue="adebayo@email.com" style={inputStyle} />
            </div>
 
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                  📍 Preferred Location
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    defaultValue="Lagos, Nigeria"
                    style={{ ...inputStyle, paddingRight: 36 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  >
                    ◈
                  </span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                  ⊞ Course of Study
                </label>
                <input defaultValue="Computer Science" style={inputStyle} />
              </div>
            </div>
 
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                Bio
              </label>
              <textarea
                placeholder="Tell companies about yourself..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
          </div>
        </div>
 
        {/* ── Skills ── */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 20,
            border: "1px solid #e5e7eb",
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 16px" }}>Skills</h2>
 
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  borderRadius: 20,
                  padding: "5px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#16a34a",
                    fontSize: 14,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
 
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
              placeholder="Add a skill..."
              style={{ flex: 1, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, fontFamily: "system-ui, sans-serif", outline: "none" }}
            />
            <button
              onClick={() => addSkill(skillInput)}
              style={{
                background: "#1a5c38",
                color: "white",
                border: "none",
                borderRadius: 8,
                width: 36,
                height: 36,
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </button>
          </div>
 
          <div>
            <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "system-ui, sans-serif" }}>
              Suggested skills:{" "}
            </span>
            {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1a5c38",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "2px 4px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
 
        {/* ── Portfolio & CV ── */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 24,
            border: "1px solid #e5e7eb",
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 16px" }}>Portfolio & CV</h2>
 
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                ⊓ GitHub Profile
              </label>
              <input placeholder="https://github.com/yourusername" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                ⊕ Portfolio Website
              </label>
              <input placeholder="https://yourportfolio.com" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>
                Upload CV
              </label>
              <div
                style={{
                  border: "2px dashed #d1d5db",
                  borderRadius: 10,
                  padding: "32px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#fafafa",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>⤴</div>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0, fontFamily: "system-ui, sans-serif" }}>
                  Drag & drop your CV here, or{" "}
                  <span
                    style={{
                      color: "#1a5c38",
                      fontWeight: 600,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    browse
                  </span>
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0", fontFamily: "system-ui, sans-serif" }}>
                  PDF, DOC up to 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
 
        {/* ── Save Button ── */}
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            background: saved ? "#22c55e" : "#1a5c38",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "15px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.3s",
            fontFamily: "'Georgia', serif",
          }}
        >
          {saved ? "✓ Profile Saved!" : "Save Profile"}
        </button>
      </div>
 
      <Footer />
    </div>
  );
};
 
