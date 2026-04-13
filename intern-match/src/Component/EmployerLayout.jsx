// src/Component/EmployerLayout.jsx
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EmployerNav } from "./EmployerNav";

export const EmployerLayout = () => {
  const { user } = useAuth();

  // If not logged in, redirect to employer login
  if (!user) return <Navigate to="/login?role=employer" replace />;

  // If logged in as student, redirect to student home
  if (user.role !== "employer") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployerNav />
      <Outlet />
    </div>
  );
};