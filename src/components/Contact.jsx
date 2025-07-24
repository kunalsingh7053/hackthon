import AnimatedTitle from "./AnimatedTitle";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} className="w-full h-auto object-contain" alt="" />
  </div>
);

const Button = ({ title, containerClass, onClick }) => (
  <button
    className={`bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors duration-300 font-semibold tracking-wide ${containerClass}`}
    onClick={onClick}
  >
    {title}
  </button>
);

const Contact = () => {
  const handleButtonClick = () => {
    window.open("https://www.youtube.com/@BBKiVines", "_blank");
  };

  return (
    <div id="contact" className="my-20 w-screen px-6">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 overflow-hidden">
        {/* Left side images */}
        <div className="absolute -left-10 top-0 hidden h-full w-72 sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.jpg"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 translate-y-40 lg:translate-y-20"
          />
        </div>

        {/* Right side swordman image only */}
        <div className="absolute top-10 right-6 w-40 sm:top-20 sm:right-10 sm:w-60 lg:top-20 lg:right-20 lg:w-72">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-110"
          />
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-8 text-[11px] uppercase tracking-widest text-yellow-400 font-light">
            #BBKiPublic
          </p>

          <AnimatedTitle
            title="Chalo mil<b>ke</b> <br /> kuch <b>dhamakedaar</b> <br /> b<b>a</b>naate hain!"
            className="special-font w-full font-black text-4xl md:text-6xl leading-tight"
          />

          <Button
            title="baat karte hain 🤙"
            containerClass="mt-8"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
