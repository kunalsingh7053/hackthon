import React from 'react';

const Model = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Brand tagline */}
      <p className="text-gray-500 text-sm md:text-base mb-2 tracking-widest uppercase">
        Exclusive Drop by Youthiapa
      </p>

      {/* Title */}
      <h1 className="text-black text-3xl md:text-4xl font-semibold mb-2 tracking-wide uppercase">
        Youthiapa Jacket
      </h1>

      {/* Sub Tagline */}
      <p className="text-gray-700 mb-4 text-sm md:text-base tracking-wide">
        Limited Edition Collection
      </p>

      {/* 3D Model */}
      <model-viewer
        src="/img/cloth_jacket.glb"
        alt="Youthiapa Jacket"
        autoplay
        camera-controls
        disable-zoom
        auto-rotate
        shadow-intensity="3"
        touch-action="pan-y"
        style={{ width: '320px', height: '450px', borderRadius: '8px' }}
        className="mb-4"
      ></model-viewer>

      {/* Short description */}
      <p className="text-gray-600 max-w-md mb-4 text-sm md:text-base">
        Crafted for comfort & style, the Youthiapa Jacket blends modern minimalism with streetwear edge. Elevate your everyday look.
      </p>

      {/* Call to action button */}
      <button className="bg-black text-white px-5 py-2 rounded-full text-sm md:text-base hover:bg-gray-800 transition">
        Shop Now
      </button>
    </div>
  );
};

export default Model;
