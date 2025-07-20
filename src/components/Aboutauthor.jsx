import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from '../../scramble/ScrambledText/ScrambledText';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const Aboutauthor = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const contentRefs = useRef([]);
  const particleRef = useRef(null);

  // Add content ref
  const addToRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Floating particles background
    if (particleRef.current) {
      const particles = Array.from({ length: 15 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-yellow-400/20';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particleRef.current.appendChild(particle);
        return particle;
      });

      particles.forEach(particle => {
        gsap.to(particle, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-50, 50),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }

    // Enhanced floating + slow rotate on image
    gsap.to(imgRef.current, {
      y: 15,
      rotation: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 3,
    });

    // Glow pulse effect on image
    gsap.to(imgRef.current, {
      boxShadow: '0 0 20px rgba(234, 179, 8, 0.7)',
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'power1.inOut'
    });

    // Parallax effect on heading with stronger animation
    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.5,
        ease: 'back.out(3)'
      }
    );

    // Enhanced text shadow pulse on title
    gsap.to(titleRef.current, {
      textShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.5), 0 0 30px rgba(234, 179, 8, 0.3)',
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut'
    });

    // Stagger fade-in + slide-up for content with more dynamic effects
    if (contentRefs.current.length > 0) {
      tl.fromTo(
        contentRefs.current,
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.95,
          filter: 'blur(2px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2, 
          stagger: 0.2,
          ease: 'back.out(1.7)'
        },
        "-=0.5"
      );
    }

    // Enhanced divider pulse effect
    if (dividerRef.current) {
      gsap.to(dividerRef.current, {
        scaleX: 1.5,
        backgroundColor: 'rgba(234, 179, 8, 0.8)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut'
      });
    }

    // ScrollTrigger animations with more effects
    gsap.fromTo(containerRef.current,
      { 
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Background elements animation
    gsap.to(containerRef.current, {
      backgroundPosition: '50% 30%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'none'
    });

    // ScrambledText reveal effect
    const scrambledElements = containerRef.current.querySelectorAll('.scrambled-text');
    scrambledElements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          }
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (particleRef.current) {
        particleRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen bg-black text-yellow-400 flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Floating particles background */}
      <div ref={particleRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/80 to-black pointer-events-none" />

      {/* Main content */}
      <div ref={containerRef} className="flex flex-col items-center justify-center relative z-10 w-full max-w-6xl">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-8 text-center tracking-tight"
        >
          About Youthiapa
        </h2>

        <div
          ref={imgRef}
          className="mb-8 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 overflow-hidden rounded-xl fade-in relative group"
        >
          <img
            src="/img/about.webp"
            alt="About Youthiapa"
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Image shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <ScrambledText>
          <div ref={addToRefs} className="text-center max-w-2xl fade-in px-4">
            <p className="text-white text-lg md:text-xl mb-6 leading-relaxed">
              Youthiapa is the official merchandise brand by Bhuvan Bam.
              What started as fun sketches and relatable content has grown into
              a bold symbol of humor and self-expression.
            </p>
            <p className="text-gray-300 text-base md:text-lg italic">
              From signature <span className="font-bold text-yellow-400 not-italic">#BBKiVines</span> to exclusive drops,
              Youthiapa lets fans wear their love for content that makes them laugh,
              think and feel connected.
            </p>
          </div>
        </ScrambledText>

        <div
          ref={dividerRef}
          className="w-24 h-1 bg-yellow-400 rounded-full my-12 fade-in transform origin-center"
        ></div>

        <ScrambledText>
          <div ref={addToRefs} className="max-w-2xl text-center fade-in px-4">
            <h3 className="text-3xl md:text-4xl font-semibold mb-6">
              Bhuvan Bam's Journey
            </h3>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              With just a phone camera and raw humor, Bhuvan Bam turned everyday stories into
              <span className="italic text-yellow-300"> BB Ki Vines</span> — making millions laugh across the nation.
            </p>
            <p className="text-gray-300 text-base md:text-lg">
              From local gigs to becoming India's YouTube sensation, his journey is about passion,
              resilience and authenticity. Today, Bhuvan connects hearts not just through videos and music,
              but also through Youthiapa — a brand born out of his stories and your laughter.
            </p>
          </div>
        </ScrambledText>

        {/* Signature flourish */}
        <div ref={addToRefs} className="mt-12 fade-in">
          <svg 
            width="200" 
            height="50" 
            viewBox="0 0 200 50" 
            className="text-yellow-400 fill-current"
          >
            <path 
              d="M10,25 Q50,5 90,25 T170,25" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Aboutauthor;