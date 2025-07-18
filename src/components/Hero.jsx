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
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

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
        onStart: () => nextVdRef.current.play(),
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
  }, []);

  // 🟡 Update: use CDN URLs instead of local folder
  const videoUrls = [
    "https://youthiapa.com/cdn/shop/videos/c/vp/a6fb5e33f9a64302ab7ce3bbf3efa3fb/a6fb5e33f9a64302ab7ce3bbf3efa3fb.HD-1080p-7.2Mbps-49439125.mp4?v=0",
    "https://youthiapa.com/cdn/shop/videos/c/vp/bec0eef27aa94de99a25cdd97b6a2bdc/bec0eef27aa94de99a25cdd97b6a2bdc.HD-1080p-7.2Mbps-49421806.mp4?v=0",
    "https://youthiapa.com/cdn/shop/videos/c/vp/6a3572187b2243cda71a45789afec15b/6a3572187b2243cda71a45789afec15b.HD-1080p-7.2Mbps-49421697.mp4?v=0",
    "https://youthiapa.com/cdn/shop/videos/c/vp/3654e4c7a7bb4367bd215825eede885a/3654e4c7a7bb4367bd215825eede885a.HD-1080p-7.2Mbps-49421692.mp4?v=0"
  ];

  const getVideoSrc = (index) => videoUrls[index - 1];

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black">
          <img
            src="https://i.pinimg.com/736x/da/97/96/da979694c6573d9ec50b01644fbe338a.jpg"
            alt="Loading..."
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-yellow-400">
          BB <b>Ki</b> Vines
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-yellow-400">
              Youthiapa
            </h1>
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
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        BB <b>Ki</b> Vines
      </h1>
    </div>
  );
};

export default Hero;
