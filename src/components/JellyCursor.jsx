import React, { useEffect, useRef } from "react";

const JellyCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // spring effect: bigger multiplier gives faster catch-up, smaller = more lag
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursor.style.transform = `translate3d(${currentX - cursor.offsetWidth/2}px, ${currentY - cursor.offsetHeight/2}px, 0)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full bg-cyan-400 opacity-80 mix-blend-difference"
      style={{
        filter: "blur(4px)",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)",
        transform: "translate3d(0,0,0)",
        willChange: "transform",
      }}
    ></div>
  );
};

export default JellyCursor;
