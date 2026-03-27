import { useState } from "react";
import mapPinsData from "../data/Mappins.json";
 
export const MapView = () => {
  const [activePin, setActivePin] = useState(3); // index 3 is active by default
 
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 420,
        background: "#e8f0e8",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* SVG fake map background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 700 450"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect width="700" height="450" fill="#e8f0e8" />
        {/* Water */}
        <ellipse cx="350" cy="420" rx="200" ry="60" fill="#b3d9f0" opacity="0.6" />
        <path
          d="M0 350 Q100 320 200 340 Q300 360 400 350 Q500 340 600 360 Q650 370 700 380 L700 450 L0 450Z"
          fill="#b3d9f0"
          opacity="0.5"
        />
        {/* Land shapes */}
        <path
          d="M50 50 Q200 20 400 60 Q550 90 680 50 L700 200 Q600 180 500 200 Q400 220 300 200 Q200 180 100 200 Q50 210 0 180Z"
          fill="#d4e8d4"
        />
        <path
          d="M0 200 Q100 180 200 200 Q350 230 500 200 Q600 180 700 200 L700 350 Q600 330 500 350 Q400 370 300 350 Q200 330 100 350 Q50 360 0 340Z"
          fill="#c8e0c8"
        />
        {/* Roads */}
        <path d="M300 0 Q320 100 340 200 Q360 300 380 450" stroke="#d0ddd0" strokeWidth="2" fill="none" />
        <path d="M0 250 Q200 240 400 260 Q600 280 700 260" stroke="#d0ddd0" strokeWidth="1.5" fill="none" />
        {/* Attribution */}
        <text x="10" y="20" fontSize="10" fill="#9bb09b" fontFamily="sans-serif">
          © OpenStreetMap
        </text>
        {/* Zoom controls */}
        <rect x="10" y="30" width="30" height="60" rx="6" fill="white" stroke="#ccc" strokeWidth="1" />
        <text x="25" y="53" fontSize="16" fill="#555" textAnchor="middle" fontFamily="sans-serif">+</text>
        <line x1="14" y1="60" x2="36" y2="60" stroke="#ccc" strokeWidth="1" />
        <text x="25" y="80" fontSize="16" fill="#555" textAnchor="middle" fontFamily="sans-serif">−</text>
      </svg>
 
      {/* Map pins */}
      {mapPinsData.map((pin, i) => {
        const isActive = activePin === i;
        const pct = pin.match / 100;
        const color = pct >= 0.8 ? "#22c55e" : pct >= 0.6 ? "#f59e0b" : "#94a3b8";
 
        return (
          <div
            key={i}
            onClick={() => setActivePin(isActive ? null : i)}
            style={{
              position: "absolute",
              left: `${(pin.x / 700) * 100}%`,
              top: `${(pin.y / 450) * 100}%`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              zIndex: isActive ? 20 : 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: color,
                border: "3px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            >
              {pin.match}
            </div>
 
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  left: "110%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "white",
                  borderRadius: 10,
                  padding: "12px 14px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  minWidth: 200,
                  zIndex: 30,
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setActivePin(null); }}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#9ca3af",
                  }}
                >
                  ×
                </button>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, fontFamily: "'Georgia', serif" }}>
                  {pin.title}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2, fontFamily: "system-ui, sans-serif" }}>
                  {pin.company}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "system-ui, sans-serif" }}>
                  📍 {pin.city}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color, marginTop: 6 }}>
                  Match: {pin.match}%
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};