import { useState } from "react";
 
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
 
const COURSES = [
  "", "Computer Science", "Software Engineering", "Statistics",
  "Electrical Engineering", "Civil Engineering", "Accounting",
  "Marketing", "Fine Arts", "Business Administration", "Economics",
];
 
export const RegisterPage = ({ setPage }) => {
  const [step, setStep]         = useState(1); // 2-step form
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [form, setForm]         = useState({
    fullName:  "",
    email:     "",
    password:  "",
    confirm:   "",
    course:    "",
    location:  "",
    agreed:    false,
  });
 
  const handleChange = (e) => {
    setError("");
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };
 
  // Step 1 validation
  const validateStep1 = () => {
    if (!form.fullName.trim())        return "Please enter your full name.";
    if (!form.email.includes("@"))    return "Please enter a valid email address.";
    if (form.password.length < 6)     return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };
 
  // Step 2 validation
  const validateStep2 = () => {
    if (!form.course)           return "Please select your course of study.";
    if (!form.location.trim())  return "Please enter your preferred location.";
    if (!form.agreed)           return "You must agree to the terms to continue.";
    return null;
  };
 
  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    setStep(2);
  };
 
  const handleSubmit = () => {
    const err = validateStep2();
    if (err) { setError(err); return; }
    setLoading(true);
    // Simulate registration — replace with your real API call
    setTimeout(() => {
      setLoading(false);
      setPage("profile"); // redirect to profile after signup
    }, 1500);
  };
 
  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white";
 
  // Password strength
  const strength =
    form.password.length === 0 ? 0
    : form.password.length < 6  ? 1
    : form.password.length < 10 ? 2
    : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"];
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
 
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <Logo />
 
          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Create your account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
            Join 5,000+ Nigerian students finding internships
          </p>
 
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-7">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  step >= s ? "bg-green-900 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? "text-green-900" : "text-gray-400"}`} style={{ fontFamily: "system-ui, sans-serif" }}>
                  {s === 1 ? "Account" : "Profile"}
                </span>
                {s === 1 && <div className={`flex-1 h-px ${step > 1 ? "bg-green-900" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
 
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5" style={{ fontFamily: "system-ui, sans-serif" }}>
              {error}
            </div>
          )}
 
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="grid gap-4">
              {/* Full name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Adebayo Ogunlesi"
                  className={inputClass}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
 
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
 
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className={`${inputClass} pr-11`}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                  >
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
                {/* Password strength bar */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${strength >= s ? strengthColor[strength] : "bg-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Strength: <span className={`font-semibold ${strength === 1 ? "text-red-500" : strength === 2 ? "text-yellow-500" : "text-green-600"}`}>{strengthLabel[strength]}</span>
                    </p>
                  </div>
                )}
              </div>
 
              {/* Confirm password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`${inputClass} ${form.confirm && form.confirm !== form.password ? "border-red-300 focus:border-red-400" : form.confirm && form.confirm === form.password ? "border-green-400" : ""}`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
                {form.confirm && form.confirm === form.password && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    Passwords match
                  </p>
                )}
              </div>
 
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-green-900 text-white font-bold text-sm hover:bg-green-800 transition-colors border-none cursor-pointer mt-1"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Continue →
              </button>
            </div>
          )}
 
          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="grid gap-4">
              {/* Course */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Course of Study</label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <option value="">Select your course...</option>
                  {COURSES.filter(Boolean).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
 
              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Preferred Location</label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <option value="">Select a location...</option>
                  {["Lagos", "Abuja", "Port Harcourt", "Remote", "Ibadan", "Kano", "Enugu"].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
 
              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={form.agreed}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-green-800 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                  I agree to the{" "}
                  <span className="text-green-700 font-semibold cursor-pointer hover:text-green-900">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-green-700 font-semibold cursor-pointer hover:text-green-900">Privacy Policy</span>
                </span>
              </label>
 
              <div className="flex gap-3 mt-1">
                <button
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-1 py-3.5 rounded-xl text-white font-bold text-sm transition-all border-none cursor-pointer ${
                    loading ? "bg-green-700 opacity-70 cursor-not-allowed" : "bg-green-900 hover:bg-green-800"
                  }`}
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Creating...
                    </span>
                  ) : "Create Account"}
                </button>
              </div>
            </div>
          )}
 
          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>or sign up with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
 
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
 
          {/* Switch to login */}
          <p className="text-center text-sm text-gray-500 mt-6" style={{ fontFamily: "system-ui, sans-serif" }}>
            Already have an account?{" "}
            <button
              onClick={() => setPage("login")}
              className="text-green-700 font-semibold hover:text-green-900 bg-transparent border-none cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
 
        {/* Back to home */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mx-auto mt-5 bg-transparent border-none cursor-pointer"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to home
        </button>
      </div>
    </div>
  );
};