// src/Pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Logo = () => (
  <div className="flex items-center gap-2 justify-center mb-8">
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

export const LoginPage = () => {
  const navigate              = useNavigate();
  const location              = useLocation();
  const { login }             = useAuth();
  const { addToast }          = useToast();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Get role from query param — defaults to student
  const params  = new URLSearchParams(location.search);
  const role    = params.get("role") || "student";
  const isEmployer = role === "employer";

  const from = location.state?.from?.pathname || (isEmployer ? "/employer/dashboard" : "/");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (!form.email.includes("@"))     { setError("Please enter a valid email address."); return; }
    if (form.password.length < 6)      { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    setTimeout(() => {
      login({
        email:    form.email,
        name:     form.email.split("@")[0],
        role,                            // ← saves role to user object
      });
      setLoading(false);
      addToast("Welcome back!", "success");
      navigate(isEmployer ? "/employer/dashboard" : from, { replace: true });
    }, 1500);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <Logo />

          {/* Role badge */}
          <div className="flex justify-center mb-4">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              isEmployer
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`} style={{ fontFamily: "system-ui, sans-serif" }}>
              {isEmployer ? "🏢 Signing in as Employer" : "🎓 Signing in as Student"}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8" style={{ fontFamily: "system-ui, sans-serif" }}>
            {isEmployer
              ? "Sign in to manage your internship postings"
              : "Sign in to find your perfect internship match"}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5" style={{ fontFamily: "system-ui, sans-serif" }}>
              {error}
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                Email Address
              </label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com"
                className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Password
                </label>
                <button
                  onClick={() => navigate("/forgot")}
                  className="text-xs text-green-700 font-medium hover:text-green-900 bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-11`} style={{ fontFamily: "system-ui, sans-serif" }}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer">
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit} disabled={loading}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all border-none cursor-pointer mt-1 ${
                loading ? "bg-green-700 opacity-70 cursor-not-allowed" : "bg-green-900 hover:bg-green-800"
              }`}
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6" style={{ fontFamily: "system-ui, sans-serif" }}>
            Don't have an account?{" "}
            <Link
              to={isEmployer ? "/employer/register" : "/register"}
              className="text-green-700 font-semibold hover:text-green-900 no-underline"
            >
              Create one free
            </Link>
          </p>

          {/* Switch role */}
          <p className="text-center text-xs text-gray-400 mt-3" style={{ fontFamily: "system-ui, sans-serif" }}>
            <button
              onClick={() => navigate("/role-select")}
              className="text-green-600 hover:text-green-800 bg-transparent border-none cursor-pointer font-medium"
            >
              ← Switch role
            </button>
          </p>
        </div>

        <Link to="/" className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mx-auto mt-5 no-underline" style={{ fontFamily: "system-ui, sans-serif" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
};