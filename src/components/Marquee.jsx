import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);
  const containerRef = useRef(null);

  // Yellow/gold themed items
  const marqueeItems = [
    { text: "New features added!", icon: "✨", color: "text-yellow-600" },
    { text: "Limited time offer!", icon: "🔥", color: "text-amber-600" },
    { text: "Join our community", icon: "👥", color: "text-yellow-700" },
    { text: "50% discount today", icon: "💰", color: "text-yellow-500" },
    { text: "Exclusive content", icon: "🔒", color: "text-amber-700" },
    { text: "Coming soon!", icon: "🚧", color: "text-yellow-800" }
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const container = containerRef.current;
    const contentWidth = marquee.scrollWidth / 2;

    // Main animation
    tweenRef.current = gsap.to(marquee, {
      x: -contentWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
      }
    });

    // Scroll interaction
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: self => {
        const velocity = self.getVelocity() / 100;
        if (Math.abs(velocity) > 0.5) {
          gsap.to(tweenRef.current, {
            timeScale: Math.sign(velocity) * 3,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
    });

    // Hover interaction
    const handleHover = () => {
      gsap.to(tweenRef.current, {
        timeScale: 0.3,
        duration: 0.8,
        ease: "back.out(2)"
      });
      gsap.to(".marquee-item", {
        scale: 1.1,
        duration: 0.5,
        stagger: 0.1
      });
    };

    const handleHoverEnd = () => {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      });
      gsap.to(".marquee-item", {
        scale: 1,
        duration: 0.8
      });
    };

    // Click interaction
    const handleClick = () => {
      gsap.to(".marquee-icon", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".marquee-icon", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            stagger: 0.05
          });
        }
      });
    };

    container.addEventListener("mouseenter", handleHover);
    container.addEventListener("mouseleave", handleHoverEnd);
    container.addEventListener("click", handleClick);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      container.removeEventListener("mouseenter", handleHover);
      container.removeEventListener("mouseleave", handleHoverEnd);
      container.removeEventListener("click", handleClick);
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="mt-10 relative overflow-hidden w-full bg-gradient-to-r from-amber-50 to-yellow-50 py-5 group cursor-pointer shadow-lg"
    >
      {/* Golden gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-yellow-50 via-yellow-50/90 to-transparent z-10 
        group-hover:w-32 transition-all duration-700 ease-out" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-amber-50 via-amber-50/90 to-transparent z-10 
        group-hover:w-32 transition-all duration-700 ease-out" />

      {/* Marquee content */}
      <div ref={marqueeRef} className="flex items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center px-6">
            {marqueeItems.map((item, idx) => (
              <div 
                key={`${i}-${idx}`} 
                className={`marquee-item flex items-center mx-4 transition-all duration-300 hover:${item.color}`}
              >
                <span className="marquee-icon text-2xl mr-2 hover:scale-150 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="text-lg font-medium whitespace-nowrap">
                  {item.text}
                </span>
                <span className="mx-2 text-amber-300">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Golden particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-200/50"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Marquee;