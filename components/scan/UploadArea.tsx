import React from 'react';
import { Upload, Video, ImageIcon, Sparkles, X } from 'lucide-react';

interface UploadAreaProps {
  selectedImage: string | null;
  isDragging: boolean;
  isProcessing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (file: File) => void;
  onStartCamera: () => void;
  onClearImage: () => void;
  onAnalyze: () => void;
  setIsDragging: (dragging: boolean) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  selectedImage,
  isDragging,
  isProcessing,
  fileInputRef,
  onFileSelect,
  onStartCamera,
  onClearImage,
  onAnalyze,
  setIsDragging
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl mx-3 sm:mx-0">
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-mint bg-mint/5 scale-105'
              : 'border-sage/30 hover:border-mint hover:bg-mint/5'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4 sm:space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-mint/20 to-forest/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-forest" />
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-primary-dark mb-2 sm:mb-3">
                Drop your image here
              </h3>
              <p className="text-sm sm:text-base text-sage mb-4 sm:mb-8 px-2">
                or choose an option below • Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white font-semibold rounded-lg sm:rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
              >
                <Upload className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Browse Files
              </button>

              <button
                onClick={onStartCamera}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-forest font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
              >
                <Video className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Use Camera
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-8">
          <div className="relative group">
            <img
              src={selectedImage}
              alt="Selected plant"
              className="w-full max-h-64 sm:max-h-96 object-contain rounded-xl sm:rounded-2xl shadow-lg"
            />
            <button
              onClick={onClearImage}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg sm:text-2xl font-bold text-primary-dark mb-2 sm:mb-4">
              Image Ready for Analysis
            </h3>
            <p className="text-sm sm:text-base text-sage mb-4 sm:mb-8 px-2">
              Our AI will examine your plant for diseases, pests, and health issues.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 justify-center">
              <button
                onClick={onAnalyze}
                disabled={isProcessing}
                className="inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
              >
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
              </button>

              <button
                onClick={onClearImage}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-primary-dark font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
              >
                Choose Different Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;