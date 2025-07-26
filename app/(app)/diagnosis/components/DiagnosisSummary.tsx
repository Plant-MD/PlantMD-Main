'use client';

import React from 'react';

interface DiagnosisSummaryProps {
  diagnoses: Array<{
    disease: string;
    confidence: number;
    severity: string;
  }>;
}

export default function DiagnosisSummary({ diagnoses }: DiagnosisSummaryProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Diagnosis Summary
      </h3>
      
      <div className="space-y-3">
        {diagnoses.map((diagnosis, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{diagnosis.disease}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(diagnosis.severity)}`}>
                    {diagnosis.severity}
                  </span>
                  <span className={`text-sm font-medium ${getConfidenceColor(diagnosis.confidence)}`}>
                    {diagnosis.confidence.toFixed(1)}% confident
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    diagnosis.confidence >= 80 ? 'bg-green-500' : 
                    diagnosis.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${diagnosis.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{diagnoses.length}</div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {diagnoses.filter(d => d.severity.toLowerCase() === 'moderate').length}
            </div>
            <div className="text-sm text-gray-600">Moderate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {diagnoses.filter(d => d.severity.toLowerCase() === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
} 