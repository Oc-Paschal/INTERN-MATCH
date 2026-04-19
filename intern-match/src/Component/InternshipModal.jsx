import { motion, AnimatePresence } from "framer-motion";
import { MatchBadge, TypeBadge } from "./Shared/Badges";

export const InternshipModal = ({ intern, onClose }) => {
  if (!intern) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-br from-green-900 to-green-800 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border-none cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="absolute -bottom-8 left-6">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="16" />
                  <line x1="10" y1="14" x2="14" y2="14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-12 px-6 pb-6">
            {/* Title & Company */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                {intern.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{intern.company}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <MatchBadge match={intern.match} />
              <TypeBadge type={intern.type} />
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                {intern.category}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Location</p>
                  <p className="text-sm font-medium dark:text-gray-200">{intern.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Posted</p>
                  <p className="text-sm font-medium dark:text-gray-200">{intern.posted}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Match Score</p>
                  <p className="text-sm font-medium dark:text-gray-200">{intern.match}% match based on your profile</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {intern.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 text-xs font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                This is an exciting internship opportunity at {intern.company}. You'll work on real projects 
                alongside experienced engineers, gain hands-on experience, and build your professional network. 
                Great learning opportunity for students looking to kickstart their career in tech.
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" className="mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Currently enrolled in a relevant degree program
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" className="mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Passionate about learning and growth
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" className="mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Good communication skills
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-green-900 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer">
                Apply Now
              </button>
              <button className="px-4 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};