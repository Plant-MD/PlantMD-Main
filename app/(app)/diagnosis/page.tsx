'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import DiagnosisCard from './DiagnosisCard';
import { useSearchParams } from 'next/navigation';

export default function DiagnosisPage() {
  const searchParams = useSearchParams();
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve and parse predictions from search parameters
    const queryPredictions = searchParams.get('predictions');
    if (queryPredictions) {
      try {
        const decodedPredictions = JSON.parse(decodeURIComponent(queryPredictions));
        // Map the predictions to match DiagnosisCard props
        const formattedDiagnoses = decodedPredictions.map((item: any) => ({
          disease: item.class,
          confidence: parseFloat(item.confidence) * 100, // Convert to percentage
          severity: 'Moderate', // Placeholder value
          description: 'Detailed analysis of the plant condition is in progress.', // Placeholder value
          symptoms: ['Spots on leaves', 'Yellowing'], // Placeholder values
          causes: ['Fungal infection', 'Moisture'], // Placeholder values
        }));
        setDiagnoses(formattedDiagnoses);
      } catch (error) {
        console.error('Failed to parse predictions:', error);
        setDiagnoses([]);
      }
    } else {
      setDiagnoses([]);
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-4 py-8 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-900">Diagnosis Complete</h1>
            <p className="text-gray-600 mt-2">We’ve identified potential issues with your plant. Review the detailed analysis below.</p>
          </div>

          {/* Diagnosis Results */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : diagnoses.length > 0 ? (
            diagnoses.map((item, i) => <DiagnosisCard key={i} {...item} />)
          ) : (
            <div className="bg-white border border-green-200 rounded-xl shadow-md p-6 text-center">
              <p className="text-green-700 font-medium text-lg">No diagnosis results yet</p>
              <p className="text-gray-500 text-sm mt-2">Scan a plant to view the diagnosis summary here.</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/scan" passHref>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition">
                Scan Another Plant
              </button>
            </Link>
            <Link href="/feedback" passHref>
              <button className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-2 rounded-full text-sm font-medium transition">
                Share Feedback
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}