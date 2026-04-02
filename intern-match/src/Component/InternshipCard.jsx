import { CompanyIcon } from "./shared/CompanyIcon";
import { MatchBadge, TypeBadge } from "./shared/Badges";
 
export const InternshipCard = ({ intern }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col gap-3">
    {/* Top row */}
    <div className="flex items-center gap-3">
      <CompanyIcon />
      <MatchBadge match={intern.match} />
    </div>
 
    {/* Title & company */}
    <div>
      <p className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Georgia', serif" }}>
        {intern.title}
      </p>
      <p className="text-sm text-gray-500 mt-0.5">{intern.company}</p>
    </div>
 
    {/* Meta row */}
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-gray-500">📍 {intern.location}</span>
      <span className="text-xs text-gray-500">🕐 {intern.posted}</span>
      <TypeBadge type={intern.type} />
    </div>
 
    {/* Skills */}
    <div className="flex gap-2 flex-wrap">
      {intern.skills.map((s) => (
        <span key={s} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
          {s}
        </span>
      ))}
    </div>
  </div>
);
 