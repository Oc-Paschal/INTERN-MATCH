const Logo = ({ size = 32 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div
      style={{
        width: size,
        height: size,
        background: "#1a5c38",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    </div>
    <span
      style={{
        fontFamily: "'Georgia', serif",
        fontWeight: 700,
        fontSize: size * 0.55,
        color: "#1a1a1a",
        letterSpacing: "-0.02em",
      }}
    >
      InternMatch NG
    </span>
  </div>
);
 
export const Footer = () => (
  <footer
    style={{
      background: "white",
      borderTop: "1px solid #e5e7eb",
      padding: "24px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <Logo size={24} />
    <p
      style={{
        fontSize: 13,
        color: "#9ca3af",
        fontFamily: "system-ui, sans-serif",
        margin: 0,
      }}
    >
      © 2026 InternMatch NG. Built for Nigerian students.
    </p>
  </footer>
);
 
