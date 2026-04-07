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
 
export const ForgotPasswordPage = ({ setPage }) => {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
 
  const handleSubmit = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // Simulate sending reset email — replace with your real API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <Logo />
 
          {!sent ? (
            <>
              {/* Lock icon */}
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
 
              <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-2 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Forgot password?
              </h1>
              <p className="text-sm text-gray-500 text-center mb-7" style={{ fontFamily: "system-ui, sans-serif" }}>
                No worries! Enter your email and we'll send you a reset link.
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
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  />
                </div>
 
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all border-none cursor-pointer ${
                    loading ? "bg-green-700 opacity-70 cursor-not-allowed" : "bg-green-900 hover:bg-green-800"
                  }`}
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Reset Link"}
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                Check your email
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                We sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>.
                Check your inbox and follow the instructions.
              </p>
              <button
                onClick={() => setPage("login")}
                className="w-full py-3.5 rounded-xl bg-green-900 text-white font-bold text-sm hover:bg-green-800 transition-colors border-none cursor-pointer"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Back to Sign In
              </button>
              <p className="text-xs text-gray-400 mt-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                Didn't receive it?{" "}
                <button
                  onClick={() => { setSent(false); setEmail(""); }}
                  className="text-green-700 font-semibold hover:text-green-900 bg-transparent border-none cursor-pointer"
                >
                  Try again
                </button>
              </p>
            </div>
          )}
 
          {!sent && (
            <button
              onClick={() => setPage("login")}
              className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 w-full mt-5 bg-transparent border-none cursor-pointer"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};