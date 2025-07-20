import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-screen bg-[#5542ff] py-4 text-black"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          © Youthiapa 2025. Dil se Banaya.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#privacy-policy"
          whileHover={{ scale: 1.05 }}
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy & Shanti Policy
        </motion.a>
      </div>
    </motion.footer>
  );
};

export default Footer;
