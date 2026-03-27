import { useState } from "react";
import { Nav } from "../src/Component/Nav";
import { HomePage } from "../src/Pages/HomePage"
import { InternshipsPage } from "../src/Pages/Internshipspage";
import { ProfilePage } from "../src/Pages/Profilepage";
 
export default function App() {
  const [page, setPage] = useState("home");
  const isMobile = window.innerWidth < 768;
 
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Nav page={page} setPage={setPage} mobile={isMobile} />
      {page === "home"        && <HomePage setPage={setPage} />}
      {page === "internships" && <InternshipsPage />}
      {page === "profile"     && <ProfilePage />}
    </div>
  );
}
 