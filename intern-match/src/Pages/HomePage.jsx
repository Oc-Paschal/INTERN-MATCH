import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Component/Shared/Footer";

const useCountUp = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const StatCounter = ({ target, suffix, label }) => {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref}>
      <p className="text-2xl font-extrabold text-[rgb(var(--color-text))]">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p
        className="text-xs text-[rgb(var(--color-muted))] mt-0.5"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
};

const features = [
  {
    icon: "✦",
    title: "AI Smart Matching",
    desc: "Ooour algorithm matches you with internships based on skills, interests, and career goals with a personalized match score.",
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

export const HomePage = () => (
  <div style={{ fontFamily: "'Georgia', serif" }}>
    {/* ── Hero ── */}
    <section className="bg-linear-to-br from-green-50 via-emerald-50 to-[rgb(var(--color-bg))] dark:from-green-950 dark:via-emerald-950 dark:to-[rgb(var(--color-bg))] px-6 md:px-16 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[rgb(var(--color-bg))] border border-green-200 dark:border-green-800 rounded-full px-4 py-1.5 mb-7">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="2.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-semibold text-green-700">
            AI-Powered Internship Matching
          </span>
        </div>

        {/* Heading */}
        <div></div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[rgb(var(--color-text))] tracking-tight mb-5">
          Find Your Perfect <br />
          <span className="text-green-800 dark:text-green-400">Internship</span> Match in Nigeria
        </h1>

        <p
          className="text-base md:text-lg text-[rgb(var(--color-muted))] max-w-xl leading-relaxed mb-9 font-normal"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Smart matching connects Nigerian students with top internship
          opportunities based on your skills, interests, and career goals.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            to="/internships"
            className="bg-green-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors flex items-center gap-2 no-underline"
          >
            Browse Internships <span>→</span>
          </Link>
          <Link
            to="/profile"
            className="bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] font-semibold px-6 py-3 rounded-xl border-2 border-[rgb(var(--color-border))] hover:border-gray-300 transition-colors no-underline"
          >
            Create Your Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-10">
          <StatCounter target={5000} suffix="+" label="Students" />
          <StatCounter target={200} suffix="+" label="Companies" />
          <StatCounter target={92} suffix="%" label="Match Rate" />
        </div>
      </div>
    </section>

    {/* ── Why Section ── */}
    <section className="bg-[rgb(var(--color-bg))] px-6 md:px-16 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-[rgb(var(--color-text))] tracking-tight mb-3">
        Why InternMatch NG?
      </h2>
      <p
        className="text-[rgb(var(--color-muted))] mb-14"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Built for Nigerian students, powered by AI, designed for real-world
        impact.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-2xl p-6 text-left"
          >
            <div className="w-11 h-11 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center text-green-800 dark:text-green-300 text-xl mb-4">
              {f.icon}
            </div>
            <p className="font-bold text-[rgb(var(--color-text))] mb-2">{f.title}</p>
            <p
              className="text-sm text-[rgb(var(--color-muted))] leading-relaxed"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA Banner ── */}
    <section className="bg-linear-to-br from-green-900 to-green-950 px-6 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
        Ready to Land Your Dream Internship?
      </h2>
      <p
        className="text-green-300 mb-9"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        Join thousands of Nigerian students already finding their perfect match.
      </p>
      <Link
        to="/internships"
        className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors no-underline"
      >
        Get Started Free →
      </Link>
    </section>

    <Footer />
  </div>
);
