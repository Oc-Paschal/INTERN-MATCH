import { Footer } from "../Component/Shared/Footer";
 
const features = [
  {
    icon: "✦",
    title: "AI Smart Matching",
    desc: "Our algorithm matches you with internships based on skills, interests, and career goals with a personalized match score.",
  },
  {
    icon: "◎",
    title: "Skill-Based Profiles",
    desc: "Showcase your skills, upload your CV, link your GitHub, and let companies discover you based on real abilities.",
  },
  {
    icon: "▦",
    title: "Internship Tracker",
    desc: "Track applications, interview stages, and deadlines all in one dashboard. Never miss an opportunity.",
  },
  {
    icon: "◈",
    title: "Verified Companies",
    desc: "All companies are verified. Read reviews from past interns and make informed decisions about your future.",
  },
];
 
export const HomePage = ({ setPage }) => (
  <div style={{ fontFamily: "'Georgia', serif" }}>
 
    {/* ── Hero ── */}
    <section
      style={{
        background: "linear-gradient(135deg, #f0faf4 0%, #e8f5ee 50%, #f7fdf9 100%)",
        padding: "80px 40px 100px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "white",
          border: "1px solid #d1fae5",
          borderRadius: 20,
          padding: "6px 14px",
          marginBottom: 28,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a5c38" strokeWidth="2.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a5c38" }}>
          AI-Powered Internship Matching
        </span>
      </div>
 
      <h1
        style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 800,
          lineHeight: 1.1,
          margin: "0 0 20px",
          color: "#0f0f0f",
          letterSpacing: "-0.03em",
        }}
      >
        Find Your Perfect
        <br />
        <span style={{ color: "#1a5c38" }}>Internship</span> Match in Nigeria
      </h1>
 
      <p
        style={{
          fontSize: 17,
          color: "#4b5563",
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 36,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 400,
        }}
      >
        Smart matching connects Nigerian students with top internship opportunities
        based on your skills, interests, and career goals.
      </p>
 
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button
          onClick={() => setPage("internships")}
          style={{
            background: "#1a5c38",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "13px 26px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Georgia', serif",
          }}
        >
          Browse Internships <span>→</span>
        </button>
        <button
          onClick={() => setPage("profile")}
          style={{
            background: "white",
            color: "#1a1a1a",
            border: "2px solid #e5e7eb",
            borderRadius: 10,
            padding: "13px 26px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Georgia', serif",
          }}
        >
          Create Your Profile
        </button>
      </div>
 
      <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
        {[["5,000+", "Students"], ["200+", "Companies"], ["92%", "Match Rate"]].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0f0f0f" }}>{n}</div>
            <div style={{ fontSize: 13, color: "#6b7280", fontFamily: "system-ui, sans-serif" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
 
    {/* ── Why Section ── */}
    <section style={{ padding: "80px 40px", background: "white", textAlign: "center" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.02em" }}>
        Why InternMatch NG?
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#6b7280",
          marginBottom: 52,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Built for Nigerian students, powered by AI, designed for real-world impact.
      </p>
 
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              background: "#f9fafb",
              borderRadius: 14,
              padding: "28px 22px",
              textAlign: "left",
              border: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "#dcfce7",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#1a5c38",
                marginBottom: 16,
              }}
            >
              {f.icon}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 1.6,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
 
    {/* ── CTA ── */}
    <section
      style={{
        background: "linear-gradient(135deg, #1a5c38 0%, #0f3d25 100%)",
        padding: "80px 40px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "white",
          marginBottom: 12,
          letterSpacing: "-0.02em",
        }}
      >
        Ready to Land Your Dream Internship?
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#86efac",
          marginBottom: 36,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Join thousands of Nigerian students already finding their perfect match.
      </p>
      <button
        onClick={() => setPage("profile")}
        style={{
          background: "#f59e0b",
          color: "#0f0f0f",
          border: "none",
          borderRadius: 10,
          padding: "14px 30px",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "'Georgia', serif",
        }}
      >
        Get Started Free →
      </button>
    </section>
 
    <Footer />
  </div>
);