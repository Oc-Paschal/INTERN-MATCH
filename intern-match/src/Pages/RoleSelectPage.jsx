// src/Pages/RoleSelectPage.jsx
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => (
  <div className="flex items-center gap-2 justify-center mb-10">
    <div className="w-9 h-9 bg-green-900 rounded-lg flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    </div>
    <span className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
      InternMatch NG
    </span>
  </div>
);

const roles = [
  {
    id: "student",
    label: "I'm a Student",
    desc: "Find and apply for internships that match your skills and goals.",
    emoji: "🎓",
    bg: "from-green-50 to-emerald-50",
    border: "border-green-200",
    hover: "hover:border-green-500 hover:shadow-green-100",
    loginPath: "/login?role=student",
    registerPath: "/register?role=student",
  },
  {
    id: "employer",
    label: "I'm an Employer",
    desc: "Post internship roles and find the best Nigerian student talent.",
    emoji: "🏢",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    hover: "hover:border-blue-400 hover:shadow-blue-100",
    loginPath: "/login?role=employer",
    registerPath: "/employer/register",
  },
];

export const RoleSelectPage = ({ mode = "login" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <Logo />

          <h1
            className="text-2xl font-extrabold text-gray-900 text-center mb-2 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {mode === "login" ? "Welcome back!" : "Join InternMatch NG"}
          </h1>
          <p
            className="text-sm text-gray-500 text-center mb-8"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {mode === "login" ? "How would you like to sign in?" : "Who are you signing up as?"}
          </p>

          <div className="grid gap-4">
            {roles.map((role, i) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  navigate(mode === "login" ? role.loginPath : role.registerPath)
                }
                className={`w-full bg-gradient-to-br ${role.bg} border-2 ${role.border} ${role.hover} rounded-2xl p-5 text-left cursor-pointer transition-all shadow-sm hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{role.emoji}</div>
                  <div className="flex-1">
                    <p
                      className="font-extrabold text-gray-900 text-base mb-1"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {role.label}
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {role.desc}
                    </p>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>

          <p
            className="text-center text-sm text-gray-500 mt-7"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={mode === "login" ? "/role-select?mode=register" : "/role-select?mode=login"}
              className="text-green-700 font-semibold hover:text-green-900 no-underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mx-auto mt-5 no-underline"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
};