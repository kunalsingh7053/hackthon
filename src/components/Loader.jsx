// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ setShowLoader }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/img/l-1.webp",
    "/img/l-2.webp",
    "/img/l-3.webp"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentIndex(i % images.length);
      i++;
      if (i >= images.length) clearInterval(interval);
    }, 1500);

    // Hide loader after ~4.5s
    const timeout = setTimeout(() => setShowLoader(false), images.length * 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setShowLoader]);

  const textAnim = {
    hidden: { y: "100%", opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center gap-4 sm:gap-8"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, display: "none" }}
      transition={{ delay: (images.length * 1.5) - 0.5, duration: 0.5 }}
    >
      <motion.h1
        className="text-[#CBB7D2] font-bold text-[10vw] sm:text-[70px]"
        variants={textAnim}
        initial="hidden"
        animate="show"
      >
        YOUTHI
      </motion.h1>

      <div className="relative w-[40vw] max-w-[300px] aspect-video overflow-hidden rounded-xl">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            srcSet={`${src} 600w`}
            sizes="(max-width: 768px) 300px, 600px"
            alt="slide"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            // Add fetchpriority=high only for first image to help LCP
            {...(index === 0 ? { fetchpriority: "high" } : {})}
          />
        ))}
      </div>

      <motion.h1
        className="text-[#CBB7D2] font-bold text-[10vw] sm:text-[70px]"
        variants={textAnim}
        initial="hidden"
        animate="show"
      >
        APA
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
