import { CompanyIcon } from "./shared/CompanyIcon";
import { MatchBadge, TypeBadge } from "./shared/Badges";
 
export const InternshipCard = ({ intern, grid = false }) => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: "18px 20px",
      border: "1px solid #e5e7eb",
      cursor: "pointer",
      transition: "box-shadow 0.2s",
      display: "flex",
      flexDirection: grid ? "column" : "row",
      gap: grid ? 12 : 16,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
  >
    {!grid && <CompanyIcon />}
 
    <div style={{ flex: 1, minWidth: 0 }}>
      {grid && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <CompanyIcon />
          <MatchBadge match={intern.match} />
        </div>
      )}
 
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#0f0f0f",
              marginBottom: 2,
              fontFamily: "'Georgia', serif",
            }}
          >
            {intern.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {intern.company}
          </div>
        </div>
        {!grid && <MatchBadge match={intern.match} />}
      </div>
 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#6b7280",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          📍 {intern.location}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#6b7280",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          🕐 {intern.posted}
        </span>
        <TypeBadge type={intern.type} />
      </div>
 
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {intern.skills.map((s) => (
          <span
            key={s}
            style={{
              background: "#f3f4f6",
              color: "#374151",
              fontSize: 12,
              padding: "3px 9px",
              borderRadius: 6,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);