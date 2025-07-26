'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';

type DiagnosisCardProps = {
  disease: string;
  severity: string;
  confidence: number;
  description: string;
  symptoms: string[];
  causes: string[];
  severityColor?: string;
  confidenceColor?: string;
};

export default function DiagnosisCard({
  disease,
  severity,
  confidence,
  description,
  symptoms,
  causes,
  severityColor = 'bg-yellow-100 text-yellow-700',
  confidenceColor = 'text-green-700',
}: DiagnosisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'text-green-600 bg-green-100';
    if (conf >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityColor = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'high':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'moderate':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-.01-6a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
        );
      case 'low':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-.01-6a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center">
            {getSeverityIcon(severity)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{disease}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(severity)}`}>
                {severity} Severity
              </div>
              <div className={`font-semibold text-sm px-3 py-1 rounded-full ${getConfidenceColor(confidence)}`}>
                {confidence.toFixed(1)}% confident
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2} 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symptoms */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-.01-6a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
            <h3 className="font-semibold text-red-800">Symptoms Detected</h3>
          </div>
          <ul className="space-y-2">
            {symptoms.map((symptom, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Causes */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="font-semibold text-blue-800">Likely Causes</h3>
          </div>
          <ul className="space-y-2">
            {causes.map((cause, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          {/* Treatment Recommendations */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="font-semibold text-green-800">Treatment Recommendations</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Remove affected leaves and dispose properly</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Apply appropriate fungicide treatment</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Improve air circulation around the plant</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Monitor plant health regularly</span>
              </li>
            </ul>
          </div>

          {/* Prevention Tips */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-semibold text-purple-800">Prevention Tips</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Avoid overhead watering</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Maintain proper plant spacing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Use disease-resistant plant varieties</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Keep garden tools clean and disinfected</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
          View Treatment Options
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Learn More
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Save Report
        </button>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}
