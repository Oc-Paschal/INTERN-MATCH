import { motion } from "framer-motion";
import { CompanyIcon } from "./Shared/CompanyIcon";
import { MatchBadge, TypeBadge } from "./Shared/Badges";
import { useFavorites } from "../context/FavoritesContext";

export const InternshipCard = ({ intern, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(intern.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(intern);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CompanyIcon />
          <MatchBadge match={intern.match} />
        </div>
        <button
          onClick={handleFavorite}
          className="bg-transparent border-none cursor-pointer p-1"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={favorited ? "#dc2626" : "none"}
            stroke={favorited ? "#dc2626" : "#9ca3af"}
            strokeWidth="2"
            whileTap={{ scale: 1.2 }}
            animate={favorited ? { scale: [1, 1.2, 1] } : {}}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        </button>
      </div>

      <div>
        <p className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Georgia', serif" }}>
          {intern.title}
        </p>
        <p className="text-sm text-gray-500 mt-0.5">{intern.company}</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-gray-500">📍 {intern.location}</span>
        <span className="text-xs text-gray-500">🕐 {intern.posted}</span>
        <TypeBadge type={intern.type} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {intern.skills.map((s) => (
          <span key={s} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
};