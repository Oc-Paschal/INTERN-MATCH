export const Logo = ({ size = "md" }) => {
  const sizes = {
    sm: { box: "w-6 h-6", text: "text-sm", svg: 14 },
    md: { box: "w-8 h-8", text: "text-base", svg: 18 },
    lg: { box: "w-10 h-10", text: "text-lg", svg: 22 },
  };
  const s = sizes[size] || sizes.md;
 
  return (
    <div className="flex items-center gap-2">
      <div className={`${s.box} bg-green-900 dark:bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <svg width={s.svg} height={s.svg} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      </div>
      <span
        className={`${s.text} font-bold text-gray-900 dark:text-white tracking-tight`}
        style={{ fontFamily: "'Georgia', serif" }}
      >
        InternMatch NG
      </span>
    </div>
  );
};
 
