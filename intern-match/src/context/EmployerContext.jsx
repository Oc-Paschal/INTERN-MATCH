// src/context/EmployerContext.jsx
import { createContext, useContext, useState } from "react";

const EmployerContext = createContext(null);

// Sample posted jobs with applicants
const SAMPLE_JOBS = [
  {
    id: 101,
    title: "Frontend Developer Intern",
    category: "Engineering",
    location: "Lagos",
    type: "Remote",
    duration: "3 months",
    stipend: "₦80,000/month",
    slots: 3,
    deadline: "2026-04-30",
    posted: "2d ago",
    skills: ["React", "TypeScript", "CSS"],
    description: "Join our engineering team to build user interfaces.",
    status: "active",
    applicants: [
      { id: 1, name: "Adebayo Ogunlesi",  email: "adebayo@email.com",  course: "Computer Science",      match: 92, status: "pending",  appliedDate: "2026-03-15", skills: ["React", "TypeScript", "Node.js"] },
      { id: 2, name: "Chioma Eze",         email: "chioma@email.com",   course: "Software Engineering",  match: 88, status: "accepted", appliedDate: "2026-03-14", skills: ["React", "CSS", "JavaScript"] },
      { id: 3, name: "Emeka Nwosu",        email: "emeka@email.com",    course: "Computer Science",      match: 75, status: "rejected", appliedDate: "2026-03-13", skills: ["Vue.js", "CSS"] },
      { id: 4, name: "Fatima Aliyu",       email: "fatima@email.com",   course: "Information Technology",match: 80, status: "pending",  appliedDate: "2026-03-12", skills: ["React", "TypeScript"] },
    ],
  },
  {
    id: 102,
    title: "Data Science Intern",
    category: "Data",
    location: "Lagos",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₦100,000/month",
    slots: 2,
    deadline: "2026-05-10",
    posted: "3d ago",
    skills: ["Python", "Pandas", "SQL"],
    description: "Work with our data team to extract business insights.",
    status: "active",
    applicants: [
      { id: 5, name: "Tunde Bakare",       email: "tunde@email.com",    course: "Statistics",            match: 90, status: "pending",  appliedDate: "2026-03-16", skills: ["Python", "SQL", "Pandas"] },
      { id: 6, name: "Ngozi Obi",          email: "ngozi@email.com",    course: "Computer Science",      match: 72, status: "pending",  appliedDate: "2026-03-15", skills: ["Python", "R"] },
    ],
  },
  {
    id: 103,
    title: "Product Design Intern",
    category: "Design",
    location: "Remote",
    type: "Remote",
    duration: "3 months",
    stipend: "₦75,000/month",
    slots: 1,
    deadline: "2026-04-20",
    posted: "5d ago",
    skills: ["Figma", "UI/UX", "Prototyping"],
    description: "Design beautiful interfaces for our products.",
    status: "closed",
    applicants: [
      { id: 7, name: "Blessing Okoro",     email: "blessing@email.com", course: "Fine Arts",             match: 85, status: "accepted", appliedDate: "2026-03-10", skills: ["Figma", "UI/UX", "Adobe XD"] },
      { id: 8, name: "Samuel Adeyemi",     email: "samuel@email.com",   course: "Computer Science",      match: 65, status: "rejected", appliedDate: "2026-03-09", skills: ["Figma"] },
    ],
  },
];

export const EmployerProvider = ({ children }) => {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      posted: "Just now",
      status: "active",
      applicants: [],
    };
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = (id, updates) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const updateApplicantStatus = (jobId, applicantId, status) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              applicants: j.applicants.map((a) =>
                a.id === applicantId ? { ...a, status } : a
              ),
            }
          : j
      )
    );
  };

  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicants.length, 0);
  const activeJobs      = jobs.filter((j) => j.status === "active").length;
  const pendingReviews  = jobs.reduce((sum, j) => sum + j.applicants.filter((a) => a.status === "pending").length, 0);
  const acceptedCount   = jobs.reduce((sum, j) => sum + j.applicants.filter((a) => a.status === "accepted").length, 0);

  return (
    <EmployerContext.Provider value={{
      jobs, addJob, updateJob, deleteJob, updateApplicantStatus,
      totalApplicants, activeJobs, pendingReviews, acceptedCount,
    }}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => {
  const ctx = useContext(EmployerContext);
  if (!ctx) throw new Error("useEmployer must be used inside EmployerProvider");
  return ctx;
};