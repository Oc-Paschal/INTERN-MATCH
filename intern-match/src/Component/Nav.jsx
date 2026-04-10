// src/Component/Nav.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Shared/Logo";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useFavorites } from "../context/FavoritesContext";

const navLinks = [
  ["/",            "Home"],
  ["/internships", "Internships"],
  ["/tracker",     "My Applications"],
  ["/profile",     "My Profile"],
];

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const { favorites } = useFavorites();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-center justify-between px-10 h-16">
        <Link to="/" className="p-0 no-underline">
          <Logo size="md" />
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium pb-0.5 transition-colors no-underline ${
                isActive(path)
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
              {/* Saved heart icon with badge */}
              <Link
                to="/saved"
                className="relative p-2 text-gray-500 hover:text-red-500 transition-colors no-underline"
                title="Saved internships"
              >
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill={isActive("/saved") ? "#dc2626" : "none"}
                  stroke={isActive("/saved") ? "#dc2626" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                    {favorites.length > 9 ? "9+" : favorites.length}
                  </span>
                )}
              </Link>

              {/* Avatar with initials */}
              <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(user.fullName || user.name || "U").charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                {user.fullName || user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors no-underline"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition-colors no-underline"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <Link to="/" className="p-0 no-underline">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          {/* Saved icon on mobile */}
          {user && (
            <Link to="/saved" className="relative p-1.5 text-gray-500 hover:text-red-500 no-underline">
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={isActive("/saved") ? "#dc2626" : "none"}
                stroke={isActive("/saved") ? "#dc2626" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none cursor-pointer p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white py-2">
          {navLinks.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block w-full text-left px-5 py-3 text-sm no-underline ${
                isActive(path) ? "font-bold text-green-900" : "font-normal text-gray-700"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/saved"
            onClick={() => setMenuOpen(false)}
            className={`block w-full text-left px-5 py-3 text-sm no-underline flex items-center gap-2 ${
              isActive("/saved") ? "font-bold text-red-600" : "font-normal text-gray-700"
            }`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Saved
            {favorites.length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          <div className="border-t border-gray-100 mt-2 pt-2 px-4">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Hi, {user.fullName || user.name}
                </span>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-sm font-semibold text-red-600 bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg bg-white text-center no-underline hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 py-2.5 text-sm font-semibold text-white bg-green-900 border-none rounded-lg text-center no-underline hover:bg-green-800 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
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