import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }           from "./context/AuthContext";
import { ToastProvider }          from "./context/ToastContext";
import { FavoritesProvider }      from "./context/FavoritesContext";
import { ProtectedRoute }         from "./Component/ProtectedRoute";
import { Layout }                 from "./Component/Layout";
import { HomePage }               from "./Pages/HomePage";
import { InternshipsPage }        from "./Pages/Internshipspage";
import { InternshipDetailPage }   from "./Pages/InternshipDetailPage";
import { ProfilePage }            from "./Pages/Profilepage";
import { TrackerPage }            from "./Pages/TrackerPage";
import { LoginPage }              from "./Pages/LoginPage";
import { RegisterPage }           from "./Pages/RegisterPage";
import { ForgotPasswordPage }     from "./Pages/ForgotPasswordPage";
 
export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
 
              {/* ── Pages WITH Nav ── */}
              <Route element={<Layout />}>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
 
                {/* Protected */}
                <Route path="/internships" element={
                  <ProtectedRoute><InternshipsPage /></ProtectedRoute>
                } />
                <Route path="/internships/:id" element={
                  <ProtectedRoute><InternshipDetailPage /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute><ProfilePage /></ProtectedRoute>
                } />
                <Route path="/tracker" element={
                  <ProtectedRoute><TrackerPage /></ProtectedRoute>
                } />
              </Route>
 
              {/* ── Auth pages WITHOUT Nav ── */}
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot"   element={<ForgotPasswordPage />} />
 
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </ToastProvider>
    </AuthProvider>
  );
}