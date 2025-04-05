import { Suspense, useEffect, useState } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import ChamberDetail from "./pages/ChamberDetail";
import routes from "tempo-routes";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const [startX, setStartX] = useState(0);

  // Handle swipe navigation
  const handleTouchStart = (e: React.TouchEvent | TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent | TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 100; // Minimum swipe distance

    // Check if we're on a chamber page
    const match = location.pathname.match(/\/chamber\/(\d+)/);
    if (match) {
      const currentChamberId = parseInt(match[1]);

      // Swipe left (next chamber)
      if (diff > threshold && currentChamberId < 3) {
        setDirection(1);
        navigate(`/chamber/${currentChamberId + 1}`);
      }
      // Swipe right (previous chamber)
      else if (diff < -threshold && currentChamberId > 1) {
        setDirection(-1);
        navigate(`/chamber/${currentChamberId - 1}`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, startX]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: direction * 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -300 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/chamber/:chamberId" element={<ChamberDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
