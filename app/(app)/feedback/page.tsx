'use client';
export const dynamic = 'force-dynamic';

import Image from "next/image";
import React, { useState } from "react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-8 px-2 relative overflow-hidden">
      {/* Absolute leaf image in background, behind the form */}
      <div className="hidden lg:block absolute right-96
       bottom-20 z-0 opacity-70 pointer-events-none select-none">
        <Image
          src="/leaf_image.png"  // Make sure this is the correct file name and extension
          alt="Leaf"
          width={200}
          height={200}
          className="select-none opacity-10 rotate-45"
          priority
        />
      </div>
      <div
        className="relative z-10 max-w-md w-full mx-auto rounded-2xl shadow-xl p-6 sm:p-10 space-y-7"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(180,220,180,0.08)",
        }}
      >
        {/* Logo Placeholder */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-2 overflow-hidden">
            {/* Place for image/logo */}
            <Image src="/logo.jpeg" alt="Logo" width={40} height={40} />
          </div>
          <span className="text-green-700 text-xl font-bold tracking-wide">
            PLANT MD
          </span>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-green-700 text-center">
          Share Your Feedback
        </h2>
        <p className="text-gray-500 text-center -mt-2">
          Help us improve your plant health experience
        </p>

        {/* Feedback Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-gray-200 focus:border-green-400 px-4 py-2 outline-none bg-white/80"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            className="w-full rounded-lg border border-gray-200 focus:border-green-400 px-4 py-2 outline-none bg-white/80"
          />
          <textarea
            placeholder="Feedback"
            rows={3}
            className="w-full rounded-lg border border-gray-200 focus:border-green-400 px-4 py-2 outline-none resize-none bg-white/80"
          />
        </form>

        {/* Star Rating */}
        <div className="flex items-center justify-center space-x-1 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i)}
              className="focus:outline-none"
              aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
            >
              <svg
                width="28"
                height="28"
                fill={i <= rating ? "#22c55e" : "none"}
                stroke="#22c55e"
                strokeWidth="2"
                className="transition-all"
              >
                <polygon
                  points="14,3 17.09,10.9 25.51,11.18 18.94,16.51 21.18,24.02 14,19.5 6.82,24.02 9.06,16.51 2.49,11.18 10.91,10.9"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-lg py-2 mt-2 text-lg shadow focus:outline-none"
        >
          Send Feedback
        </button>

        {/* Appreciation Note */}
        <div className="text-center text-gray-600 text-sm pt-3 flex items-center justify-center">
          We value every leaf of your opinion
          <svg width="18" height="18" fill="none" className="ml-1">
            <path
              d="M16 4C13 5 8 10 7 14C6.5 16.5 3 15 3 11C3 7.5 6 3.5 12 2"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse
              cx="13"
              cy="5.5"
              rx="2"
              ry="2.5"
              fill="#22c55e"
              fillOpacity={0.3}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}