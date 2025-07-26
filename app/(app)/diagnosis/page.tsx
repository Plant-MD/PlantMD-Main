'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import DiagnosisCard from './DiagnosisCard';
import { useSearchParams } from 'next/navigation';

export default function DiagnosisPage() {
  const searchParams = useSearchParams();
  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 [DIAGNOSIS] useEffect triggered, checking for predictions...');
    const queryPredictions = searchParams.get('predictions');
    console.log('📋 [DIAGNOSIS] Query predictions found:', queryPredictions ? 'Yes' : 'No');
    
    if (queryPredictions) {
      try {
        console.log('🔓 [DIAGNOSIS] Decoding predictions from URL...');
        const decodedPredictions = JSON.parse(decodeURIComponent(queryPredictions));
        console.log('📊 [DIAGNOSIS] Decoded predictions:', decodedPredictions);
        
        const formattedDiagnoses = decodedPredictions.map((item: any) => ({
          disease: item.class,
          confidence: parseFloat(item.confidence) * 100,
          severity: 'Moderate',
          description: 'Detailed analysis of the plant condition is in progress.',
          symptoms: ['Spots on leaves', 'Yellowing'],
          causes: ['Fungal infection', 'Moisture'],
        }));
        console.log('✅ [DIAGNOSIS] Formatted diagnoses:', formattedDiagnoses);
        setDiagnoses(formattedDiagnoses);
      } catch (error) {
        console.error('💥 [DIAGNOSIS] Failed to parse predictions:', error);
        setDiagnoses([]);
      }
    } else {
      console.log('❌ [DIAGNOSIS] No predictions found in URL parameters');
      setDiagnoses([]);
    }
    console.log('🏁 [DIAGNOSIS] Setting loading to false');
    setLoading(false);
  }, [searchParams]);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Analyzing your plant...</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Clean Header */}
          <div className="text-center mb-16">
            {/* Professional Success Icon */}
            <div className="relative mx-auto mb-8 w-20 h-20">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative overflow-hidden">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                {/* Green flare animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/40 to-transparent -skew-x-12 animate-flare-sweep"></div>
              </div>
              {/* Subtle pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-pulse"></div>
            </div>
            
            {/* Clean Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Diagnosis Complete
            </h1>
            
            {/* Professional Description */}
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Our AI has analyzed your plant and identified potential issues. Review the detailed analysis below.
            </p>
          </div>

          {/* Clean Results Section */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200 border-t-green-600 mx-auto mb-4"></div>
              <p className="text-green-700 font-medium">Processing your results...</p>
            </div>
          ) : diagnoses.length > 0 ? (
            <div className="space-y-6">
              {diagnoses.map((item, i) => (
                <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <DiagnosisCard {...item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Yet</h3>
              <p className="text-gray-600 mb-6">Scan a plant to view diagnosis results here.</p>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Start Scanning
              </Link>
            </div>
          )}

          {/* Clean Footer */}
          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/" passHref>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Scan Another Plant
              </button>
            </Link>
            <Link href="/feedback" passHref>
              <button className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-colors">
                Share Feedback
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}