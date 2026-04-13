// src/Component/Nav.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Shared/Logo";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNotifications } from "../context/NotificationsContext";

const navLinks = [
  ["/",            "Home"],
  ["/internships", "Internships"],
  ["/tracker",     "My Applications"],
  ["/profile",     "My Profile"],
];

// ── Notification icon by type ──────────────────────────────────────────────────
const NotifIcon = ({ type }) => {
  const configs = {
    match: { bg: "bg-green-100", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )},
    deadline: { bg: "bg-yellow-100", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )},
    tip: { bg: "bg-blue-100", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )},
  };
  const c = configs[type] || configs.tip;
  return (
    <div className={`w-8 h-8 ${c.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
      {c.icon}
    </div>
  );
};

// ── Notifications dropdown ─────────────────────────────────────────────────────
const NotificationsDropdown = ({ onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const navigate = useNavigate();

  const handleClick = (notif) => {
    markAsRead(notif.id);
    onClose();
    navigate(notif.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="bg-green-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-green-700 font-semibold hover:text-green-900 bg-transparent border-none cursor-pointer"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
              You're all caught up!
            </p>
            <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
              No new notifications
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => handleClick(notif)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent border-none ${
                  !notif.read ? "bg-green-50/50" : ""
                }`}
              >
                <NotifIcon type={notif.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-xs font-bold ${!notif.read ? "text-gray-900" : "text-gray-600"}`}
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p
                    className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {notif.time}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

// ── Main Nav ───────────────────────────────────────────────────────────────────
export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef                 = useRef(null);
  const location                = useLocation();
  const { user, logout }        = useAuth();
  const { addToast }            = useToast();
  const { favorites }           = useFavorites();
  const { unreadCount }         = useNotifications();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
  };

  // Close bell when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
              {/* ── Bell ── */}
              <div className="relative" ref={bellRef}>
                <button
                  onClick={() => setBellOpen(!bellOpen)}
                  className="relative p-2 text-gray-500 hover:text-green-900 transition-colors bg-transparent border-none cursor-pointer"
                  title="Notifications"
                >
                  <motion.svg
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </motion.svg>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-700 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none"
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                  )}
                </button>
                <AnimatePresence>
                  {bellOpen && (
                    <NotificationsDropdown onClose={() => setBellOpen(false)} />
                  )}
                </AnimatePresence>
              </div>

              {/* ── Heart / Saved ── */}
              <Link
                to="/saved"
                className="relative p-2 text-gray-500 hover:text-red-500 transition-colors no-underline"
                title="Saved internships"
              >
                <svg
                  width="20" height="20" viewBox="0 0 24 24"
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

              {/* ── Avatar ── */}
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
        <div className="flex items-center gap-1">
          {user && (
            <>
              {/* Bell on mobile */}
              <div className="relative" ref={bellRef}>
                <button
                  onClick={() => setBellOpen(!bellOpen)}
                  className="relative p-1.5 text-gray-500 hover:text-green-900 bg-transparent border-none cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {bellOpen && (
                    <NotificationsDropdown onClose={() => setBellOpen(false)} />
                  )}
                </AnimatePresence>
              </div>

              {/* Heart on mobile */}
              <Link to="/saved" className="relative p-1.5 text-gray-500 hover:text-red-500 no-underline">
                <svg
                  width="20" height="20" viewBox="0 0 24 24"
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
            </>
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
            className={`flex items-center gap-2 w-full px-5 py-3 text-sm no-underline ${
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