import { useState } from "react";
import { Nav }                from "./Component/Nav";
import { HomePage }           from "./Pages/HomePage";
import { InternshipsPage }    from "./Pages/InternshipsPage";
import { ProfilePage }        from "./Pages/ProfilePage";
import { LoginPage }          from "./Pages/LoginPage";
import { RegisterPage }       from "./Pages/RegisterPage";
import { ForgotPasswordPage } from "./Pages/ForgotPasswordPage";
 
// Pages that should NOT show the Nav bar
const AUTH_PAGES = ["login", "register", "forgot"];
 
export default function App() {
  const [page, setPage] = useState("home");
 
  return (
    <div className="min-h-screen bg-gray-50">
      {!AUTH_PAGES.includes(page) && (
        <Nav page={page} setPage={setPage} />
      )}
      {page === "home"        && <HomePage        setPage={setPage} />}
      {page === "internships" && <InternshipsPage setPage={setPage} />}
      {page === "profile"     && <ProfilePage     setPage={setPage} />}
      {page === "login"       && <LoginPage       setPage={setPage} />}
      {page === "register"    && <RegisterPage    setPage={setPage} />}
      {page === "forgot"      && <ForgotPasswordPage setPage={setPage} />}
    </div>
  );
}
 