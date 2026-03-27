import { useState } from "react";
import internshipsData from "../data/internships.json";
import { InternshipCard } from "../Component/InternshipCard";
import { MapView } from "../Component/Mapview";
import { Footer } from "../Component/Shared/Footer";
 
const LOCATIONS = ["All Locations", "Lagos", "Abuja", "Remote", "Port Harcourt"];
const CATEGORIES = ["All", "Engineering", "Design", "Data", "Marketing", "Operations"];
const COURSES = [
  "All Courses","Computer Science","Software Engineering","Statistics",
  "Fine Arts","Marketing","Accounting","Civil Engineering","Electrical Engineering",
];
 
export const InternshipsPage = () => {
  const [search, setSearch]           = useState("");
  const [location, setLocation]       = useState("All Locations");
  const [category, setCategory]       = useState("All");
  const [viewMode, setViewMode]       = useState("list");
  const [courseFilter, setCourseFilter] = useState("All Courses");
 
  const filtered = internshipsData.filter((i) => {
    const matchSearch =
      !search ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());
    const matchLoc =
      location === "All Locations" || i.location === location || i.type === location;
    const matchCat = category === "All" || i.category === category;
    return matchSearch && matchLoc && matchCat;
  });
 
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
 
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>
          Browse Internships
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28, fontFamily: "system-ui, sans-serif" }}>
          Discover opportunities matched to your skills and interests
        </p>
 
        {/* ── Search bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "white",
            border: "1.5px solid #e5e7eb",
            borderRadius: 12,
            padding: "10px 16px",
            marginBottom: 16,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, companies..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "system-ui, sans-serif",
              background: "transparent",
            }}
          />
        </div>
 
        {/* ── Location filters ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {LOCATIONS.map((l) => (
            <button
              key={l}
              onClick={() => setLocation(l)}
              style={{
                background: location === l ? "#1a5c38" : "white",
                color: location === l ? "white" : "#374151",
                border: "1.5px solid",
                borderColor: location === l ? "#1a5c38" : "#e5e7eb",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {l}
            </button>
          ))}
        </div>
 
        {/* ── Category filters ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                background: category === c ? "#1a5c38" : "white",
                color: category === c ? "white" : "#374151",
                border: "1.5px solid",
                borderColor: category === c ? "#1a5c38" : "#e5e7eb",
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {c}
            </button>
          ))}
        </div>
 
        {/* ── List / Map toggle ── */}
        <div style={{ display: "flex", marginBottom: 16 }}>
          {[["list", "☰ List"], ["map", "⊞ Map"]].map(([m, l]) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              style={{
                background: viewMode === m ? "#1a1a1a" : "white",
                color: viewMode === m ? "white" : "#374151",
                border: "1.5px solid #e5e7eb",
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                borderRadius: m === "list" ? "8px 0 0 8px" : "0 8px 8px 0",
              }}
            >
              {l}
            </button>
          ))}
        </div>
 
        {/* ── Map View ── */}
        {viewMode === "map" && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "white",
                border: "1.5px solid #e5e7eb",
                borderRadius: 12,
                padding: "10px 16px",
                marginBottom: 12,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                placeholder="Search by role or company..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  fontFamily: "system-ui, sans-serif",
                }}
              />
              <button
                style={{
                  background: "none",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                ◈ My Location
              </button>
            </div>
 
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {COURSES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCourseFilter(c)}
                  style={{
                    background: courseFilter === c ? "#1a5c38" : "white",
                    color: courseFilter === c ? "white" : "#374151",
                    border: "1.5px solid",
                    borderColor: courseFilter === c ? "#1a5c38" : "#e5e7eb",
                    borderRadius: 20,
                    padding: "5px 12px",
                    fontSize: 12,
                    fontWeight: courseFilter === c ? 700 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
 
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>
              📍 12 internships on map
            </p>
            <MapView />
          </>
        )}
 
        {/* ── List View ── */}
        {viewMode === "list" && (
          <>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16, fontFamily: "system-ui, sans-serif" }}>
              {filtered.length} internships found
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 14,
              }}
            >
              {filtered.map((i) => (
                <InternshipCard key={i.id} intern={i} grid />
              ))}
            </div>
          </>
        )}
      </div>
 
      <Footer />
    </div>
  );
};
 
