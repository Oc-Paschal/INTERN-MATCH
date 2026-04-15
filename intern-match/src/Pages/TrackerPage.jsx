import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../Component/Shared/Footer";
 
// ── Status config ──────────────────────────────────────────────────────────────
const STATUSES = [
  {
    id: "applied",
    label: "Applied",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-200",
    header: "bg-blue-50",
  },
  {
    id: "interview",
    label: "Interview",
    color: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-400",
    border: "border-yellow-200",
    header: "bg-yellow-50",
  },
  {
    id: "offer",
    label: "Offer",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    border: "border-green-200",
    header: "bg-green-50",
  },
  {
    id: "rejected",
    label: "Rejected",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-400",
    border: "border-red-200",
    header: "bg-red-50",
  },
];
 
// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLE = [
  { id: 1, title: "Frontend Developer Intern", company: "Paystack",    status: "applied",   date: "2026-03-10", location: "Lagos",   type: "Remote",  match: 92 },
  { id: 2, title: "Data Science Intern",        company: "Flutterwave", status: "interview", date: "2026-03-08", location: "Lagos",   type: "Hybrid",  match: 85 },
  { id: 3, title: "Product Design Intern",      company: "Andela",      status: "offer",     date: "2026-03-05", location: "Remote",  type: "Remote",  match: 78 },
  { id: 4, title: "Backend Engineer Intern",    company: "Kuda Bank",   status: "rejected",  date: "2026-03-01", location: "Lagos",   type: "On-site", match: 88 },
  { id: 5, title: "Mobile Developer Intern",    company: "Cowrywise",   status: "applied",   date: "2026-03-12", location: "Lagos",   type: "Remote",  match: 73 },
  { id: 6, title: "AI/ML Intern",               company: "Interswitch", status: "interview", date: "2026-03-09", location: "Lagos",   type: "Hybrid",  match: 65 },
];
 
// ── Add Application Modal ──────────────────────────────────────────────────────
const AddModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "", company: "", status: "applied",
    location: "", type: "Remote", date: new Date().toISOString().split("T")[0],
  });
 
  const inputClass = "w-full border border-[rgb(var(--color-border))] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]";
 
  const handleAdd = () => {
    if (!form.title.trim() || !form.company.trim()) return;
    onAdd({ ...form, id: Date.now(), match: null });
    onClose();
  };
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-[rgb(var(--color-bg))] rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-[rgb(var(--color-text))]" style={{ fontFamily: "'Georgia', serif" }}>
            Add Application
          </h2>
          <button onClick={onClose} className="text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-text))] bg-transparent border-none cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
 
        <div className="grid gap-3">
          <div>
            <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Role Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Frontend Developer Intern" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Company *</label>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Paystack" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }}>
                {["Remote", "Hybrid", "On-site"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Lagos" className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[rgb(var(--color-text))] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>Date Applied</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} style={{ fontFamily: "system-ui, sans-serif" }} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[rgb(var(--color-border))] rounded-xl text-sm font-semibold text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-surface))] transition-colors bg-[rgb(var(--color-bg))] cursor-pointer" style={{ fontFamily: "system-ui, sans-serif" }}>
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 py-2.5 bg-green-900 text-white rounded-xl text-sm font-bold hover:bg-green-800 transition-colors border-none cursor-pointer" style={{ fontFamily: "'Georgia', serif" }}>
            Add Application
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
 
// ── Status Badge ───────────────────────────────────────────────────────────────
const StatusBadge = ({ statusId }) => {
  const s = STATUSES.find((s) => s.id === statusId);
  if (!s) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
};
 
// ── Kanban Card ────────────────────────────────────────────────────────────────
const KanbanCard = ({ app, onStatusChange, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-[rgb(var(--color-bg))] rounded-xl p-4 border border-[rgb(var(--color-border))] shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Company icon + title */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[rgb(var(--color-text))] leading-tight" style={{ fontFamily: "'Georgia', serif" }}>{app.title}</p>
            <p className="text-xs text-[rgb(var(--color-muted))]">{app.company}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-text))] bg-transparent border-none cursor-pointer p-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] rounded-xl shadow-lg z-10 py-1 min-w-36">
              {STATUSES.filter((s) => s.id !== app.status).map((s) => (
                <button
                  key={s.id}
                  onClick={() => { onStatusChange(app.id, s.id); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-xs text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-surface))] bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Move to {s.label}
                </button>
              ))}
              <div className="border-t border-[rgb(var(--color-border))] mt-1 pt-1">
                <button
                  onClick={() => { onDelete(app.id); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>📍 {app.location}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          app.type === "Remote" ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
          : app.type === "Hybrid" ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
          : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
        }`}>{app.type}</span>
      </div>

      <p className="text-xs text-[rgb(var(--color-muted))] mt-2" style={{ fontFamily: "system-ui, sans-serif" }}>
        Applied {new Date(app.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </motion.div>
  );
};
 
// ── Kanban Board ───────────────────────────────────────────────────────────────
const KanbanBoard = ({ applications, onStatusChange, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {STATUSES.map((status) => {
      const cols = applications.filter((a) => a.status === status.id);
      return (
        <div key={status.id} className={`rounded-2xl border ${status.border} overflow-hidden`}>
          {/* Column header */}
          <div className={`${status.header} dark:${status.header} px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${status.dot}`} />
              <span className="text-sm font-bold text-[rgb(var(--color-text))]" style={{ fontFamily: "'Georgia', serif" }}>{status.label}</span>
            </div>
            <span className="text-xs font-bold text-[rgb(var(--color-muted))] bg-[rgb(var(--color-bg))] px-2 py-0.5 rounded-full">
              {cols.length}
            </span>
          </div>

          {/* Cards */}
          <div className="p-3 flex flex-col gap-3 min-h-32 bg-[rgb(var(--color-surface))]">
            <AnimatePresence>
              {cols.map((app) => (
                <KanbanCard key={app.id} app={app} onStatusChange={onStatusChange} onDelete={onDelete} />
              ))}
            </AnimatePresence>
            {cols.length === 0 && (
              <div className="flex items-center justify-center h-20 text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
                No applications
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
 
// ── Table View ─────────────────────────────────────────────────────────────────
const TableView = ({ applications, onStatusChange, onDelete }) => (
  <div className="bg-[rgb(var(--color-bg))] rounded-2xl border border-[rgb(var(--color-border))] overflow-hidden">
    {/* Table header */}
    <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[rgb(var(--color-surface))] border-b border-[rgb(var(--color-border))]">
      {["Role", "Company", "Status", "Location", "Type", "Date", ""].map((h, i) => (
        <div
          key={i}
          className={`text-xs font-bold text-[rgb(var(--color-muted))] uppercase tracking-wide ${
            i === 0 ? "col-span-3" : i === 1 ? "col-span-2" : i === 6 ? "col-span-1 text-right" : "col-span-1"
          }`}
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {h}
        </div>
      ))}
    </div>

    {/* Rows */}
    <AnimatePresence>
      {applications.map((app) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-surface))] transition-colors items-center"
        >
          {/* Role */}
          <div className="col-span-3">
            <p className="text-sm font-bold text-[rgb(var(--color-text))]" style={{ fontFamily: "'Georgia', serif" }}>{app.title}</p>
          </div>
          {/* Company */}
          <div className="col-span-2">
            <p className="text-sm text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>{app.company}</p>
          </div>
          {/* Status */}
          <div className="col-span-2">
            <select
              value={app.status}
              onChange={(e) => onStatusChange(app.id, e.target.value)}
              className="text-xs border border-[rgb(var(--color-border))] rounded-lg px-2 py-1.5 outline-none focus:border-green-600 bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] cursor-pointer"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          {/* Location */}
          <div className="col-span-1">
            <p className="text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>{app.location || "—"}</p>
          </div>
          {/* Type */}
          <div className="col-span-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              app.type === "Remote" ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
              : app.type === "Hybrid" ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
            }`}>{app.type}</span>
          </div>
          {/* Date */}
          <div className="col-span-2">
            <p className="text-xs text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
              {new Date(app.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
          {/* Delete */}
          <div className="col-span-1 flex justify-end">
            <button
              onClick={() => onDelete(app.id)}
              className="text-[rgb(var(--color-muted))] hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer p-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>

    {applications.length === 0 && (
      <div className="py-16 text-center text-[rgb(var(--color-muted))]" style={{ fontFamily: "system-ui, sans-serif" }}>
        No applications yet. Click "Add Application" to get started.
      </div>
    )}
  </div>
);
 
// ── Main Page ──────────────────────────────────────────────────────────────────
export const TrackerPage = () => {
  const [applications, setApplications] = useState(SAMPLE);
  const [viewMode, setViewMode]         = useState("kanban");
  const [showModal, setShowModal]       = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
 
  const handleAdd = (app) => {
    setApplications((prev) => [app, ...prev]);
  };
 
  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };
 
  const handleDelete = (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };
 
  const filtered = filterStatus === "all"
    ? applications
    : applications.filter((a) => a.status === filterStatus);
 
  // Stats
  const stats = STATUSES.map((s) => ({
    ...s,
    count: applications.filter((a) => a.status === s.id).length,
  }));
 
  return (
    <div className="bg-[rgb(var(--color-surface))] min-h-screen" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[rgb(var(--color-text))] tracking-tight mb-1">
              Application Tracker
            </h1>
            <p className="text-[rgb(var(--color-muted))] text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
              Track all your internship applications in one place
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-900 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-800 transition-colors border-none cursor-pointer"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Application
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ y: -2 }}
              onClick={() => setFilterStatus(filterStatus === s.id ? "all" : s.id)}
              className={`bg-[rgb(var(--color-bg))] rounded-2xl p-4 border-2 cursor-pointer transition-all ${
                filterStatus === s.id ? `${s.border} shadow-md` : "border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border))]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <span className="text-2xl font-extrabold text-[rgb(var(--color-text))]">{s.count}</span>
              </div>
              <p className="text-sm font-semibold text-[rgb(var(--color-muted))]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* View toggle + filter */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                filterStatus === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-[rgb(var(--color-bg))] text-[rgb(var(--color-muted))] border-[rgb(var(--color-border))] hover:border-gray-300"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              All ({applications.length})
            </button>
            {STATUSES.map((s) => (
              <button
                key={s.id}
                onClick={() => setFilterStatus(filterStatus === s.id ? "all" : s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  filterStatus === s.id
                    ? `${s.color} ${s.border}`
                    : "bg-[rgb(var(--color-bg))] text-[rgb(var(--color-muted))] border-[rgb(var(--color-border))] hover:border-gray-300"
                }`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex">
            {[["kanban", "⊞ Board"], ["table", "☰ Table"]].map(([m, l]) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-4 py-2 text-xs font-semibold border border-[rgb(var(--color-border))] transition-colors cursor-pointer ${
                  viewMode === m ? "bg-gray-900 text-white" : "bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-surface))]"
                } ${m === "kanban" ? "rounded-l-lg" : "rounded-r-lg"}`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
 
        {/* Views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === "kanban" ? (
              <KanbanBoard
                applications={filtered}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ) : (
              <TableView
                applications={filtered}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
 
      {/* Add modal */}
      <AnimatePresence>
        {showModal && (
          <AddModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
        )}
      </AnimatePresence>
 
      <Footer />
    </div>
  );
};
