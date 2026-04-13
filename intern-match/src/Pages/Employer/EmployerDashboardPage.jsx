// src/Pages/Employer/EmployerDashboardPage.jsx
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useEmployer } from "../../context/EmployerContext";

const StatusBadge = ({ status }) => {
  const s = {
    active:  "bg-green-100 text-green-700",
    closed:  "bg-gray-100 text-gray-500",
    draft:   "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s[status] || s.draft}`} style={{ fontFamily: "system-ui, sans-serif" }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ApplicantStatusBadge = ({ status }) => {
  const s = {
    pending:  "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s[status]}`} style={{ fontFamily: "system-ui, sans-serif" }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const EmployerDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs, totalApplicants, activeJobs, pendingReviews, acceptedCount } = useEmployer();

  // Recent applicants across all jobs
  const recentApplicants = jobs
    .flatMap((j) => j.applicants.map((a) => ({ ...a, jobTitle: j.title, jobId: j.id })))
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Welcome, {user?.companyName || user?.name} 👋
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            Here's an overview of your internship postings
          </p>
        </div>
        <Link
          to="/employer/post-job"
          className="flex items-center gap-2 bg-green-900 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-colors no-underline"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Post a Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Jobs",       value: activeJobs,      color: "text-green-700",  bg: "bg-green-50",  border: "border-green-100" },
          { label: "Total Applicants",  value: totalApplicants, color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-100" },
          { label: "Pending Reviews",   value: pendingReviews,  color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-100" },
          { label: "Accepted Interns",  value: acceptedCount,   color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-100" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${s.bg} border ${s.border} rounded-2xl p-5`}
          >
            <p className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-xs text-gray-500 font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Posted Jobs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-gray-900">Your Job Postings</h2>
            <Link to="/employer/jobs" className="text-sm text-green-700 font-semibold hover:text-green-900 no-underline" style={{ fontFamily: "system-ui, sans-serif" }}>
              View all →
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {jobs.slice(0, 3).map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/employer/jobs/${job.id}/applicants`)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{job.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                      📍 {job.location} · {job.type} · Posted {job.posted}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {job.skills.slice(0, 3).map((s) => (
                      <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md" style={{ fontFamily: "system-ui, sans-serif" }}>{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <span>👥 {job.applicants.length} applicant{job.applicants.length !== 1 ? "s" : ""}</span>
                    {job.applicants.filter((a) => a.status === "pending").length > 0 && (
                      <span className="bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
                        {job.applicants.filter((a) => a.status === "pending").length} pending
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {jobs.length === 0 && (
              <div className="bg-white rounded-2xl p-10 border border-dashed border-gray-200 text-center">
                <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>No jobs posted yet</p>
                <Link to="/employer/post-job" className="text-green-700 font-semibold text-sm hover:text-green-900 no-underline" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Post your first job →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applicants */}
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Recent Applicants</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {recentApplicants.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                No applicants yet
              </div>
            ) : (
              recentApplicants.map((a, i) => (
                <div key={a.id} className={`flex items-center gap-3 px-4 py-3 ${i < recentApplicants.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50 transition-colors cursor-pointer`}
                  onClick={() => navigate(`/employer/jobs/${a.jobId}/applicants`)}
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {a.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate" style={{ fontFamily: "'Georgia', serif" }}>{a.name}</p>
                    <p className="text-xs text-gray-500 truncate" style={{ fontFamily: "system-ui, sans-serif" }}>{a.jobTitle}</p>
                  </div>
                  <ApplicantStatusBadge status={a.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};