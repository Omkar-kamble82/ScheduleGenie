import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Notfound from "./pages/Notfound";
import Createtrip from "./pages/Createtrip";

function App() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (location.pathname === "/") {
        navigate("/trips");
      }
    });
  
    return () => unsubscribe();
  }, [auth, navigate]);
  
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trip/generate" element={<Createtrip />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
