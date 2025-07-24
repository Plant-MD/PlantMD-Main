'use client';

import React from 'react';
import { Upload, Video, Image as ImageIcon } from 'lucide-react';

interface ImageUploadAreaProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera
}) => {
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center transition-all duration-300 ${
        isDragging
          ? 'border-mint bg-mint/5 scale-105'
          : 'border-sage/30 hover:border-mint hover:bg-mint/5'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="relative space-y-4 sm:space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-mint/20 to-forest/20 rounded-xl sm:rounded-2xl flex items-center justify-center animate-float">
              <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-forest" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-mint to-forest rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
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
            onClick={onBrowseFiles}
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
  );
};

export default ImageUploadArea;