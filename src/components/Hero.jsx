import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiShoppingCart } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const nextVdRef = useRef(null);

  // ✅ Sirf first video load hone ka wait
  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    nextVdRef.current.src = getVideoSrc(nextIndex);
    nextVdRef.current.load();
    nextVdRef.current.play();
    setCurrentIndex(nextIndex);
  };

  const totalVideos = 4;

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // ✅ Video src function (replace URL if you use CDN)
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* ✅ Background video */}
        <video
          src={getVideoSrc(currentIndex)}
          poster={`images/hero-${currentIndex}.jpg`} // use poster
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* ✅ Clickable mini video preview */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src=""
                ref={nextVdRef}
                loop
                muted
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
              />
            </div>
          </VideoPreview>
        </div>

        {/* 🟡 Heading & button */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-yellow-400">Youthiapa</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-white">
              Laugh. Relate. Repeat.
            </p>
            <Button
              id="shop-now"
              title="Shop Now"
              leftIcon={<TiShoppingCart />}
              containerClass="bg-yellow-400 flex-center gap-1 text-black"
            />
          </div>
        </div>

        {/* Bottom right heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-yellow-400">
          BB <b>Ki</b> Vines
        </h1>
      </div>
    </div>
  );
};

export default Hero;
