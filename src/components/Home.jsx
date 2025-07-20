import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import Hero from '../components/Hero';

// Lazy load components
const About = lazy(() => import('../components/About'));
const Features = lazy(() => import('../components/Features'));
const Story = lazy(() => import('../components/Story'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  const scrollAudioRef = useRef(null);
  const buttonAudioRef = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // unlock both audios on first gesture
  useEffect(() => {
    const unlock = () => {
      [scrollAudioRef, buttonAudioRef].forEach(ref => {
        if (ref.current) {
          ref.current.muted = true;
          ref.current.play().then(() => {
            ref.current.muted = false;
          }).catch(e => console.log('Unlock failed:', e));
        }
      });
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Scroll listener: play sound once per scroll start
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 100);

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        if (scrollAudioRef.current) {
          scrollAudioRef.current.currentTime = 0;
          scrollAudioRef.current.play().catch(e => console.log('Scroll play failed:', e));
        }
      }

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 200); // after 200ms of no scroll, reset
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (buttonAudioRef.current) {
      buttonAudioRef.current.currentTime = 0;
      buttonAudioRef.current.play().catch(e => console.log('Button play failed:', e));
    }
    if (atTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
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
      {/* Hidden audio elements */}
      <audio ref={scrollAudioRef} src="/audio/scroll.wav" preload="auto" />
      <audio ref={buttonAudioRef} src="/audio/top.wav" preload="auto" />

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

      <button
        onClick={handleButtonClick}
        className="fixed bottom-5 right-5 z-50 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 active:scale-95 transition transform shadow-lg"
        title={atTop ? "Scroll to Bottom" : "Scroll to Top"}
      >
        {atTop ? '⬇' : '⬆'}
      </button>
    </>
  );
};

export default Home;
