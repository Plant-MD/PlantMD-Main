'use client';

import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ImagePreviewProps {
  selectedImage: string;
  isProcessing: boolean;
  onClearImage?: () => void;
  onAnalyze?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  selectedImage,
  isProcessing,
  onClearImage,
  onAnalyze
}) => {
  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="relative group">
        <img
          src={selectedImage}
          alt="Selected plant"
          className="w-full max-h-64 sm:max-h-96 object-contain rounded-xl sm:rounded-2xl shadow-lg"
        />
        {onClearImage && (
          <button
            onClick={onClearImage}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}

        <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent animate-scan opacity-50"></div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg sm:text-2xl font-bold text-primary-dark mb-2 sm:mb-4">
          Image Ready for Analysis
        </h3>
        <p className="text-sm sm:text-base text-sage mb-4 sm:mb-8 px-2">
          Our AI will examine your plant for diseases, pests, and health issues.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center">
          {onAnalyze && (
            <button
              onClick={onAnalyze}
              disabled={isProcessing}
              className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden touch-manipulation"
            >
              {isProcessing && (
                <div className="absolute inset-0 bg-gradient-to-r from-mint to-forest animate-pulse"></div>
              )}
              <div className="relative flex items-center">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    Analyze Plant
                  </>
                )}
              </div>
            </button>
          )}

          {onClearImage && (
            <button
              onClick={onClearImage}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-primary-dark font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
            >
              Choose Different Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;