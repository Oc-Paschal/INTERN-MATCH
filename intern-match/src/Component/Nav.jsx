import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Shared/Logo";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const navLinks = [
  ["/", "Home"],
  ["/internships", "Internships"],
  ["/profile", "My Profile"],
];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { addToast } = useToast();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-center justify-between px-10 h-16">
        <Link to="/" className="bg-transparent border-none cursor-pointer p-0">
          <Logo size="md" />
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`bg-transparent border-none cursor-pointer text-sm font-medium pb-0.5 transition-colors ${isActive(path)
                ? "text-green-900 border-b-2 border-green-900"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.fullName || user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-transparent border-none cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition-colors border-none cursor-pointer"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <Link to="/" className="bg-transparent border-none cursor-pointer p-0">
          <Logo size="sm" />
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-transparent border-none cursor-pointer p-1"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white py-2">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block w-full text-left px-5 py-3 text-sm bg-transparent border-none cursor-pointer ${isActive(path) ? "font-bold text-green-900" : "font-normal text-gray-700"
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth links in mobile menu */}
          <div className="border-t border-gray-100 mt-2 pt-2 px-4">
            {user ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors text-center no-underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-2.5 text-sm font-semibold text-white bg-green-900 border-none rounded-lg cursor-pointer hover:bg-green-800 transition-colors text-center no-underline"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};