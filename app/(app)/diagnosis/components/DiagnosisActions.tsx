'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DiagnosisActionsProps {
  onSaveReport?: () => void;
  onShareResults?: () => void;
}

export default function DiagnosisActions({ onSaveReport, onShareResults }: DiagnosisActionsProps) {
  const router = useRouter();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleFeedbackClick = () => {
    // Navigate to feedback page with diagnosis context
    router.push('/feedback?source=diagnosis');
  };

  const handleSaveReport = () => {
    if (onSaveReport) {
      onSaveReport();
    } else {
      // Default save behavior
      console.log('Saving diagnosis report...');
      // You can implement actual save functionality here
    }
  };

  const handleShareResults = () => {
    if (onShareResults) {
      onShareResults();
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: 'Plant Diagnosis Results',
          text: 'Check out my plant diagnosis results from PlantMD!',
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 animate-fade-in-up stagger-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        What would you like to do next?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Scan Another Plant */}
        <Link href="/" passHref>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate card-hover">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Scan Another
          </button>
        </Link>

        {/* View Treatment Options */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate card-hover">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Treatment Guide
        </button>

        {/* Save Report */}
        <button 
          onClick={handleSaveReport}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate card-hover"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Report
        </button>

        {/* Share Results */}
        <button 
          onClick={handleShareResults}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 btn-animate card-hover"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share Results
        </button>
      </div>

      {/* Feedback Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in-up stagger-5">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Was this diagnosis helpful?</p>
          <button 
            onClick={handleFeedbackClick}
            className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto btn-animate card-hover"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Share Feedback
          </button>
        </div>
      </div>
    </div>
  );
} 