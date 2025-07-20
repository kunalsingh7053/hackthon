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

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Floating + slow rotate on image
    gsap.to(imgRef.current, {
      y: 15,
      rotation: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 3,
    });

    // Parallax effect on heading
    gsap.fromTo(titleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    // Text shadow pulse on title
    gsap.to(titleRef.current, {
      textShadow: '0 0 10px yellow, 0 0 20px yellow',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });

    // Stagger fade-in + slide-up for fade-in elements
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current.querySelectorAll('.fade-in'),
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.3 }
      );
    }

    // Divider pulse effect
    if (dividerRef.current) {
      gsap.to(dividerRef.current, {
        scaleX: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut'
      });
    }

    // ScrollTrigger fade-in when section enters viewport
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen bg-black text-yellow-400 flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Main content */}
      <div ref={containerRef} className="flex flex-col items-center justify-center relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          About Youthiapa
        </h2>

        <div
          ref={imgRef}
          className="mb-6 w-48 md:w-64 lg:w-72 overflow-hidden rounded-xl shadow-lg fade-in"
        >
          <img
            src="/img/about.webp"
            alt="About Youthiapa"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <ScrambledText>
          <div className="text-center max-w-2xl fade-in">
            <p className="text-white text-base md:text-lg mb-4">
              Youthiapa is the official merchandise brand by Bhuvan Bam.
              What started as fun sketches and relatable content has grown into
              a bold symbol of humor and self-expression.
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              From signature <span className="italic">#BBKiVines</span> to exclusive drops,
              Youthiapa lets fans wear their love for content that makes them laugh,
              think and feel connected. It’s more than merch — it’s a community
              built on stories, style and laughter.
            </p>
          </div>
        </ScrambledText>

        <div
          ref={dividerRef}
          className="w-16 h-1 bg-yellow-400 rounded-full mt-10 mb-6 fade-in"
        ></div>

        <ScrambledText>
          <div className="max-w-2xl text-center fade-in">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">
              Bhuvan Bam's Journey
            </h3>
            <p className="text-white text-sm md:text-base">
              With just a phone camera and raw humor, Bhuvan Bam turned everyday stories into
              <span className="italic"> BB Ki Vines</span> — making millions laugh across the nation.
              From local gigs to becoming India’s YouTube sensation, his journey is about passion,
              resilience and authenticity. Today, Bhuvan connects hearts not just through videos and music,
              but also through Youthiapa — a brand born out of his stories and your laughter.
            </p>
          </div>
        </ScrambledText>
      </div>
    </div>
  );
};

export default Aboutauthor;
