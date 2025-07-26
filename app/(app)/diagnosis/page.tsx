'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import DiagnosisCard from './DiagnosisCard';
import DiagnosisHeader from './components/DiagnosisHeader';
import DiagnosisActions from './components/DiagnosisActions';
import DiagnosisSummary from './components/DiagnosisSummary';
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

  // Calculate statistics
  const diagnosisCount = diagnoses.length;
  const totalConfidence = diagnosisCount > 0 
    ? diagnoses.reduce((sum, d) => sum + d.confidence, 0) / diagnosisCount 
    : 0;

  const handleSaveReport = () => {
    // Implementation for saving report
    console.log('Saving diagnosis report...');
    // You can implement actual save functionality here
  };

  const handleShareResults = () => {
    // Implementation for sharing results
    console.log('Sharing diagnosis results...');
    // You can implement actual share functionality here
  };

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
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200 border-t-green-600 mx-auto mb-4"></div>
              <p className="text-green-700 font-medium">Processing your results...</p>
            </div>
          ) : diagnoses.length > 0 ? (
            <>
              {/* Diagnosis Header */}
              <DiagnosisHeader 
                diagnosisCount={diagnosisCount}
                totalConfidence={totalConfidence}
              />

              {/* Diagnosis Summary */}
              <DiagnosisSummary diagnoses={diagnoses} />

              {/* Detailed Diagnosis Cards */}
              <div className="space-y-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Detailed Analysis
                </h2>
                {diagnoses.map((item, i) => (
                  <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                    <DiagnosisCard {...item} />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <DiagnosisActions 
                onSaveReport={handleSaveReport}
                onShareResults={handleShareResults}
              />
            </>
          ) : (
            /* No Results State */
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
        </div>
      </div>
    </Suspense>
  );
}