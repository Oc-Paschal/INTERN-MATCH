import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProtectedRoute } from "./Component/ProtectedRoute";
import { Layout } from "./Component/Layout";
import { HomePage } from "./Pages/HomePage";
import { InternshipsPage } from "./Pages/Internshipspage";
import { ProfilePage } from "./Pages/Profilepage";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { ForgotPasswordPage } from "./Pages/ForgotPasswordPage";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              {/* Public pages with Nav */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/internships" element={<InternshipsPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* Auth pages without Nav */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot" element={<ForgotPasswordPage />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
