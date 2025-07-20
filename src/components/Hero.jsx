import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import TypingText from "./TypingText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;

  const nextVdRef = useRef(null);
  const shopTextRef = useRef(null);
  const cartIconRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVdRef.current?.play(),
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  // GSAP hover animation for "Shop Now" text and cart icon
  useEffect(() => {
    const btn = document.getElementById("shop-now");
    const textEl = shopTextRef.current;
    const iconEl = cartIconRef.current;

    const handleMouseEnter = () => {
      const tl = gsap.timeline();

      tl.to(textEl, {
        rotate: 10,
        scale: 1.2,
        color: "#000000",
        duration: 0.2,
        ease: "power2.out",
      })
      .to(textEl, {
        rotate: -10,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(textEl, {
        rotate: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      }, "<"); // "<" means start at same time

      tl.to(iconEl, {
        rotate: 360,
        scale: 1.4,
        duration: 0.5,
        ease: "bounce.out",
      }, 0); // start together
    };

    const handleMouseLeave = () => {
      gsap.to([textEl, iconEl], {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    btn?.addEventListener("mouseenter", handleMouseEnter);
    btn?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn?.removeEventListener("mouseenter", handleMouseEnter);
      btn?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // AnimatedText component for hover reveal
  const AnimatedText = ({ text }) => {
    const lettersRef = useRef([]);
    const handleMouseEnter = () => {
      gsap.to(lettersRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.03,
      });
    };
    const handleMouseLeave = () => {
      gsap.to(lettersRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.in",
        stagger: 0.03,
      });
    };
    return (
      
      <div
        className="flex overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text.split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block translate-y-0"
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-yellow-400">
              <AnimatedText text="Youthiapa" />
            </h1>
            <TypingText text="Laugh. Relate. Repeat." />
            <button
              id="shop-now"
              title="Shop Now"
              onClick={() => navigate("/products")}
              className="bg-yellow-400 flex-center gap-1 text-black rounded p-2 font-bold"
            >
              <span ref={shopTextRef}>Shop Now</span>
              <TiShoppingCart size={20} ref={cartIconRef} />
            </button>
          </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-yellow-400">
          <AnimatedText text="BB Ki Vines" />
        </h1>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        BB <b>Ki</b> Vines
      </h1>
    </div>
  );
};

export default Hero;
