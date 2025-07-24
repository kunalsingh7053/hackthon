import gsap from "gsap";
import { useEffect, useRef } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const navigate  = useNavigate();
  const imgWrapperRef = useRef(null);
  const shineRef = useRef(null);

  
  useEffect(() => {
    if (imgWrapperRef.current) {
      gsap.to(imgWrapperRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 2.5,
      });
    }
  }, []);

  
  const handleMouseMove = (e) => {
    const rect = imgWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    gsap.to(shineRef.current, {
      duration: 0.3,
      x: x - shineRef.current.offsetWidth / 2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(shineRef.current, {
      duration: 0.5,
      x: -150, 
      ease: "power2.out",
    });
  };

  return (
    <div
      id="story"
      className="min-h-dvh w-screen bg-black text-blue-50 flex flex-col items-center justify-center py-16"
    >
      <p className="font-general text-[10px] uppercase tracking-widest mb-4">
        #BBKiPublic
      </p>

      <AnimatedTitle
        title="Wear <b>a</b>ttitude. <br /> Spread <b>l</b>aughter."
        containerClass="pointer-events-none mix-blend-difference relative z-10 mb-6"
        className="special-font !md:text-[6rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
      />

      <div
        ref={imgWrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mb-6 overflow-hidden rounded-xl shadow-lg w-60 sm:w-72 md:w-80 lg:w-96"
        style={{ position: "relative" }}
      >
        <img
          src="/img/t-1.webp"
          alt="Youthiapa T-Shirt"
          className="w-full h-auto object-contain"
        />
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100px",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
            transform: "skewX(-20deg)",
            filter: "blur(10px)",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        ></div>
      </div>

      <p className="max-w-md text-center font-circular-web text-violet-50 mb-4">
        Premium merch for the tribe that laughs, lives, and vibes.
        <br /> Join the madness!
      </p>

      <button className="mt-2 border bg-white rounded px-4 py-2 text-black" onClick={()=>navigate("/products")} >
        Check Collection 🛒
      </button>
    </div>
  );
};

export default Story;
