// src/Pages/Employer/EmployerRegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

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

const INDUSTRIES = [
  "Fintech", "E-commerce", "Banking", "Telecommunications",
  "Healthcare", "Education", "Media", "Logistics", "Energy",
  "Consulting", "Technology", "Other",
];

const COMPANY_SIZES = [
  "1–10 employees", "11–50 employees", "51–200 employees",
  "201–500 employees", "500–1,000 employees", "1,000+ employees",
];

export const EmployerRegisterPage = () => {
  const navigate     = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();
  const [step, setStep]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [form, setForm]     = useState({
    companyName: "", email: "", password: "", confirm: "",
    industry: "", size: "", website: "", location: "", agreed: false,
  });

  const inputClass = "w-full border border-gray-200 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white";

  const handleChange = (e) => {
    setError("");
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const validateStep1 = () => {
    if (!form.companyName.trim()) return "Please enter your company name.";
    if (!form.email.includes("@")) return "Please enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const validateStep2 = () => {
    if (!form.industry) return "Please select your industry.";
    if (!form.size) return "Please select your company size.";
    if (!form.location.trim()) return "Please enter your company location.";
    if (!form.agreed) return "You must agree to the terms to continue.";
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
    setTimeout(() => {
      register({
        companyName: form.companyName,
        email:       form.email,
        industry:    form.industry,
        size:        form.size,
        website:     form.website,
        location:    form.location,
        role:        "employer",          // ← marks as employer
        name:        form.companyName,
      });
      setLoading(false);
      addToast("Company account created! Welcome to InternMatch NG.", "success");
      navigate("/employer/dashboard");
    }, 1500);
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <Logo />

          <div className="flex justify-center mb-4">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700" style={{ fontFamily: "system-ui, sans-serif" }}>
              🏢 Employer Account
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Create company account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
            Start finding top Nigerian student talent
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
                  {s === 1 ? "Account" : "Company"}
                </span>
                {s === 1 && <div className={`flex-1 h-px ${step > 1 ? "bg-green-900" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5" style={{ fontFamily: "system-ui, sans-serif" }}>
              {error}
            </div>
          )}

          {/* ── Step 1 ── */}
          {step === 1 && (
            <div className="grid gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Company Name</label>
                <input type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="e.g. Paystack" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Work Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="hr@company.com" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
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
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Confirm Password</label>
                <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Repeat password"
                  className={`${inputClass} ${form.confirm && form.confirm !== form.password ? "border-red-300" : form.confirm && form.confirm === form.password ? "border-green-400" : ""}`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
              <button onClick={handleNext} className="w-full py-3.5 rounded-xl bg-green-900 text-white font-bold text-sm hover:bg-green-800 transition-colors border-none cursor-pointer mt-1" style={{ fontFamily: "'Georgia', serif" }}>
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div className="grid gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Industry</label>
                <select name="industry" value={form.industry} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Company Size</label>
                <select name="size" value={form.size} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                  <option value="">Select company size...</option>
                  {COMPANY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Location</label>
                <select name="location" value={form.location} onChange={handleChange} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                  <option value="">Select location...</option>
                  {["Lagos", "Abuja", "Port Harcourt", "Remote", "Ibadan", "Kano", "Enugu"].map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Website <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" name="website" value={form.website} onChange={handleChange} placeholder="https://yourcompany.com" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-green-800 cursor-pointer flex-shrink-0" />
                <span className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                  I agree to the <span className="text-green-700 font-semibold">Terms of Service</span> and <span className="text-green-700 font-semibold">Privacy Policy</span>
                </span>
              </label>
              <div className="flex gap-3 mt-1">
                <button onClick={() => { setStep(1); setError(""); }} className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 bg-white cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
                  ← Back
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className={`flex-1 py-3.5 rounded-xl text-white font-bold text-sm border-none cursor-pointer ${loading ? "bg-green-700 opacity-70" : "bg-green-900 hover:bg-green-800"}`}
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

          <p className="text-center text-sm text-gray-500 mt-6" style={{ fontFamily: "system-ui, sans-serif" }}>
            Already have an account?{" "}
            <Link to="/login?role=employer" className="text-green-700 font-semibold hover:text-green-900 no-underline">Sign in</Link>
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