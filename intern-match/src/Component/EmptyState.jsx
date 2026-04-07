import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="mb-6"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Background circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            stroke="#e5e7eb"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Search icon - magnifying glass */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Glass circle */}
            <motion.circle
              cx="52"
              cy="52"
              r="20"
              stroke="#9ca3af"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            {/* Handle */}
            <motion.line
              x1="66"
              y1="66"
              x2="82"
              y2="82"
              stroke="#9ca3af"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
          </motion.g>

          {/* X mark - appears when no results */}
          <motion.path
            d="M40 40 L80 80 M80 40 L40 80"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />

          {/* Small floating dots */}
          <motion.circle
            cx="25"
            cy="35"
            r="4"
            fill="#d1d5db"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <motion.circle
            cx="95"
            cy="45"
            r="3"
            fill="#d1d5db"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
          />
          <motion.circle
            cx="90"
            cy="90"
            r="3"
            fill="#d1d5db"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
          No Internships Found
        </h3>
        <p className="text-gray-500 text-sm max-w-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
          We couldn't find any internships matching your criteria. Try adjusting your filters or check back later.
        </p>
      </motion.div>

      {/* Reset button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2.5 bg-green-900 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-colors border-none cursor-pointer"
        onClick={() => window.location.reload()}
      >
        Clear Filters
      </motion.button>
    </div>
  );
};