import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from "./components/Loader";
import NavBar from "./components/Navbar";
import Mainroute from "./routes/Mainroute";
import Lenis from '@studio-freight/lenis';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!showLoader) {
      const lenis = new Lenis({
        duration: 1.2,       // smooth speed (default 1.2)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
        smooth: true,       // enable smooth scrolling
        smoothTouch: false, // disable smooth on touch devices
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy(); // clean up when component unmounts
      };
    }
  }, [showLoader]);

  return (
    <BrowserRouter>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {showLoader && <Loader setShowLoader={setShowLoader} />}
        {!showLoader && (
          <>
            <NavBar />
            <Mainroute /> {/* Saare route yaha render honge */}
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
