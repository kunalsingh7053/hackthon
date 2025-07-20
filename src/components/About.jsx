import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Create timeline
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      clipAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase text-yellow-400 md:text-[10px]">
          Welcome to Youthiapa
        </p>

        <AnimatedTitle
          title="Bhuvan Bam's <br /> Official Merch Brand"
          containerClass="mt-5 text-center !text-yellow-400"
        />

        <div className="about-subtext text-center px-4 max-w-2xl">
          <p className="text-white">
            The comedy you love, now wearable. Created by Bhuvan Bam for fans everywhere.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Youthiapa isn't just merch—it's a community built on laughter, stories and style.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image relative size-full overflow-hidden rounded-[20%]">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
