'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScanLayout from '@/components/scan/ScanLayout';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';

const ScanPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
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
    } catch (err) {
      console.error('Blob creation failed', err);
    }

    try {
      const response = await fetch('https://api.plantmd.xyz/predict', {
        method: 'POST',
        body: formData,
        redirect: "follow"
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const predictions = data.predictions;
      router.push(`/processing?predictions=${encodeURIComponent(JSON.stringify(predictions))}`);
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-2 px-3 sm:px-4 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <ScanLayout
          selectedImage={selectedImage}
          isProcessing={isProcessing}
          isDragging={isDragging}
          showCamera={showCamera}
          stream={stream}
          cameraReady={cameraReady}
          cameraError={cameraError}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onBrowseFiles={browseFiles}
          onStartCamera={handleStartCamera}
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
    </div>
  );
};

export default ScanPage;