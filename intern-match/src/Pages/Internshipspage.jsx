import { useState } from "react";
import internshipsData from "../data/internships.json";
import { InternshipCard } from "../Component/InternshipCard";
import { InternshipModal } from "../Component/InternshipModal";
import { MapView } from "../Component/Mapview";
import { Footer } from "../Component/Shared/Footer";
import { EmptyState } from "../Component/EmptyState";
 
const LOCATIONS  = ["All Locations", "Lagos", "Abuja", "Remote", "Port Harcourt"];
const CATEGORIES = ["All", "Engineering", "Design", "Data", "Marketing", "Operations"];
const COURSES    = [
  "All Courses", "Computer Science", "Software Engineering", "Statistics",
  "Fine Arts", "Marketing", "Accounting", "Civil Engineering", "Electrical Engineering",
];
 
export const InternshipsPage = () => {
  const [search, setSearch]             = useState("");
  const [location, setLocation]         = useState("All Locations");
  const [category, setCategory]         = useState("All");
  const [viewMode, setViewMode]         = useState("list");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [selectedIntern, setSelectedIntern] = useState(null);
 
  const filtered = internshipsData.filter((i) => {
    const matchSearch =
      !search ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());
    const matchLoc  = location === "All Locations" || i.location === location || i.type === location;
    const matchCat  = category === "All" || i.category === category;
    return matchSearch && matchLoc && matchCat;
  });
 
  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
 
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Browse Internships</h1>
        <p className="text-gray-500 mb-7 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
          Discover opportunities matched to your skills and interests
        </p>
 
        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, companies..."
            className="flex-1 border-none outline-none text-sm bg-transparent"
            style={{ fontFamily: "system-ui, sans-serif" }}
          />
        </div>
 
        {/* Location filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {LOCATIONS.map((l) => (
            <button
              key={l}
              onClick={() => setLocation(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                location === l
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {l}
            </button>
          ))}
        </div>
 
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                category === c
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {c}
            </button>
          ))}
        </div>
 
        {/* List / Map toggle */}
        <div className="flex mb-5">
          {[["list", "☰ List"], ["map", "⊞ Map"]].map(([m, l]) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-5 py-2 text-sm font-semibold border border-gray-200 transition-colors cursor-pointer ${
                viewMode === m ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              } ${m === "list" ? "rounded-l-lg" : "rounded-r-lg"}`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {l}
            </button>
          ))}
        </div>
 
        {/* ── Map View ── */}
        {viewMode === "map" && (
          <>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                placeholder="Search by role or company..."
                className="flex-1 border-none outline-none text-sm bg-transparent"
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
              <button className="border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer bg-transparent">
                ◈ My Location
              </button>
            </div>
 
            <div className="flex flex-wrap gap-2 mb-3 overflow-x-auto">
              {COURSES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCourseFilter(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition-colors cursor-pointer ${
                    courseFilter === c
                      ? "bg-green-900 text-white border-green-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {c}
                </button>
              ))}
            </div>
 
            <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
              📍 12 internships on map
            </p>
            <MapView />
          </>
        )}
 
        {/* ── List View ── */}
        {viewMode === "list" && (
          <>
            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
              {filtered.length} internships found
            </p>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((i) => (
                  <InternshipCard key={i.id} intern={i} onClick={() => setSelectedIntern(i)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <InternshipModal intern={selectedIntern} onClose={() => setSelectedIntern(null)} />

      <Footer />
    </div>
  );
};
 