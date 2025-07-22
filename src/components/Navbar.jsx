import React, { useEffect, useRef, useState, useContext } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const navItems = ["Home", "Products", "About", "Cart", "Login"];

const NavBar = () => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioElementRef = useRef(null);
  const navSoundRef = useRef(null);
  const navContainerRef = useRef(null);
  const shopBtnRef = useRef(null);
  const circleRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(prev => !prev);
    setIsIndicatorActive(prev => !prev);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const handleNavClick = (path) => {
    if (path === location.pathname) return;
    if (navSoundRef.current) {
      navSoundRef.current.currentTime = 0;
      navSoundRef.current.play();
    }
    gsap.fromTo(
      circleRef.current,
      { scale: 0, opacity: 1 },
      {
        scale: 20,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          navigate(path);
          gsap.to(circleRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => gsap.set(circleRef.current, { scale: 0 })
          });
        }
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.muted = false;
      audioElementRef.current.play().catch(err => console.log("Autoplay blocked:", err));
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

  useEffect(() => {
    const logo = document.querySelector(".logo-img");
    if (!logo) return;
    const enter = () => gsap.to(logo, { scale: 1.1, rotate: 10, duration: 0.3 });
    const leave = () => gsap.to(logo, { scale: 1, rotate: 0, duration: 0.3 });
    logo.addEventListener("mouseenter", enter);
    logo.addEventListener("mouseleave", leave);
    return () => {
      logo.removeEventListener("mouseenter", enter);
      logo.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    const btn = shopBtnRef.current;
    if (!btn) return;
    const enter = () => gsap.to(btn, { scale: 1.1, rotate: -5, duration: 0.3 });
    const leave = () => gsap.to(btn, { scale: 1, rotate: 0, duration: 0.3 });
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  const AnimatedText = ({ text }) => {
    const lettersRef = useRef([]);
    const enter = () => gsap.fromTo(lettersRef.current, { y: 0 }, { y: -6, duration: 0.3, stagger: 0.03 });
    const leave = () => gsap.to(lettersRef.current, { y: 0, duration: 0.3, stagger: 0.03 });
    return (
      <div className="inline-flex overflow-hidden cursor-pointer" onMouseEnter={enter} onMouseLeave={leave}>
        {text.split("").map((l, i) => (
          <span key={i} ref={(el) => (lettersRef.current[i] = el)} className="inline-block">{l}</span>
        ))}
      </div>
    );
  };

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-[200] h-16 sm:inset-x-6 transition-all">
      <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
      <audio ref={navSoundRef} className="hidden" src="/audio/navsound.wav" />

      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between p-4 bg-black/60 rounded-xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-4">
  <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/profile")}>
    <img
      src="https://i.pinimg.com/1200x/a1/e4/d4/a1e4d4d0a35d0b1bca7d7e6b830d4e27.jpg"
      alt="logo"
      className="w-10 h-10 rounded-full object-cover logo-img"
    />
    <span className="text-[10px] text-yellow-400 font-semibold mt-1">Profile</span>
  </div>
  <button
    ref={shopBtnRef}
    onClick={(e) => { e.preventDefault(); handleNavClick("/products"); }}
    className="hidden md:flex items-center gap-1 bg-yellow-400 text-black p-2 rounded hover:bg-yellow-300"
  >
    <TiShoppingCart /> Shop Now
  </button>
</div>


          {/* Desktop nav */}
          <div className="hidden md:flex gap-6">
            {navItems
              .filter(item =>
                !(item === "Login" && currentUser) && // hide Login if logged in
                !(item === "Cart" && !currentUser)    // hide Cart if not logged in
              )
              .map((item, i) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                return (
                  <NavLink
                    key={i}
                    to={path}
                    onClick={(e) => { e.preventDefault(); handleNavClick(path); }}
                    className={({ isActive }) =>
                      `relative font-semibold hover:text-yellow-300 transition ${isActive ? "text-yellow-300" : "text-yellow-400"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <AnimatedText text={item} />
                        <span className={clsx(
                          "absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400 rounded-full origin-left transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                        )}></span>
                      </>
                    )}
                  </NavLink>
                );
              })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudioIndicator}
              className="flex flex-col items-center space-y-0.5 p-1 bg-yellow-400 hover:bg-yellow-300 rounded border border-yellow-500 shadow"
            >
              <div className="flex items-end space-x-0.5">
                {[1,2,3,4].map((bar, idx) => (
                  <div key={idx} className={clsx("w-1 rounded-full bg-black", { "animate-bounce": isIndicatorActive })} style={{ height: `${6 + bar * 4}px`, animationDelay: `${idx * 0.1}s` }} />
                ))}
              </div>
              <span className="text-[10px] text-black font-semibold">Audio</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); toggleMobileMenu(); }} className="md:hidden text-yellow-400">
              {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
            {navItems
              .filter(item =>
                !(item === "Login" && currentUser) &&
                !(item === "Cart" && !currentUser)
              )
              .map((item, i) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                return (
                  <NavLink
                    key={i}
                    to={path}
                    onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); handleNavClick(path); }}
                    className={({ isActive }) =>
                      `font-semibold ${isActive ? "text-yellow-300" : "text-yellow-400"} hover:text-yellow-300`
                    }
                  >
                    {item}
                  </NavLink>
                );
              })}
          </div>
        )}
      </header>

      <div ref={circleRef} className="fixed bottom-[-100px] left-1/2 z-[500] size-[200px] rounded-full bg-black opacity-0 pointer-events-none" style={{ transform: "translateX(-50%) scale(0)" }}></div>
    </div>
  );
};

export default NavBar;
