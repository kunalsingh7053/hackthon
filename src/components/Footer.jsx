import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700/90 py-6 backdrop-blur-sm text-white"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row border-t border-white/20 pt-4">
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-light">© Youthiapa 2025. Dil se Banaya.</p>
          <p className="text-xs font-extralight text-white/70">Made with ❤️ in India</p>
        </div>

        <div className="flex gap-5">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl text-white hover:text-yellow-300 transition-colors duration-300"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#privacy-policy"
          whileHover={{ scale: 1.08 }}
          className="text-sm font-light underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300"
        >
          Privacy & Shanti Policy
        </motion.a>
      </div>

      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-400 p-3 text-black shadow-lg backdrop-blur-sm"
        >
          ↑
        </motion.button>
      )}
    </motion.footer>
  );
};

export default Footer;
