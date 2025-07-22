# 🎬 Youthiapa Website

A dynamic, animated, and fully responsive website built with React.js, Vite, Tailwind CSS, GSAP, Framer Motion — inspired by BB Ki Vines, showcasing the youth‑centric brand **Youthiapa**.

🌐 **Live Demo:** 👉 [https://youthiapa.netlify.app/](https://youthiapa.netlify.app/)

---

## ✨ **Features**

✅ Hero section with background videos + poster images for fast loading  
✅ Smooth scroll & reveal animations using **GSAP**, **Framer Motion** & **Lenis**  
✅ Fully responsive with **Tailwind CSS**  
✅ Interactive shop button & hover effects  
✅ Feature section with product preview videos  
✅ About & Contact sections  
✅ Floating particles, galaxy & light ray effects  
✅ Custom fonts & brand assets  
✅ Optimized media files for fast load & caching

---

## 🛠 **Tech Stack**

- ⚛ **React.js** (with Vite)
- 🎨 **Tailwind CSS**
- 🎬 **GSAP (GreenSock Animation Platform)**
- 🏃 **Framer Motion**
- 🧩 **React Bits**
- 🪄 **Lenis** (smooth scrolling)
- 🌌 Custom **Galaxy**, **Particles**, **Light Rays** components
- 🔊 Custom video & audio assets
- 🖼 **React Icons** & SVG assets

---

## 📁 **Project Structure**

```plaintext
youthiapax/
├─ hackthon/
│  ├─ galaxy/                # Galaxy background component
│  │  └─ Galaxy/
│  │     └─ Galaxy.jsx
│  ├─ light/                 # Light rays effect
│  │  └─ LightRays/
│  │     └─ LightRays.jsx
│  ├─ partical/              # Particles effect
│  │  └─ Particles/
│  │     └─ Particles.jsx
│  ├─ public/
│  │  ├─ audio/              # loop.mp3, navsound.wav, etc.
│  │  ├─ fonts/              # Custom fonts (woff2)
│  │  ├─ img/                # Images & posters (about.webp, cartoon.png, logo.png, etc.)
│  │  ├─ videos/             # Hero & feature videos (hero-1.mp4, hoodie.mp4, etc.)
│  │  └─ vite.svg
│  ├─ scramble/
│  │  └─ ScrambledText/
│  │     └─ ScrambledText.jsx
│  ├─ src/
│  │  ├─ assets/
│  │  │  └─ react.svg
│  │  ├─ components/         # Main React components
│  │  │  ├─ About.jsx, Aboutauthor.jsx, Hero.jsx, Navbar.jsx, Products.jsx, etc.
│  │  │  ├─ Login.jsx, Register.jsx, Profile.jsx, Cart.jsx
│  │  │  ├─ Loader.jsx, JellyCursor.jsx, Marquee.jsx, Button.jsx
│  │  │  ├─ Story.jsx, TypingText.jsx, AnimatedTitle.jsx, VideoPreview.jsx
│  │  ├─ context/
│  │  │  └─ AppContext.jsx
│  │  ├─ routes/
│  │  │  └─ Mainroute.jsx
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ TextAnimation/
│  │  └─ TextPressure/
│  │     └─ TextPressure.jsx
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ README.md

# Clone the repository
git clone https://github.com/yourusername/youthiapa.git
cd youthiapa

# Install dependencies
npm install

# Start local dev server
npm run dev
