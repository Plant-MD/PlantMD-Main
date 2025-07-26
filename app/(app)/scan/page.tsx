'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Layout/Header';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';
import ScanLayout from '@/components/scan/ScanLayout';

const ScanPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<'tomato' | 'corn'>('tomato');
  const router = useRouter();

  const {
    stream,
    cameraError,
    cameraReady,
    setCameraError,
    startCamera,
    stopCamera,
    capturePhoto,
    canvasRef
  } = useCamera();

  const {
    selectedImage,
    setSelectedImage, 
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    clearImage,
    browseFiles
  } = useImageUpload();

  const handleStartCamera = async () => {
    await startCamera();
    setShowCamera(true);
  };

  const handleStopCamera = () => {
    stopCamera();
    setShowCamera(false);
  };

  const handleCapturePhoto = (videoElement?: HTMLVideoElement) => {
    const imageDataUrl = capturePhoto(videoElement);
    if (imageDataUrl) {
      setSelectedImage(imageDataUrl); 
      setShowCamera(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    const formData = new FormData();
    
    const dataURLtoBlob = (dataURL: string) => {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    try {
      const blob = dataURLtoBlob(selectedImage);
      formData.append('file', blob, 'plant.jpg');
      formData.append('plant', selectedPlant);
    } catch (err) {
      console.error('Blob creation failed', err);
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      
      if (data.success && data.predictions) {
        router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${selectedPlant}`);
      } else {
        throw new Error('Invalid response from analysis service');
      }
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-soft-beige to-pale">
      <main className="pt-20 sm:pt-24 pb-6 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ScanLayout
            selectedImage={selectedImage}
            isProcessing={isProcessing}
            isDragging={isDragging}
            selectedPlant={selectedPlant}
            showCamera={showCamera}
            stream={stream}
            cameraReady={cameraReady}
            cameraError={cameraError}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onBrowseFiles={browseFiles}
            onStartCamera={handleStartCamera}
            onPlantChange={setSelectedPlant}
            onClearImage={clearImage}
            onAnalyze={handleAnalyze}
            onCapturePhoto={handleCapturePhoto}
            onStopCamera={handleStopCamera}
            onDismissError={() => setCameraError(null)}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
    </div>
  );
};

export default ScanPage;