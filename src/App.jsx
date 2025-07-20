import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from "./components/Loader";
import NavBar from "./components/Navbar";
import Mainroute from "./routes/Mainroute";
import Lenis from '@studio-freight/lenis';
import JellyCursor from "./components/JellyCursor";  // ⭐ import jelly cursor

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!showLoader) {
      const lenis = new Lenis({
        duration: 1.2,       // smooth speed (default 1.2)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
        smooth: true,       
        smoothTouch: false, 
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy(); 
      };
    }
  }, [showLoader]);

  return (
    <BrowserRouter>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {showLoader && <Loader setShowLoader={setShowLoader} />}
        {!showLoader && (
          <>
            <JellyCursor />   {/* ⭐ add here so it’s always on */}
            <NavBar />
            <Mainroute />    {/* Saare route yaha render honge */}
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
