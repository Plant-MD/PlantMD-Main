// components/scan/ScanLayout.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import CameraView from '@/components/scan/CameraView';
import ImageUploadArea from '@/components/scan/ImageUploadArea';
import TipsSection from '@/components/scan/TipsSection';
import ErrorAlert from '@/components/scan/ErrorAlert';

interface ScanLayoutProps {
  selectedImage?: string | null;
  isProcessing?: boolean;
  isDragging: boolean;
  showCamera: boolean;
  stream: MediaStream | null;
  cameraReady: boolean;
  cameraError?: string | null;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage?: () => void;
  onAnalyze?: () => void;
  onCapturePhoto: (videoElement?: HTMLVideoElement) => void;
  onStopCamera: () => void;
  onDismissError?: () => void;
}

const ScanLayout: React.FC<ScanLayoutProps> = ({
  selectedImage,
  isProcessing = false,
  isDragging,
  showCamera,
  stream,
  cameraReady,
  cameraError,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera,
  fileInputRef,
  handleFileInputChange,
  onClearImage,
  onAnalyze,
  onCapturePhoto,
  onStopCamera,
  onDismissError
}) => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-center">
      <div className="sprouty ml-auto max-w-md mr-10">
        <Image
          src="/sprouty.png"
          alt="Hero"
          width={350}
          height={350}
          className="mx-auto"
        />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight text-right">
          <span className="text-[#054714] font-oswald">
            Diagnose Plant Disease
          </span>{' '}
          <span className="text-black text-5xl">Instantly</span>
          <br />
          <span className="text-[#054714] font-oswald">with PlantMD</span>
        </h1>
      </div>
      <div className="w-full md:flex-1">
        {cameraError && (
          <ErrorAlert 
            error={cameraError} 
            onDismiss={onDismissError} 
          />
        )}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl mx-3 sm:mx-0">
          {showCamera ? (
            <CameraView
              stream={stream}
              cameraReady={cameraReady}
              onCapturePhoto={onCapturePhoto}
              onStopCamera={onStopCamera}
            />
          ) : (
            <ImageUploadArea
              isDragging={isDragging}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onBrowseFiles={onBrowseFiles}
              onStartCamera={onStartCamera}
              fileInputRef={fileInputRef}
              handleFileInputChange={handleFileInputChange}
              selectedImage={selectedImage}
            />
          )}
        </div>
        <TipsSection />
      </div>
    </div>
  );
};

export default ScanLayout;