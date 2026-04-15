const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 bg-green-900 rounded-lg flex items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    </div>
    <span className="text-sm font-bold text-[rgb(var(--color-text))] tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
      InternMatch NG
    </span>
  </div>
);
 
export const Footer = () => (
  <footer className="bg-[rgb(var(--color-bg))] border-t border-[rgb(var(--color-border))] py-6 flex flex-col items-center gap-1 mt-10">
    <Logo />
    <p className="text-xs text-[rgb(var(--color-muted))]">© 2026 InternMatch NG. Built for Nigerian students.</p>
  </footer>
);
