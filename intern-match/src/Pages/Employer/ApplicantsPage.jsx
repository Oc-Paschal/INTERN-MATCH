// src/Pages/Employer/ApplicantsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEmployer } from "../../context/EmployerContext";
import { useToast } from "../../context/ToastContext";

const STATUS_CONFIG = {
  pending:  { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending"  },
  accepted: { bg: "bg-green-100",  text: "text-green-700",  label: "Accepted" },
  rejected: { bg: "bg-red-100",    text: "text-red-600",    label: "Rejected" },
};

const ApplicantCard = ({ applicant, onAccept, onReject }) => {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_CONFIG[applicant.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      {/* Main row */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {applicant.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>{applicant.name}</p>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`} style={{ fontFamily: "system-ui, sans-serif" }}>
              {s.label}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              applicant.match >= 85 ? "bg-green-100 text-green-700"
              : applicant.match >= 70 ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-500"
            }`} style={{ fontFamily: "system-ui, sans-serif" }}>
              {applicant.match}% Match
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
            {applicant.email} · {applicant.course}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <p className="text-xs text-gray-400" style={{ fontFamily: "system-ui, sans-serif" }}>
            Applied {applicant.appliedDate}
          </p>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100"
          >
            <div className="p-5">
              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>Skills</p>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((s) => (
                    <span key={s} className="bg-green-50 text-green-800 border border-green-200 text-xs font-semibold px-3 py-1 rounded-full" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match score bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>Profile Match</p>
                  <p className="text-xs font-bold text-gray-700">{applicant.match}%</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${applicant.match}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      applicant.match >= 85 ? "bg-green-500"
                      : applicant.match >= 70 ? "bg-yellow-400"
                      : "bg-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* Action buttons */}
              {applicant.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => onAccept(applicant.id)}
                    className="flex-1 py-2.5 bg-green-900 text-white font-bold text-sm rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Accept
                  </button>
                  <button
                    onClick={() => onReject(applicant.id)}
                    className="flex-1 py-2.5 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors border border-red-200 cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Reject
                  </button>
                </div>
              )}

              {applicant.status === "accepted" && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-sm font-semibold text-green-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Accepted — an offer email has been sent
                  </p>
                </div>
              )}

              {applicant.status === "rejected" && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <p className="text-sm font-semibold text-red-600" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Application rejected
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────
export const ApplicantsPage = () => {
  const { jobId }    = useParams();
  const navigate     = useNavigate();
  const { jobs, updateApplicantStatus } = useEmployer();
  const { addToast } = useToast();
  const [filter, setFilter] = useState("all");

  const job = jobs.find((j) => j.id === parseInt(jobId));

  if (!job) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>Job not found</p>
      <button onClick={() => navigate("/employer/jobs")} className="text-green-700 font-semibold bg-transparent border-none cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
        ← Back to Jobs
      </button>
    </div>
  );

  const handleAccept = (applicantId) => {
    updateApplicantStatus(job.id, applicantId, "accepted");
    addToast("Applicant accepted! 🎉", "success");
  };

  const handleReject = (applicantId) => {
    updateApplicantStatus(job.id, applicantId, "rejected");
    addToast("Applicant rejected", "error");
  };

  const filtered = filter === "all"
    ? job.applicants
    : job.applicants.filter((a) => a.status === filter);

  const counts = {
    all:      job.applicants.length,
    pending:  job.applicants.filter((a) => a.status === "pending").length,
    accepted: job.applicants.filter((a) => a.status === "accepted").length,
    rejected: job.applicants.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Back button */}
      <button
        onClick={() => navigate("/employer/jobs")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm bg-transparent border-none cursor-pointer mb-6"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Jobs
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">{job.title}</h1>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
          📍 {job.location} · {job.type} · {job.applicants.length} applicant{job.applicants.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { key: "all",      label: "Total",    color: "text-gray-900" },
          { key: "pending",  label: "Pending",  color: "text-yellow-600" },
          { key: "accepted", label: "Accepted", color: "text-green-600" },
          { key: "rejected", label: "Rejected", color: "text-red-500" },
        ].map(({ key, label, color }) => (
          <div key={key} className="bg-white rounded-xl p-4 border border-gray-200 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter(key)}>
            <p className={`text-2xl font-extrabold ${color}`}>{counts[key]}</p>
            <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["all", "pending", "accepted", "rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer capitalize ${
              filter === f ? "bg-green-900 text-white border-green-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Applicants list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 border border-dashed border-gray-200 text-center">
          <p className="text-gray-400 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>No applicants in this category</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};