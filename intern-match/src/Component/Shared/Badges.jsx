export const MatchBadge = ({ match }) => {
  const color =
    match >= 85 ? "#22c55e" : match >= 70 ? "#f59e0b" : "#94a3b8";
  const bg =
    match >= 85 ? "#dcfce7" : match >= 70 ? "#fef3c7" : "#f1f5f9";
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {match}% Match
    </span>
  );
};
 
export const TypeBadge = ({ type }) => {
  const styles = {
    Remote:   { bg: "#dcfce7", color: "#15803d" },
    Hybrid:   { bg: "#fef3c7", color: "#92400e" },
    "On-site":{ bg: "#fee2e2", color: "#991b1b" },
  };
  const s = styles[type] || styles.Hybrid;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 20,
      }}
    >
      {type}
    </span>
  );
};
 