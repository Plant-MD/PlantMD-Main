"use client";
import React from "react";
import Image from "next/image";
import { useHeroAnalysis } from "@/hooks/useHeroAnalysis";
import HeroHeader from "./components/HeroHeader";
import HeroUploadContainer from "./components/HeroUploadContainer";
import HeroAuthNotice from "./components/HeroAuthNotice";

function Hero() {
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
            src="/hero_bg.jpg"
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
            selectedImage={uploadHook.selectedImage}
            isDragging={uploadHook.isDragging}
            selectedPlant={selectedPlant}
            isProcessing={isProcessing}
            onDragOver={uploadHook.handleDragOver}
            onDragLeave={uploadHook.handleDragLeave}
            onDrop={uploadHook.handleDrop}
            onBrowseFiles={handleBrowseFiles}
            onStartCamera={handleStartCamera}
            onPlantChange={handlePlantChange}
            onCapturePhoto={handleCapturePhoto}
            onStopCamera={handleStopCamera}
            onClearImage={handleClearImage}
            onAnalyze={handleAnalyze}
            onDismissError={handleDismissError}
            fileInputRef={uploadHook.fileInputRef}
            canvasRef={cameraHook.canvasRef}
            onFileInputChange={uploadHook.handleFileInputChange}
          />

          <HeroAuthNotice session={session} />
        </div>
      </div>
    </section>
  );
}

export default Hero;