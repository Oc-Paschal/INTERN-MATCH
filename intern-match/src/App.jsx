import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }          from "./context/AuthContext";
import { ToastProvider }         from "./context/ToastContext";
import { FavoritesProvider }     from "./context/FavoritesContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { ProtectedRoute }        from "./Component/ProtectedRoute";
import { Layout }                from "./Component/Layout";
import { HomePage }              from "./Pages/HomePage";
import { InternshipsPage }       from "./Pages/Internshipspage";
import { InternshipDetailPage }  from "./Pages/InternshipDetailPage";
import { ProfilePage }           from "./Pages/Profilepage";
import { TrackerPage }           from "./Pages/TrackerPage";
import { FavouritesPage }        from "./Pages/FavouritesPage";
import { OnboardingPage }        from "./Pages/OnboardingPage";
import { LoginPage }             from "./Pages/LoginPage";
import { RegisterPage }          from "./Pages/RegisterPage";
import { ForgotPasswordPage }    from "./Pages/ForgotPasswordPage";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <FavoritesProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/internships" element={<ProtectedRoute><InternshipsPage /></ProtectedRoute>} />
                  <Route path="/internships/:id" element={<ProtectedRoute><InternshipDetailPage /></ProtectedRoute>} />
                  <Route path="/saved" element={<ProtectedRoute><FavouritesPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/tracker" element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />
                </Route>
                <Route path="/login"      element={<LoginPage />} />
                <Route path="/register"   element={<RegisterPage />} />
                <Route path="/forgot"     element={<ForgotPasswordPage />} />
                <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
          </NotificationsProvider>
        </FavoritesProvider>
      </ToastProvider>
    </AuthProvider>
  );
}