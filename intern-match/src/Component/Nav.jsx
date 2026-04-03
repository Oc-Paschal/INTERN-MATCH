import { useState } from "react";
import { Logo } from "./Shared/Logo";
 
const navLinks = [
  ["home", "Home"],
  ["internships", "Internships"],
  ["profile", "My Profile"],
];
 
export const Nav = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-10 h-16">
        <button onClick={() => setPage("home")} className="bg-transparent border-none cursor-pointer p-0">
          <Logo size="md" />
        </button>
 
        <div className="flex items-center gap-8">
          {navLinks.map(([p, l]) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`bg-transparent border-none cursor-pointer text-sm font-medium pb-0.5 ${
                page === p
                  ? "text-green-900 border-b-2 border-green-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
 
        <div className="flex items-center gap-3">
          <button className="bg-transparent border-none cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign In
          </button>
          <button
            onClick={() => setPage("profile")}
            className="bg-green-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
 
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <button onClick={() => setPage("home")} className="bg-transparent border-none cursor-pointer p-0">
          <Logo size="sm" />
        </button>
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
 
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white py-2">
          {navLinks.map(([p, l]) => (
            <button
              key={p}
              onClick={() => { setPage(p); setMenuOpen(false); }}
              className={`block w-full text-left px-5 py-3 text-sm bg-transparent border-none cursor-pointer ${
                page === p ? "font-bold text-green-900" : "font-normal text-gray-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
