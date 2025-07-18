import React, { useState } from 'react';
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

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {showLoader && <Loader setShowLoader={setShowLoader} />}
      {!showLoader && (
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
