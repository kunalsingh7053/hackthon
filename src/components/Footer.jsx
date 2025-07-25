import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com/Bhuvan_Bam", icon: <FaTwitter /> },
  { href: "https://www.youtube.com/@BBKiVines", icon: <FaYoutube /> },
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
      className="relative w-full bg-black text-white overflow-hidden pt-6"
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-yellow-400 rounded-full blur-3xl opacity-10"></div>

      {/* Top glowing border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-40"></div>

      <div className="relative container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 border-t border-white/10 pt-4 pb-6">
        {/* Left text */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-light">© Youthiapa 2025. Dil se Banaya.</p>
          <p className="text-xs font-extralight text-white/60">Made with ❤️ in India</p>
        </div>

        {/* Social icons */}
        <div className="flex gap-5">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl hover:text-yellow-400 transition-colors duration-300"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Privacy link */}
        <motion.a
          href="#privacy-policy"
          whileHover={{ scale: 1.08 }}
          className="text-sm font-light underline underline-offset-4 hover:text-yellow-400 transition-colors duration-300"
        >
          Privacy & Shanti Policy
        </motion.a>
      </div>

     
    </motion.footer>
  );
};

export default Footer;
