import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onEnter: () => gsap.set("#clip", { zIndex: 10 }),
        onLeave: () => gsap.set("#clip", { zIndex: 0 }),
        onEnterBack: () => gsap.set("#clip", { zIndex: 10 }),
        onLeaveBack: () => gsap.set("#clip", { zIndex: 0 }),
      },
    });

    tl.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    return () => {
      tl.kill();
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
  containerClass="mt-5 text-center font-semibold tracking-wider leading-tight text-black"
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

      <div id="clip" className="h-dvh w-screen z-10 relative">
        <div className="mask-clip-path about-image relative size-full overflow-hidden rounded-[20%] z-10">
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
