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
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="text-yellow-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-.01-6a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-green-900">{disease}</h2>
        </div>
        <div className={`font-semibold text-sm px-3 py-1 rounded ${confidenceColor} bg-green-100`}>
          {confidence}% confident
        </div>
      </div>

      <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${severityColor}`}>
        {severity}
      </div>

      <p className="text-sm text-gray-700 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-medium text-red-700 mb-1">⚠️ Symptoms Detected</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {symptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-blue-700 mb-1">💡 Likely Causes</h3>
          <ul className="list-disc ml-5 text-gray-600">
            {causes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
