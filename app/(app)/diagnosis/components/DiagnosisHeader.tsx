'use client';

import React from 'react';

interface DiagnosisHeaderProps {
  diagnosisCount: number;
  totalConfidence: number;
}

export default function DiagnosisHeader({ diagnosisCount, totalConfidence }: DiagnosisHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 animate-scale-in">
      {/* Success Icon with Animation */}
      <div className="relative mx-auto mb-6 w-20 h-20 animate-bounce-in">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative overflow-hidden animate-pulse-glow">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {/* Green flare animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/40 to-transparent -skew-x-12 animate-pulse"></div>
        </div>
        {/* Subtle pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-ping opacity-20"></div>
      </div>
      
      {/* Title and Description */}
      <div className="text-center mb-6 animate-fade-in-up stagger-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
          Diagnosis Complete
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Our AI has analyzed your plant and identified {diagnosisCount} potential issue{diagnosisCount !== 1 ? 's' : ''}. 
          Review the detailed analysis below.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center card-hover animate-slide-in-left stagger-2">
          <div className="text-3xl font-bold text-blue-600 mb-2">{diagnosisCount}</div>
          <div className="text-blue-700 font-medium">Issues Detected</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 text-center card-hover animate-slide-in-right stagger-3">
          <div className="text-3xl font-bold text-green-600 mb-2">{totalConfidence.toFixed(1)}%</div>
          <div className="text-green-700 font-medium">Average Confidence</div>
        </div>
      </div>
    </div>
  );
} 