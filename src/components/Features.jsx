import { useState, useRef, useContext } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={`${className} overflow-hidden rounded-md`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  src,
  title,
  description,
  ctaText = "Coming Soon",
  isImage = false,
  productId
}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (ctaText === "Explore Now" && productId) {
      if (currentUser) {
        navigate(`/product/${productId}`);
      } else {
        alert("Please login first to explore!");
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      {isImage ? (
        <img
          src={src}
          alt="bento"
          className="absolute left-0 top-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 w-full h-full object-cover"
        />
      )}
      <div className="relative z-10 flex flex-col justify-between p-5 text-blue-50 h-full">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        <div
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHoverOpacity(1)}
          onMouseLeave={() => setHoverOpacity(0)}
          onClick={handleClick}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
        >
          <div
            className="pointer-events-none absolute -inset-px transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          />
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">{ctaText}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-32">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-20">
        <p className="font-circular-web text-lg text-blue-50 mb-4 md:mb-5 mt-5">
          Welcome to the World of <b>Youthiapa</b>
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50 mb-8 md:mb-10">
          Laugh harder. Shop smarter. Dive into BB Ki Vines’ official universe of memes,
          merch, and madness.
        </p>

        <BentoTilt className="border-hsla relative w-full h-96 md:h-[75vh]">
          <BentoCard
            src="videos/The Revolutionaries.mp4"
            title={<>The <b>Revolutionaries</b></>}
            description="Bhuvan Bam stars in an epic tale of India’s freedom struggle. Coming soon on Prime Video."
            ctaText="Coming Soon"
          />
        </BentoTilt>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <BentoTilt className="h-[90vh]">
          <BentoCard
            src="img/t-1.webp"
            title={<>T-<b>Shirts</b> Drop</>}
            description="Style that speak memes!"
            ctaText="Explore Now"
            isImage
            productId="p16"
          />
        </BentoTilt>

        <BentoTilt className="h-[90vh]">
          <BentoCard
            src="videos/hoodie.mp4"
            title={<>H<b>oodies</b> Drop</>}
            description="Cozy up in style with BB Ki Vines hoodies!"
            ctaText="Coming Soon"
          />
        </BentoTilt>

        <BentoTilt className="h-[90vh]">
          <BentoCard
            src="videos/t-shirt.mp4"
            title={<>T-<b>Shirts</b> Showcase</>}
            description="Discover our latest tee collection in motion – style meets attitude!"
            ctaText="Coming Soon"
          />
        </BentoTilt>

        <BentoTilt className="h-[90vh]">
          <BentoCard
            src="img/h-1.webp"
            title={<>Style<b>Statement</b></>}
            description="Sleek, fearless and iconic — discover the new drop inspired by bold individuality."
            ctaText="Explore Now"
            isImage
            productId="p2"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
