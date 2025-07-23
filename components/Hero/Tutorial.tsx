"use client";

import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="relative px-4 sm:px-6 py-16 bg-[#f9fef9] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Corner Frames with parallel venation texture */}
        {/* TOP LEFT */}
        <CornerFrame position="top-left" />
        {/* TOP RIGHT */}
        <CornerFrame position="top-right" />
        {/* BOTTOM LEFT */}
        <CornerFrame position="bottom-left" />
        {/* BOTTOM RIGHT */}
        <CornerFrame position="bottom-right" />

        {/* Leaf Decorations */}
        <Image
          src="/images/leaf1.png"
          alt="Leaf Decoration"
          width={120}
          height={120}
          className="absolute top-8 right-8 opacity-40 rotate-[20deg] z-0"
        />
        <Image
          src="/images/leaf2.png"
          alt="Leaf Decoration"
          width={100}
          height={100}
          className="absolute bottom-12 left-6 opacity-30 -rotate-12 z-0"
        />

        {/* Video Container */}
        <div className="relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl aspect-video shadow-2xl border-4 border-white">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1"
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

// Custom Component for Framed Corners
type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerFrameProps {
  position: CornerPosition;
}

function CornerFrame({ position }: CornerFrameProps) {
  const baseClass = "absolute z-20 pointer-events-none";
  const frameStyle = "bg-green-700 bg-[url('/textures/parallel-veins.svg')] bg-[length:100%_100%]";

  const positions: Record<CornerPosition, { container: string; horiz: string; vert: string }> = {
    "top-left": {
      container: "-top-12 -left-12",
      horiz: "w-28 h-6 rounded",
      vert: "w-6 h-28 absolute top-0 left-0 rounded",
    },
    "top-right": {
      container: "-top-12 -right-12",
      horiz: "w-28 h-6 rounded",
      vert: "w-6 h-28 absolute top-0 right-0 rounded",
    },
    "bottom-left": {
      container: "-bottom-12 -left-12",
      horiz: "w-28 h-6 absolute bottom-0 left-0 rounded",
      vert: "w-6 h-28 absolute bottom-0 left-0 rounded",
    },
    "bottom-right": {
      container: "-bottom-12 -right-12",
      horiz: "w-28 h-6 absolute bottom-0 right-0 rounded",
      vert: "w-6 h-28 absolute bottom-0 right-0 rounded",
    },
  };

  const pos = positions[position];

  return (
    <div className={`${baseClass} ${pos.container}`}>
      <div className={`${frameStyle} ${pos.horiz}`} />
      <div className={`${frameStyle} ${pos.vert}`} />
    </div>
  );
}
