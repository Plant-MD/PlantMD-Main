import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCamera } from '@/hooks/useCamera';
import { useImageUpload } from '@/hooks/useImageUpload';

export const useHeroAnalysis = () => {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<'tomato' | 'corn'>('tomato');

  const cameraHook = useCamera();
  const uploadHook = useImageUpload();

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

  const handleStartCamera = async () => {
    await cameraHook.startCamera();
    setShowCamera(true);
  };

  const handleStopCamera = () => {
    cameraHook.stopCamera();
    setShowCamera(false);
  };

  const handleCapturePhoto = (videoElement?: HTMLVideoElement) => {
    const imageDataUrl = cameraHook.capturePhoto(videoElement);
    if (imageDataUrl) {
      uploadHook.setSelectedImage(imageDataUrl); 
      setShowCamera(false);
    }
  };

  const handleBrowseFiles = () => {
    uploadHook.browseFiles();
  };

  const handleAnalyze = async () => {

    if (!uploadHook.selectedImage) return;

    setIsProcessing(true);
    
    const formData = new FormData();

    try {
      const blob = dataURLtoBlob(uploadHook.selectedImage);
      formData.append('file', blob, 'plant.jpg');
      formData.append('plant', selectedPlant);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.predictions) {
        router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}&plant=${selectedPlant}`);
      } else {
        throw new Error('Invalid response from analysis service');
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearImage = () => {
    uploadHook.clearImage();
    setShowCamera(false);
  };

  const handlePlantChange = (plant: 'tomato' | 'corn') => {
    setSelectedPlant(plant);
  };

  const handleDismissError = () => {
    cameraHook.setCameraError(null);
  };

  return {
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
  };
};