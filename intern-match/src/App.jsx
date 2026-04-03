import { useState } from "react";
import { Nav } from "./Component/Nav";
import { HomePage } from "./Pages/HomePage";
import { InternshipsPage } from "./Pages/Internshipspage";
import { ProfilePage } from "./Pages/Profilepage";
 
export default function App() {
  const [page, setPage] = useState("home");
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav page={page} setPage={setPage} />
      {page === "home"        && <HomePage setPage={setPage} />}
      {page === "internships" && <InternshipsPage />}
      {page === "profile"     && <ProfilePage />}
    </div>
  );
}