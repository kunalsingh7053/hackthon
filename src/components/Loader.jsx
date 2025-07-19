// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ setShowLoader }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://youthiapa.com/cdn/shop/files/bb-modified.jpg?v=1750000289&width=1100",
    "https://i.pinimg.com/736x/bc/61/2d/bc612d638b1622ba6549981d0d1bb1c5.jpg",
    "https://i.pinimg.com/736x/0c/85/cf/0c85cf78b4e9a1fa032ab1e333055440.jpg",
    "https://i.pinimg.com/1200x/48/fc/dd/48fcddb801ff7aac922b3818a29c702d.jpg",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentIndex(i % images.length);
      i++;
      if (i >= images.length) clearInterval(interval);
    }, 1500);

    // Hide loader after total ~6s
    const timeout = setTimeout(() => setShowLoader(false), 6000);

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
      transition={{ delay: 5.5, duration: 0.5 }}
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
            alt="slide"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
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
