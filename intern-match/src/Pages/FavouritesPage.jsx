// src/Pages/FavouritesPage.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";
import { MatchBadge, TypeBadge } from "../Component/Shared/Badges";
import { Footer } from "../Component/Shared/Footer";

// ── Empty state ────────────────────────────────────────────────────────────────
const EmptyFavourites = ({ onBrowse }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="w-20 h-20 bg-red-50 dark:bg-red-900 rounded-full flex items-center justify-center mb-5">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
    <h2 className="text-xl font-extrabold text-[rgb(var(--color-text))] mb-2" style={{ fontFamily: "'Georgia', serif" }}>
      No saved internships yet
    </h2>
    <p className="text-sm text-[rgb(var(--color-muted))] max-w-xs mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>
      Tap the heart icon on any internship to save it here for later.
    </p>
    <button
      onClick={onBrowse}
      className="bg-green-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      Browse Internships
    </button>
  </motion.div>
);

// ── Favourite card ─────────────────────────────────────────────────────────────
const FavouriteCard = ({ intern, onRemove, onView }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    className="bg-[rgb(var(--color-bg))] rounded-2xl border border-[rgb(var(--color-border))] overflow-hidden hover:shadow-lg transition-shadow duration-200"
  >
    {/* Coloured top strip based on match */}
    <div className={`h-1.5 w-full ${
      intern.match >= 85 ? "bg-green-500" : intern.match >= 70 ? "bg-yellow-400" : "bg-gray-300"
    }`} />

    <div className="p-5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Company icon */}
          <div className="w-11 h-11 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[rgb(var(--color-text))] text-sm leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              {intern.title}
            </p>
            <p className="text-xs text-[rgb(var(--color-muted))] mt-0.5">{intern.company}</p>
          </div>
        </div>

        {/* Remove from saved */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(intern)}
          className="bg-transparent border-none cursor-pointer p-1 flex-shrink-0"
          title="Remove from saved"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <MatchBadge match={intern.match} />
        <TypeBadge type={intern.type} />
        <span className="text-xs bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))] px-2 py-0.5 rounded-full font-medium">
          {intern.category}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
          📍 {intern.location}
        </span>
        <span className="text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
          🕐 {intern.posted}
        </span>
      </div>

      {/* Skills */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {intern.skills.map((s) => (
          <span key={s} className="bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))] text-xs px-2 py-1 rounded-md" style={{ fontFamily: "system-ui, sans-serif" }}>
            {s}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-[rgb(var(--color-border))]">
        <button
          onClick={() => onView(intern.id)}
          className="flex-1 py-2.5 bg-green-900 text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          View Details
        </button>
        <button
          onClick={() => onView(intern.id)}
          className="px-4 py-2.5 border border-[rgb(var(--color-border))] text-[rgb(var(--color-text))] text-sm font-semibold rounded-xl hover:bg-[rgb(var(--color-surface))] transition-colors bg-[rgb(var(--color-bg))] cursor-pointer"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Apply →
        </button>
      </div>
    </div>
  </motion.div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
export const FavouritesPage = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();
  const { addToast } = useToast();

  const handleRemove = (intern) => {
    removeFavorite(intern.id);
    addToast(`Removed ${intern.title} from saved`, "error");
  };

  const handleView = (id) => {
    navigate(`/internships/${id}`);
  };

  const handleClearAll = () => {
    favorites.forEach((f) => removeFavorite(f.id));
    addToast("All saved internships cleared", "error");
  };

  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[rgb(var(--color-text))] tracking-tight mb-1">
              Saved Internships
            </h1>
            <p className="text-sm text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
              {favorites.length > 0
                ? `You have ${favorites.length} saved internship${favorites.length !== 1 ? "s" : ""}`
                : "Internships you save will appear here"}
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium bg-transparent border-none cursor-pointer transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Clear all
            </button>
          )}
        </div>

        {/* Stats bar */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              {
                label: "Total Saved",
                value: favorites.length,
                color: "text-[rgb(var(--color-text))]",
                bg: "bg-[rgb(var(--color-bg))]",
              },
              {
                label: "High Match (85%+)",
                value: favorites.filter((f) => f.match >= 85).length,
                color: "text-green-700",
                bg: "bg-green-50 dark:bg-green-900",
              },
              {
                label: "Remote Roles",
                value: favorites.filter((f) => f.type === "Remote").length,
                color: "text-blue-700",
                bg: "bg-blue-50 dark:bg-blue-900",
              },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 border border-[rgb(var(--color-border))] text-center`}>
                <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                <p className="text-xs text-[rgb(var(--color-muted))] mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Content */}
        {favorites.length === 0 ? (
          <EmptyFavourites onBrowse={() => navigate("/internships")} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {favorites.map((intern) => (
                <FavouriteCard
                  key={intern.id}
                  intern={intern}
                  onRemove={handleRemove}
                  onView={handleView}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};