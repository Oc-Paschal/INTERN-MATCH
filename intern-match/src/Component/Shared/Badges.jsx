export const MatchBadge = ({ match }) => {
  const color =
    match >= 85
      ? "bg-green-100 text-green-600"
      : match >= 70
      ? "bg-yellow-100 text-yellow-600"
      : "bg-gray-100 text-gray-400";
 
  return (
    <span className={`${color} text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap`}>
      {match}% Match
    </span>
  );
};
 
export const TypeBadge = ({ type }) => {
  const color =
    type === "Remote"
      ? "bg-green-100 text-green-700"
      : type === "Hybrid"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
 
  return (
    <span className={`${color} text-xs font-semibold px-3 py-1 rounded-full`}>
      {type}
    </span>
  );
};
