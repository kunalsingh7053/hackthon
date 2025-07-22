import AnimatedTitle from "./AnimatedTitle";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} className="w-full h-auto object-contain" />
  </div>
);

const Button = ({ title, containerClass, onClick }) => (
  <button
    className={`bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition-colors duration-300 ${containerClass}`}
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
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Left side images */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.jpg"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* Right side swordman with cartoon */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div className="absolute -top-10 -left-10 w-20 sm:-top-14 sm:-left-14 sm:w-24 md:-top-16 md:-left-16 md:w-28 lg:-top-20 lg:-left-20 lg:w-32">
            <img
              src="/img/cartoon.png"
              alt="Cartoon"
              className="w-full h-auto object-contain"
            />
          </div>
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase tracking-widest">
            #BBKiPublic
          </p>

          <AnimatedTitle
            title="Chalo mil<b>ke</b> <br /> kuch <b>dhamakedaar</b> <br /> b<b>a</b>naate hain!"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="baat karte hain 🤙"
            containerClass="mt-10 cursor-pointer"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
