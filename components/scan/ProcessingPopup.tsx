'use client';

import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface ProcessingPopupProps {
  isOpen: boolean;
  onClose?: () => void;
  selectedImage?: string | null;
  onStartAnalysis?: (category: string) => void;
}

const categories = [
  'tomato',
  'corn',
];

const ProcessingPopup: React.FC<ProcessingPopupProps> = ({ isOpen, onClose, selectedImage, onStartAnalysis }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleStartAnalysis = async () => {
    console.log('🎯 [POPUP] handleStartAnalysis called');
    if (!selectedCategory || !onStartAnalysis) {
      console.log('❌ [POPUP] Missing category or onStartAnalysis function');
      return;
    }
    
    console.log('✅ [POPUP] Starting analysis with category:', selectedCategory);
    setIsAnalyzing(true);
    try {
      console.log('📞 [POPUP] Calling onStartAnalysis function...');
      await onStartAnalysis(selectedCategory);
      console.log('✅ [POPUP] onStartAnalysis completed successfully');
      // Don't close popup here - let the parent component handle it
    } catch (error) {
      console.error('💥 [POPUP] Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl flex w-full max-w-3xl mx-4 min-h-[400px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        {/* Left: Image */}
        <div className="w-1/2 p-6 flex flex-col items-center justify-center border-r border-gray-100 bg-gray-50 rounded-l-2xl">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Plant for analysis"
              className="w-full h-72 object-contain rounded-xl shadow"
            />
          ) : (
            <div className="w-full h-72 flex items-center justify-center text-gray-400 bg-gray-100 rounded-xl">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
        {/* Right: Category Selection */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-blue-50 border-l-4 border-blue-300 min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Select Category</h2>
          <p className="text-gray-500 text-sm mb-6 text-center">Choose the most relevant category for your plant image.</p>
          <div className="flex flex-col items-center">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              disabled={isAnalyzing}
              className="w-full max-w-xs px-4 py-3 mb-6 border border-gray-300 rounded-lg text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition disabled:opacity-50"
            >
              <option value="" disabled>Select a category...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              className="w-full max-w-xs bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCategory || isAnalyzing}
              onClick={handleStartAnalysis}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Start Analysis'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPopup; 