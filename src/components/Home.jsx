import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

// Lazy load components
const About = lazy(() => import('../components/About'));
const Features = lazy(() => import('../components/Features'));
const Story = lazy(() => import('../components/Story'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  return (
    <>
      <Hero/>
      <Suspense fallback={<div className="text-center my-10">Loading...</div>}>
        <About/>
        <Features/>
        <Story/>
        <Contact/>
        <Footer/>
      </Suspense>
    </>
  );
};

export default Home;
