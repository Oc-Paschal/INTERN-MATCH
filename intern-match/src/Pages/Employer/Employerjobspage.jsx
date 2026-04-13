// src/Pages/Employer/EmployerJobsPage.jsx
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEmployer } from "../../context/EmployerContext";
import { useToast } from "../../context/ToastContext";

const StatusBadge = ({ status }) => {
  const s = {
    active: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-500",
    draft:  "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s[status] || s.draft}`} style={{ fontFamily: "system-ui, sans-serif" }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const EmployerJobsPage = () => {
  const navigate = useNavigate();
  const { jobs, deleteJob, updateJob } = useEmployer();
  const { addToast } = useToast();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  const handleDelete = (id) => {
    deleteJob(id);
    addToast("Job deleted", "error");
  };

  const handleToggleStatus = (job) => {
    const newStatus = job.status === "active" ? "closed" : "active";
    updateJob(job.id, { status: newStatus });
    addToast(`Job ${newStatus === "active" ? "reopened" : "closed"}`, "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">My Job Postings</h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
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

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[["all","All"],["active","Active"],["closed","Closed"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
              filter === val ? "bg-green-900 text-white border-green-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {label} ({val === "all" ? jobs.length : jobs.filter((j) => j.status === val).length})
          </button>
        ))}
      </div>

      {/* Jobs list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 border border-dashed border-gray-200 text-center">
          <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>No jobs found</p>
          <Link to="/employer/post-job" className="text-green-700 font-semibold text-sm hover:text-green-900 no-underline" style={{ fontFamily: "system-ui, sans-serif" }}>
            Post your first job →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {filtered.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-extrabold text-gray-900 text-base">{job.title}</h3>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                      <span>📍 {job.location}</span>
                      <span>🕐 {job.type}</span>
                      <span>⏱ {job.duration}</span>
                      {job.stipend && <span>💰 {job.stipend}</span>}
                      <span>Posted {job.posted}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {job.skills.map((s) => (
                        <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md" style={{ fontFamily: "system-ui, sans-serif" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-gray-900">{job.applicants.length}</p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Applicants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-yellow-600">
                        {job.applicants.filter((a) => a.status === "pending").length}
                      </p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-green-600">
                        {job.applicants.filter((a) => a.status === "accepted").length}
                      </p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>Accepted</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/employer/jobs/${job.id}/applicants`)}
                    className="flex-1 py-2 bg-green-900 text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    View Applicants ({job.applicants.length})
                  </button>
                  <button
                    onClick={() => handleToggleStatus(job)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {job.status === "active" ? "Close" : "Reopen"}
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};