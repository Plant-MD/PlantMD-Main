import Link from "next/link";

export default function ShowcaseSection() {
  return (
    <section className="relative px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">

        {/* iPhone mockups with gradients */}
        <div className="relative flex justify-center w-full">
          <div className="relative w-full max-w-4xl">

            {/* Background gradients */}
            <div className="absolute -top-10 -left-32 w-64 h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-30 blur-xl animate-pulse" />
            <div className="absolute -bottom-10 -right-32 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-30 blur-xl animate-pulse delay-1000" />

            {/* First iPhone */}
            <div className="relative z-10 transform -rotate-6 inline-block animate-float">
              <PhoneMockup text="Upload Plant Image" />
            </div>

            {/* Left notification */}
            <Notification
              position="left"
              emoji="👨‍🌾"
              text="This has a lot of potential"
              author="Superr Franky"
              className="top-12 -left-28 sm:-left-36"
            />

            {/* Animated arrow between phones */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <ArrowAnimation />
            </div>

            {/* Second iPhone */}
            <div className="absolute top-20 right-8 z-10 transform rotate-6 animate-float delay-500">
              <PhoneMockup text="Disease Identified" />
            </div>

            {/* Right notification */}
            <Notification
              position="right"
              emoji="👨‍🌾"
              text="This has a lot of potential"
              author="Superr Franky"
              className="bottom-12 -right-28 sm:-right-36 delay-1000"
            />
          </div>
        </div>

        {/* CTA Text */}
        <div className="text-center max-w-4xl mt-20 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
            <span className="text-[#054714]">Diagnose Plant Disease </span>
            <span className="text-black">Instantly</span>
            <br />
            <span className="text-[#054714]">with PlantMD</span>
          </h1>

          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#011606] hover:bg-gray-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full animate-bounce-slow hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
              <path d="M13 5v14l11-7z" />
            </svg>
            Try it now
          </Link>
        </div>
      </div>
    </section>
  );
}

// Reusable phone mockup component
function PhoneMockup({ text }: { text: string }) {
  return (
    <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-72 sm:w-80">
      <div className="bg-white rounded-[2.2rem] p-2">
        <div className="bg-gray-100 rounded-[1.8rem] h-[500px] flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4" />
            <p className="text-sm">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable notification component
function Notification({
  position,
  emoji,
  text,
  author,
  className,
}: {
  position: "left" | "right";
  emoji: string;
  text: string;
  author: string;
  className?: string;
}) {
  const baseClasses = `absolute bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-xl p-4 flex items-center space-x-3 max-w-xs z-20 animate-bounce-slow`;
  const layout = position === "left"
    ? "flex-row"
    : "flex-row-reverse text-right";

  return (
    <div className={`${baseClasses} ${layout} ${className}`}>
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">{emoji}</span>
      </div>
      <div className="text-sm text-white">
        <p className="font-semibold">{text}</p>
        <p className="text-green-100 text-xs font-bold">{author}</p>
      </div>
    </div>
  );
}

// Reusable arrow animation SVG
function ArrowAnimation() {
  return (
    <div className="w-[91px] h-[91px] flex items-center justify-center">
      <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arrowFillGradient" x1="0" y1="0" x2="91" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#011606">
              <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="0%" stopColor="#b6e7c9">
              <animate attributeName="offset" values="0.01;1" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <path
          d="M69.7664 40.1915C62.7518 34.1248 53.6518 30.3332 43.6039 30.3332C25.9726 30.3332 11.0714 41.8219 5.83887 57.709L14.7872 60.6665C16.7832 54.5992 20.6435 49.3168 25.8179 45.5721C30.9923 41.8275 37.2167 39.8118 43.6039 39.8123C50.9976 39.8123 57.7468 42.5423 63.0172 46.9407L49.2914 60.6665H83.4164V26.5415L69.7664 40.1915Z"
          fill="url(#arrowFillGradient)"
        />
      </svg>
    </div>
  );
}
