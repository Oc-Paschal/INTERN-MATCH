// src/Component/EmployerNav.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useEmployer } from "../context/EmployerContext";

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-bold text-gray-900 leading-none" style={{ fontFamily: "'Georgia', serif" }}>InternMatch NG</p>
      <p className="text-xs text-blue-600 font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}>Employer</p>
    </div>
  </div>
);

const navLinks = [
  { path: "/employer/dashboard",  label: "Dashboard",    icon: "⊞" },
  { path: "/employer/jobs",       label: "My Jobs",      icon: "📋" },
  { path: "/employer/post-job",   label: "Post a Job",   icon: "+" },
];

export const EmployerNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location    = useLocation();
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const { pendingReviews } = useEmployer();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between px-10 h-16">
        <Link to="/employer/dashboard" className="no-underline">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {navLinks.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors no-underline ${
                isActive(path)
                  ? "bg-green-50 text-green-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } ${path === "/employer/post-job" ? "bg-green-900 text-white hover:bg-green-800 ml-2" : ""}`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span>{icon}</span>
              {label}
              {path === "/employer/jobs" && pendingReviews > 0 && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {pendingReviews}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {(user?.companyName || user?.name || "E").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none" style={{ fontFamily: "'Georgia', serif" }}>
              {user?.companyName || user?.name}
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Employer</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer ml-2"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <Link to="/employer/dashboard" className="no-underline"><Logo /></Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-transparent border-none cursor-pointer p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white py-2">
          {navLinks.map(({ path, label, icon }) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)}
              className={`block px-5 py-3 text-sm no-underline ${isActive(path) ? "font-bold text-green-900" : "text-gray-700"}`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {icon} {label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 px-4">
            <button onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="w-full py-2.5 text-sm font-semibold text-red-600 bg-transparent border-none cursor-pointer text-left"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};