"use client";
import React from "react";

export default function ImageAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-2">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-lg w-full mx-auto space-y-8">
        {/* Progress Circle */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 mb-4">
            {/* Animated spinner with green accent */}
            <svg className="animate-spin w-full h-full" viewBox="0 0 50 50">
              <circle
                className="text-green-500 opacity-20"
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <path
                className="text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                d="M25 3
                   a 22 22 0 0 1 0 44"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Analyzing Your Plant...
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Our AI is examining your image to detect any potential diseases or issues.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {/* Step 1: Scanning Image */}
          <div className="flex items-start bg-green-50 rounded-lg px-4 py-3 border border-green-100">
            <span className="flex-shrink-0 mt-0.5 text-green-500">
              {/* Icon: Scan */}
              <svg width="24" height="24" fill="none" className="mr-2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="ml-2">
              <div className="font-semibold text-gray-700">Scanning Image</div>
              <div className="text-gray-500 text-sm">Analyzing plant structure and visible symptoms</div>
            </div>
          </div>
          {/* Step 2: AI Analysis */}
          <div className="flex items-start bg-green-50 rounded-lg px-4 py-3 border border-green-100">
            <span className="flex-shrink-0 mt-0.5 text-green-500">
              {/* Icon: AI */}
              <svg width="24" height="24" fill="none" className="mr-2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <div className="ml-2 flex-1">
              <div className="font-semibold text-gray-700">AI Analysis</div>
              <div className="text-gray-500 text-sm">Comparing with disease database</div>
            </div>
            {/* Mini spinner */}
            <svg className="animate-spin w-5 h-5 text-green-400 ml-2" viewBox="0 0 20 20">
              <circle
                className="opacity-20"
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                d="M10 2a8 8 0 0 1 0 16"
              />
            </svg>
          </div>
          {/* Step 3: Generating Report */}
          <div className="flex items-start bg-gray-100 rounded-lg px-4 py-3 border border-gray-200 opacity-70">
            <span className="flex-shrink-0 mt-0.5 text-gray-400">
              {/* Icon: Report */}
              <svg width="24" height="24" fill="none" className="mr-2">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <div className="ml-2">
              <div className="font-semibold text-gray-400">Generating Report</div>
              <div className="text-gray-400 text-sm">Preparing treatment recommendations</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Did You Know */}
        <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 flex items-center">
          <span className="text-green-400 mr-2">
            {/* Info Icon */}
            <svg width="18" height="18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 13V9M9 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="text-sm text-gray-700">
            <b>DID YOU KNOW?</b> Our AI has been trained on over 50,000 plant images and can identify more than 15 common plant diseases with 96% accuracy.
          </span>
        </div>
      </div>
    </div>
  );
}