import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import Hero from '../components/Hero';

// Lazy load components
const About = lazy(() => import('../components/About'));
const Features = lazy(() => import('../components/Features'));
const Story = lazy(() => import('../components/Story'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  const audioRef = useRef(null);
  const [atTop, setAtTop] = useState(true); // initially user is at top

  // handle scroll position to update button icon
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 100); // adjust 100 if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    if (atTop) {
      // scroll to bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      // scroll to top
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/top.wav" preload="auto" />

      {/* Hero section wrapped in a div with id="hero" */}
      <div id="hero">
        <Hero />
      </div>

      <Suspense fallback={<div className="text-center my-10 text-yellow-400">Loading...</div>}>
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </Suspense>

      {/* Fixed button in bottom-right corner */}
      <button
        onClick={handleButtonClick}
        className="fixed bottom-5 right-5 z-50 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition shadow-lg"
        title={atTop ? "Scroll to Bottom" : "Scroll to Top"}
      >
        {atTop ? '⬇' : '⬆'}
      </button>
    </>
  );
};

export default Home;
