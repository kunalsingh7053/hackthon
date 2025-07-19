import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = ["Home", "Products", "About", "Cart", "Login"];

const NavBar = () => {
  const navigate = useNavigate();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioElementRef = useRef(null);
  const navSoundRef = useRef(null);
  const navContainerRef = useRef(null);
  const shopBtnRef = useRef(null); // 🪄 new ref for shop button
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleNavClick = () => {
    if (navSoundRef.current) {
      navSoundRef.current.currentTime = 0;
      navSoundRef.current.play();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.muted = false;
      audioElementRef.current.play().catch((error) => {
        console.log("Autoplay blocked until user interacts:", error);
      });
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // 🪄 Logo hover animation
  useEffect(() => {
    const logo = document.querySelector(".logo-img");

    const handleMouseEnter = () => {
      gsap.to(logo, {
        scale: 1.1,
        rotate: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    };

    logo?.addEventListener("mouseenter", handleMouseEnter);
    logo?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logo?.removeEventListener("mouseenter", handleMouseEnter);
      logo?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 🪄 Shop button hover animation
  useEffect(() => {
    const btn = shopBtnRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        scale: 1.1,
        rotate: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        scale: 1,
        rotate: 0,
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

  // AnimatedText component
  const AnimatedText = ({ text }) => {
    const lettersRef = useRef([]);

    const handleMouseEnter = () => {
      gsap.fromTo(
        lettersRef.current,
        { y: 0 },
        { y: -6, duration: 0.3, ease: "power2.out", stagger: 0.03 }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(lettersRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.03,
      });
    };

    return (
      <div
        className="inline-flex overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text.split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className="inline-block"
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-[200] h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      {/* hidden audio elements */}
      <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
      <audio ref={navSoundRef} className="hidden" src="/audio/navsound.wav" />

      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 rounded-xl bg-black/60 backdrop-blur-md shadow-lg">
          {/* Left: logo & shop button */}
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/1200x/a1/e4/d4/a1e4d4d0a35d0b1bca7d7e6b830d4e27.jpg"
              alt="logo"
              className="w-10 h-10 rounded-full object-cover logo-img"
            />
            <button
              ref={shopBtnRef} // 🪄 add ref
              onClick={() => {
                handleNavClick();
                navigate("/products");
              }}
              className="bg-yellow-400 flex-center gap-1 text-black rounded p-2 font-thin hidden md:flex items-center justify-center hover:bg-yellow-300 transition"
            >
              <TiShoppingCart />
              Shop Now
            </button>
          </div>

          {/* Center: nav items */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item, index) => {
              let path = "/";
              if (item !== "Home") path = `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative font-semibold transition hover:text-yellow-300 ${
                      isActive ? "text-yellow-300" : "text-yellow-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <AnimatedText text={item} />
                      <span
                        className={clsx(
                          "absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400 rounded-full origin-left transition-transform duration-300 ease-out",
                          isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                        )}
                      ></span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right: audio + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudioIndicator}
              className="flex flex-col items-center space-y-0.5 p-1 rounded bg-yellow-400 hover:bg-yellow-300 border border-yellow-500 shadow transition"
            >
              <div className="flex items-end space-x-0.5">
                {[1, 2, 3, 4].map((bar, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "w-1 rounded-full bg-black transition-transform duration-300 ease-in-out",
                      { "animate-bounce": isIndicatorActive }
                    )}
                    style={{
                      height: `${6 + bar * 4}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-black font-semibold">Audio</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileMenu();
              }}
              className="md:hidden text-yellow-400"
            >
              {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
            {navItems.map((item, index) => {
              let path = "/";
              if (item !== "Home") path = `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  onClick={() => {
                    handleNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `font-semibold transition ${
                      isActive ? "text-yellow-300" : "text-yellow-400"
                    } hover:text-yellow-300`
                  }
                >
                  {item}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
