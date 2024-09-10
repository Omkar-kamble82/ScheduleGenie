import { Route, Routes, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Schedules from "./pages/Schedules";
import Notfound from "./pages/Notfound";
import CreateSchedule from "./pages/CreateSchedule";
import ScheduleInfo from "./pages/ScheduleInfo";

function App() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (location.pathname === "/") {
        navigate("/schedules");
      }
    });
  
    return () => unsubscribe();
  }, [auth, navigate]);
  
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/schedule/generate" element={<CreateSchedule />} />
        <Route path="/schedule/:id" element={<ScheduleInfo />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
