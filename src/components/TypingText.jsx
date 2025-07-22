import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TypingText = ({ text }) => {
  const lettersRef = useRef([]);

  useGSAP(() => {
    requestAnimationFrame(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      
      tl.set(lettersRef.current, { opacity: 0 })
        .to(lettersRef.current, {
          opacity: 1,
          duration: 0.05,
          ease: "none",
          stagger: 0.07,
        })
        
        .to({}, { duration: 1 }) 
        
        .to(lettersRef.current, {
          opacity: 0,
          duration: 0.05,
          ease: "none",
          stagger: 0.07,
        });
    });
  }, []);

  return (
    <p className="mb-5 max-w-64 font-robert-regular text-white flex flex-wrap gap-[1px]">
      {text.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="inline-block"
        >
          {letter}
        </span>
      ))}
    </p>
  );
};

export default TypingText;
