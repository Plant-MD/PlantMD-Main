'use client';
export const dynamic = 'force-dynamic';

import React from 'react';

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
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="text-green-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-.01-6a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{disease}</h2>
        </div>
        <span
          className={`font-semibold text-xs md:text-sm px-3 py-1 rounded-full ${confidenceColor} bg-green-50`}
        >
          {confidence}% confident
        </span>
      </div>

      {/* Severity */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${severityColor}`}
      >
        {severity}
      </span>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-5">{description}</p>

      {/* Divider */}
      <hr className="border-gray-200 mb-4" />

      {/* Symptoms & Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <h3 className="font-semibold text-red-700 mb-2 flex items-center">
            ⚠️ <span className="ml-1">Symptoms Detected</span>
          </h3>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
            💡 <span className="ml-1">Likely Causes</span>
          </h3>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {causes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
