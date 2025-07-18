# 🎬 Youthiapa Website

A dynamic, animated, and fully responsive website built with React.js, Vite, Tailwind CSS, GSAP, and Framer Motion — inspired by BB Ki Vines, showcasing the youth‑centric brand **Youthiapa**.


---

## ✨ **Features**

✅ Hero section with background videos + poster images for fast loading  
✅ Smooth scroll and reveal animations with **GSAP** and **Framer Motion**  
✅ Responsive design using **Tailwind CSS**  
✅ Interactive shop button & hover effects  
✅ Product features section with preview videos  
✅ About & Contact sections  
✅ Custom fonts & brand assets  
✅ Optimized media files for fast load & caching

---

## 🛠 **Tech Stack**

- ⚛ **React.js** (with Vite)
- 🎨 **Tailwind CSS**
- 🎬 **GSAP (GreenSock Animation Platform)**
- 🏃 **Framer Motion**
- 🖼 **React Icons**
- 🔊 Custom video/audio assets

---

## 📁 **Project Structure**

```plaintext
youthiapa/
├─ public/
│  ├─ audio/              # Audio files (loop.mp3 etc.)
│  ├─ fonts/              # Custom fonts (woff2)
│  ├─ img/                # Images & video poster thumbnails
│  │  ├─ hero-1.png ...   # Poster images
│  │  ├─ logo.png, jsm-logo.png, etc.
│  ├─ videos/             # Hero & feature videos
│  │  ├─ hero-1.mp4 ...   # Compressed MP4 videos
│  └─ vite.svg
├─ src/
│  ├─ components/         # React components
│  │  ├─ Hero.jsx, Navbar.jsx, Features.jsx, About.jsx, Contact.jsx, etc.
│  │  ├─ VideoPreview.jsx, AnimatedTitle.jsx, Loader.jsx, Button.jsx
│  ├─ assets/             # Extra assets (e.g., react.svg)
│  ├─ App.jsx             # App root
│  ├─ index.css           # Tailwind base + custom CSS
│  └─ main.jsx            # Entry point
├─ index.html
├─ tailwind.config.js     # Tailwind config
├─ vite.config.js         # Vite config
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
# Clone the repository
git clone https://github.com/yourusername/youthiapa.git
cd youthiapa

# Install dependencies
npm install

# Start local dev server
npm run dev
