import React from "react";

export default function TeamSection() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/about.png"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Transparent Image on Top */}
      <img
        src="/credits.png"
        alt="Transparent Overlay"
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
