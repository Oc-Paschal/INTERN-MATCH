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
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-white px-6 md:px-16 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-1.5 mb-7">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-semibold text-green-700">AI-Powered Internship Matching</span>
        </div>
 
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight mb-5">
          Find Your Perfect <br />
          <span className="text-green-800">Internship</span> Match in Nigeria
        </h1>
 
        <p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed mb-9 font-normal" style={{ fontFamily: "system-ui, sans-serif" }}>
          Smart matching connects Nigerian students with top internship opportunities
          based on your skills, interests, and career goals.
        </p>
 
        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setPage("internships")}
            className="bg-green-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center gap-2"
          >
            Browse Internships <span>→</span>
          </button>
          <button
            onClick={() => setPage("profile")}
            className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            Create Your Profile
          </button>
        </div>
 
        {/* Stats */}
        <div className="flex gap-10">
          {[["5,000+", "Students"], ["200+", "Companies"], ["92%", "Match Rate"]].map(([n, l]) => (
            <div key={l}>
              <p className="text-xl font-extrabold text-gray-900">{n}</p>
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
 
    {/* ── Why Section ── */}
    <section className="bg-white px-6 md:px-16 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Why InternMatch NG?</h2>
      <p className="text-gray-500 mb-14" style={{ fontFamily: "system-ui, sans-serif" }}>
        Built for Nigerian students, powered by AI, designed for real-world impact.
      </p>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left">
            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-green-800 text-xl mb-4">
              {f.icon}
            </div>
            <p className="font-bold text-gray-900 mb-2">{f.title}</p>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
 
    {/* ── CTA Banner ── */}
    <section className="bg-gradient-to-br from-green-900 to-green-950 px-6 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
        Ready to Land Your Dream Internship?
      </h2>
      <p className="text-green-300 mb-9" style={{ fontFamily: "system-ui, sans-serif" }}>
        Join thousands of Nigerian students already finding their perfect match.
      </p>
      <button
        onClick={() => setPage("profile")}
        className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors"
      >
        Get Started Free →
      </button>
    </section>
 
    <Footer />
  </div>
);
