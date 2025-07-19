import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";   // ✅ just import
import Button from "./Button";

const navItems = ["Home", "Products", "About", "Cart", "Login"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-[200] h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 rounded-xl bg-black/60 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/1200x/a1/e4/d4/a1e4d4d0a35d0b1bca7d7e6b830d4e27.jpg"
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <Button
              id="shop-button"
              title="Shop"
              rightIcon={<TiShoppingCart />}
              containerClass="bg-yellow-400 text-black hidden md:flex items-center justify-center gap-1 hover:bg-yellow-300 transition"
            />
          </div>

          {/* ✅ Center: nav items with NavLink */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item, index) => {
              let path = "/";
              if (item !== "Home") path = `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    `relative font-semibold transition hover:text-yellow-300 hover:scale-105 ${
                      isActive ? "text-yellow-300" : "text-yellow-400"
                    }`
                  }
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400 rounded-full scale-x-0 origin-left transition-transform duration-300 ease-out hover:scale-x-100"></span>
                </NavLink>
              );
            })}
          </div>

          {/* Right: audio + mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudioIndicator}
              className="flex flex-col items-center space-y-0.5 p-1 rounded bg-yellow-400 hover:bg-yellow-300 border border-yellow-500 shadow transition"
            >
              <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
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

            <button onClick={toggleMobileMenu} className="md:hidden text-yellow-400">
              {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </nav>

        {/* ✅ Mobile menu also with NavLink */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
            {navItems.map((item, index) => {
              let path = "/";
              if (item !== "Home") path = `/${item.toLowerCase()}`;
              return (
                <NavLink
                  key={index}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
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
