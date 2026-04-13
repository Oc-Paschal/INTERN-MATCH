// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }          from "./context/AuthContext";
import { ToastProvider }         from "./context/ToastContext";
import { FavoritesProvider }     from "./context/FavoritesContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { EmployerProvider }      from "./context/EmployerContext";

// Layouts & route guards
import { ProtectedRoute }   from "./Component/ProtectedRoute";
import { Layout }           from "./Component/Layout";
import { EmployerLayout }   from "./Component/EmployerLayout";

// Student pages
import { HomePage }             from "./Pages/HomePage";
import { InternshipsPage }      from "./Pages/Internshipspage";
import { InternshipDetailPage } from "./Pages/InternshipDetailPage";
import { ProfilePage }          from "./Pages/Profilepage";
import { TrackerPage }          from "./Pages/TrackerPage";
import { FavouritesPage }       from "./Pages/FavouritesPage";
import { OnboardingPage }       from "./Pages/OnboardingPage";

// Auth pages
import { RoleSelectPage }      from "./Pages/RoleSelectPage";
import { LoginPage }           from "./Pages/LoginPage";
import { RegisterPage }        from "./Pages/RegisterPage";
import { ForgotPasswordPage }  from "./Pages/ForgotPasswordPage";

// Employer pages
import { EmployerRegisterPage }  from "./Pages/Employer/EmployerRegisterPage";
import { EmployerDashboardPage } from "./Pages/Employer/EmployerDashboardPage";
import { EmployerJobsPage }      from "./Pages/Employer/Employerjobspage";
import { PostJobPage }           from "./Pages/Employer/PostJobPage";
import { ApplicantsPage }        from "./Pages/Employer/ApplicantsPage";

// ── Role-select wrapper components ────────────────────────────────────────────
const RoleSelectLogin    = () => <RoleSelectPage mode="login" />;
const RoleSelectRegister = () => <RoleSelectPage mode="register" />;

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <FavoritesProvider>
          <NotificationsProvider>
            <EmployerProvider>
              <BrowserRouter>
                <Routes>

                  {/* ── Student pages WITH Nav ── */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/internships" element={
                      <ProtectedRoute><InternshipsPage /></ProtectedRoute>
                    } />
                    <Route path="/internships/:id" element={
                      <ProtectedRoute><InternshipDetailPage /></ProtectedRoute>
                    } />
                    <Route path="/saved" element={
                      <ProtectedRoute><FavouritesPage /></ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute><ProfilePage /></ProtectedRoute>
                    } />
                    <Route path="/tracker" element={
                      <ProtectedRoute><TrackerPage /></ProtectedRoute>
                    } />
                  </Route>

                  {/* ── Employer pages WITH EmployerNav ── */}
                  <Route element={<EmployerLayout />}>
                    <Route path="/employer/dashboard"              element={<EmployerDashboardPage />} />
                    <Route path="/employer/jobs"                   element={<EmployerJobsPage />} />
                    <Route path="/employer/post-job"               element={<PostJobPage />} />
                    <Route path="/employer/jobs/:jobId/applicants" element={<ApplicantsPage />} />
                  </Route>

                  {/* ── Auth pages WITHOUT Nav ── */}
                  <Route path="/role-select"      element={<RoleSelectLogin />} />
                  <Route path="/role-select/register" element={<RoleSelectRegister />} />
                  <Route path="/login"            element={<LoginPage />} />
                  <Route path="/register"         element={<RegisterPage />} />
                  <Route path="/employer/register" element={<EmployerRegisterPage />} />
                  <Route path="/forgot"           element={<ForgotPasswordPage />} />
                  <Route path="/onboarding"       element={
                    <ProtectedRoute><OnboardingPage /></ProtectedRoute>
                  } />

                </Routes>
              </BrowserRouter>
            </EmployerProvider>
          </NotificationsProvider>
        </FavoritesProvider>
      </ToastProvider>
    </AuthProvider>
  );
}