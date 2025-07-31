"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useHeroAnalysis } from "@/hooks/useHeroAnalysis";
import HeroHeader from "./components/HeroHeader";
import HeroUploadContainer from "./components/HeroUploadContainer";
import UploadPopup from "./components/UploadPopup";
import AnalysisLoadingPopup from "./components/AnalysisLoadingPopup";
import { useRouter } from "next/navigation";

function Hero() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showAnalysisLoading, setShowAnalysisLoading] = useState(false);
  const router = useRouter();
  
  const {
    session,
    isProcessing,
    showCamera,
    selectedPlant,
    cameraHook,
    uploadHook,
    handleStartCamera,
    handleStopCamera,
    handleCapturePhoto,
    handleBrowseFiles,
    handleAnalyze,
    handleClearImage,
    handlePlantChange,
    handleDismissError,
  } = useHeroAnalysis();

  const [localIsProcessing, setLocalIsProcessing] = useState(false);

  const handlePopupAnalyze = (imageData: string, plantType: 'tomato' | 'corn') => {
    console.log('handlePopupAnalyze called with:', { hasImage: !!imageData, plantType });
    // Close the upload popup
    setShowUploadPopup(false);
    // Show the analysis loading popup
    setShowAnalysisLoading(true);
    // Trigger analysis with the selected plant type and image data
    handleAnalyzeWithImage(imageData, plantType);
  };

  const handleAnalyzeWithImage = async (imageData: string, plantType: 'tomato' | 'corn') => {
    console.log('handleAnalyzeWithImage called with:', { hasImage: !!imageData, plantType });
    
    if (!imageData) {
      console.error('No image available for analysis');
      setShowAnalysisLoading(false);
      return;
    }

    console.log('Starting analysis with image and plant type:', plantType);
    setLocalIsProcessing(true);
    
    const formData = new FormData();

    try {
      const blob = dataURLtoBlob(imageData);
      formData.append('file', blob, 'plant.jpg');
      formData.append('plant', plantType);

      console.log('Sending request to /api/analyze');
      
      // Start a minimum loading time promise
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 8000)); // 8 seconds minimum
      
      // Start the API request
      const apiRequest = fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      // Wait for both the API response AND minimum loading time
      const [response] = await Promise.all([apiRequest, minLoadingTime]);

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      if (data.success && data.predictions) {
        console.log('Redirecting to diagnosis page with predictions');
        // Close the loading popup before redirecting
        setShowAnalysisLoading(false);
        router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${plantType}`);
      } else {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from analysis service');
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
      setShowAnalysisLoading(false);
    } finally {
      setLocalIsProcessing(false);
    }
  };

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

  const handleBrowseFilesClick = () => {
    // Just open the popup directly - no file processing in hero section
    setShowUploadPopup(true);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function is no longer needed since we're not processing files in hero section
    // The popup will handle all file processing
  };

  return (
    <section className="relative flex min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute right-10 top-40 h-64 w-64 animate-pulse rounded-full bg-emerald-100 opacity-30 mix-blend-multiply blur-xl delay-1000" />
      </div>

      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-12 top-24" width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id="leaves1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 4 Q14 8 10 12 Q6 8 10 4" fill="#16a34a" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves1)" />
        </svg>
        <svg className="absolute bottom-24 right-12" width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <pattern id="leaves2" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="#15803d" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves2)" />
        </svg>
      </div>

      <div className="flex w-full h-screen">
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/hero_bg.png"
            alt="temp_background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative z-10">
          
          <HeroHeader />

          <HeroUploadContainer
            showCamera={showCamera}
            stream={cameraHook.stream}
            cameraReady={cameraHook.cameraReady}
            cameraError={cameraHook.cameraError}
            selectedImage={null} // Always null to keep hero section clean
            isDragging={false} // Always false
            selectedPlant={selectedPlant}
            isProcessing={false} // Always false in hero section
            onDragOver={() => {}} // Disabled - only popup handles uploads
            onDragLeave={() => {}} // Disabled - only popup handles uploads
            onDrop={() => {}} // Disabled - only popup handles uploads
            onBrowseFiles={handleBrowseFilesClick}
            onStartCamera={handleStartCamera}
            onPlantChange={handlePlantChange}
            onCapturePhoto={handleCapturePhoto}
            onStopCamera={handleStopCamera}
            onClearImage={handleClearImage}
            onAnalyze={() => {}} // Disabled - only popup handles analysis
            onDismissError={handleDismissError}
            fileInputRef={uploadHook.fileInputRef}
            canvasRef={cameraHook.canvasRef}
            onFileInputChange={() => {}} // Disabled - only popup handles file input
          />

        </div>
      </div>

      {/* Upload Popup */}
      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onAnalyze={handlePopupAnalyze}
        isProcessing={localIsProcessing}
        initialImageData={null} // Always null - popup handles its own image
        selectedPlantType={selectedPlant} // Use the selectedPlant from the hook
      />

      {/* Analysis Loading Popup */}
      <AnalysisLoadingPopup
        isOpen={showAnalysisLoading}
        plantType={selectedPlant}
        onClose={() => setShowAnalysisLoading(false)}
      />
    </section>
  );
}

export default Hero;