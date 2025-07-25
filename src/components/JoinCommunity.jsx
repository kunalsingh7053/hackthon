import React from "react";

const JoinCommunity = () => {
  const handleJoinClick = () => {
    window.open("https://www.youtube.com/@BBKiVines", "_blank");
  };

  return (
    <section id="community" className="my-14 px-2 sm:px-4 w-full">
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-blue-50 rounded-2xl overflow-hidden py-16 sm:py-24 max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] mx-auto shadow-2xl border border-white/10">
        {/* Decorative blurred circles */}
        <div className="absolute top-6 left-6 w-20 h-20 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-6 right-6 w-28 h-28 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-10">
          <h2 className="special-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug mb-4">
            BB Ki Public ka <span className="text-yellow-400">hissa</span> bano!
          </h2>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg font-light mb-8 text-gray-300">
            Fun content, behind the scenes, memes, and lots of laughter – join
            our crazy family and never miss the madness!
          </p>
          <button
            onClick={handleJoinClick}
            className="bg-white text-black px-6 py-2.5 rounded-md hover:bg-yellow-300 transition duration-300 font-medium tracking-wide text-sm sm:text-base"
          >
            Join Now 🤙
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
