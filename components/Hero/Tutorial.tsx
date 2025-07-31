"use client";

import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="relative mb-10 bg-green-50 overflow-hidden md:min-h-screen lg:mt-10">
      <div className="max-w-4xl m-auto relative z-10 mt-20">

        {/* Video Container */}
        <div className="relative z-10 overflow-hidden rounded-md sm:rounded-none aspect-video shadow-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1"
            title="YouTube video"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}