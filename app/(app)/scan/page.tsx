'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScanLayout from '@/components/scan/ScanLayout';
import ProcessingPopup from '@/components/scan/ProcessingPopup';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';

const ScanPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
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

  // Helper to convert base64 dataURL to Blob
  function dataURLtoBlob(dataurl: string) {
    if (!dataurl) throw new Error('No image data provided');
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    if (!match) throw new Error('Invalid data URL format');
    const mime = match[1];
    const bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  }

  // Debug: log when popup is opened/closed
  const setShowProcessingPopupDebug = (val: boolean) => {
    console.log('setShowProcessingPopup called with:', val, new Error().stack);
    setShowProcessingPopup(val);
  };

  const handleAnalyze = async () => {
    console.log('🔍 [SCAN PAGE] handleAnalyze called');
    if (!selectedImage) {
      console.log('❌ [SCAN PAGE] No image selected for analysis');
      return;
    }
    console.log('✅ [SCAN PAGE] Image found, setting processing state');
    setIsProcessing(true);
    setShowProcessingPopupDebug(true);
    console.log('🎯 [SCAN PAGE] Processing popup opened');
    // Popup stays open until user closes it or analysis is started
  };

  const handleStartAnalysis = async (category: string) => {
    console.log('🚀 [SCAN PAGE] handleStartAnalysis called with category:', category);
    if (!selectedImage) {
      console.log('❌ [SCAN PAGE] No image selected for analysis');
      return;
    }
    console.log('✅ [SCAN PAGE] Starting analysis process');
    setIsProcessing(true);
    try {
      console.log('📸 [SCAN PAGE] Converting image to blob...');
      // Convert base64 image to Blob
      if (!selectedImage) throw new Error('No image selected');
      const imageBlob = dataURLtoBlob(selectedImage);
      console.log('✅ [SCAN PAGE] Image blob created, size:', imageBlob.size, 'bytes');
      
      console.log('📦 [SCAN PAGE] Creating FormData...');
      const formData = new FormData();
      formData.append('plant', category); // 'tomato' or 'corn'
      formData.append('file', imageBlob, 'plant-image.jpg');
      console.log('✅ [SCAN PAGE] FormData created with plant:', category);

      console.log('🌐 [SCAN PAGE] Sending request to /api/analyze...');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      console.log('📡 [SCAN PAGE] Response received, status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [SCAN PAGE] API Error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      console.log('✅ [SCAN PAGE] API request successful, parsing response...');
      // Parse response and redirect to diagnosis page
      const data = await response.json();
      console.log('📊 [SCAN PAGE] API Response data:', data);
      
      if (data && data.predictions) {
        console.log('🎯 [SCAN PAGE] Predictions found, encoding for URL...');
        const encoded = encodeURIComponent(JSON.stringify(data.predictions));
        console.log('🔗 [SCAN PAGE] Redirecting to diagnosis page with predictions');
        router.push(`/diagnosis?predictions=${encoded}`);
        console.log('✅ [SCAN PAGE] Navigation initiated');
        // Do not close the popup automatically
      } else {
        console.error('❌ [SCAN PAGE] No predictions in response:', data);
        alert('No predictions returned from API.');
        // Do not close the popup
      }
    } catch (error) {
      console.error('💥 [SCAN PAGE] Analysis failed:', error);
      alert('Failed to start analysis: ' + (error as Error).message);
      // Do not close the popup
    } finally {
      console.log('🏁 [SCAN PAGE] Analysis process completed, setting isProcessing to false');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-2 px-3 sm:px-4 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="w-full md:flex-1">
          {/* Upload area if no image is selected */}
          {!selectedImage && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 shadow-xl mx-3 sm:mx-0">
                <ScanLayout
                  selectedImage={null}
                  isProcessing={false}
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
                  onAnalyze={undefined}
                  onCapturePhoto={handleCapturePhoto}
                  onStopCamera={handleStopCamera}
                  onDismissError={() => setCameraError(null)}
                  fileInputRef={fileInputRef}
                  handleFileInputChange={handleFileInputChange}
                />
              </div>
            </div>
          )}

          {/* Image preview and Analyze button if image is selected */}
          {selectedImage && (
            <div className="mb-8 flex flex-col items-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 shadow-xl mx-3 sm:mx-0 w-full max-w-lg">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full max-h-64 sm:max-h-96 object-contain rounded-xl sm:rounded-2xl shadow-lg mb-4"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="w-full group relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden touch-manipulation mb-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></span>
                      Processing...
                    </>
                  ) : (
                    <>Analyze</>
                  )}
                </button>
                <button
                  onClick={clearImage}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-primary-dark font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Processing Popup */}
      <ProcessingPopup 
        isOpen={showProcessingPopup} 
        onClose={() => setShowProcessingPopupDebug(false)}
        selectedImage={selectedImage}
        onStartAnalysis={handleStartAnalysis}
      />
      {/* Hidden canvas for camera capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ScanPage;