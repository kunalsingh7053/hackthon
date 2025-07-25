import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Model = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);  // get currentUser from context

  const handleShopNow = () => {
    if (currentUser) {
      navigate('/product/p28');  // navigate if logged in
    } else {
      alert('Please login to continue!');
      // optionally: navigate('/login');
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center px-4 text-center bg-black">
      {/* Brand tagline */}
      <p className="text-white text-sm md:text-base mb-2 tracking-widest uppercase">
        Exclusive Drop By Youthiapa
      </p>

      <h1 className="text-black text-3xl md:text-4xl font-semibold mb-2 tracking-wide uppercase">
        Youthiapa Jacket
      </h1>

      <p className="text-gray-400 mb-4 text-sm md:text-base tracking-wide">
        Limited Edition Collection
      </p>

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

      <p className="text-gray-400 max-w-md mb-4 text-sm md:text-base">
        Crafted for comfort & style, the Youthiapa Jacket blends modern minimalism with streetwear edge. Elevate your everyday look.
      </p>

      <button
        onClick={handleShopNow}
        className="mb-10 bg-white text-black px-5 py-2 rounded-full text-sm md:text-base hover:bg-yellow-400 transition"
      >
        Shop Now
      </button>
    </div>
  );
};

export default Model;
