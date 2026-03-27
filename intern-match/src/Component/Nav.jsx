import { useState } from "react";
import { Logo } from "./shared/Logo";
 
export const Nav = ({ page, setPage, mobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const navLinks = [
    ["home", "Home"],
    ["internships", "Internships"],
    ["profile", "My Profile"],
  ];
 
  if (mobile) {
    return (
      <nav
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setPage("home")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Logo size={28} />
        </button>
 
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
 
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              borderBottom: "1px solid #e5e7eb",
              padding: "8px 0",
              zIndex: 100,
            }}
          >
            {navLinks.map(([p, l]) => (
              <button
                key={p}
                onClick={() => { setPage(p); setMenuOpen(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: page === p ? 700 : 400,
                  color: page === p ? "#1a5c38" : "#374151",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 14,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>
    );
  }
 
  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <button
        onClick={() => setPage("home")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <Logo size={30} />
      </button>
 
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {navLinks.map(([p, l]) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: page === p ? "#1a5c38" : "#6b7280",
              borderBottom: page === p ? "2px solid #1a5c38" : "2px solid transparent",
              paddingBottom: 2,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {l}
          </button>
        ))}
      </div>
 
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
            color: "#374151",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => setPage("profile")}
          style={{
            background: "#1a5c38",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};
