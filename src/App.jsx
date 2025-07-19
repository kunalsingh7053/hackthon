import React, { useState, useEffect } from 'react';
import Loader from "./components/Loader";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState(false);

  // Preload videos immediately on app mount
  useEffect(() => {
    const videoCount = 4; // totalVideos
    let loadedCount = 0;

    for (let i = 1; i <= videoCount; i++) {
      const video = document.createElement('video');
      video.src = `videos/hero-${i}.mp4`;
      video.preload = 'auto';
      video.onloadeddata = () => {
        loadedCount++;
        if (loadedCount === videoCount) {
          setVideosLoaded(true);
        }
      };
    }
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {showLoader && <Loader setShowLoader={setShowLoader} />}
      {!showLoader && videosLoaded && (
        <>
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;
