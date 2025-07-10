'use client'; 

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Camera, Upload, X, Image as ImageIcon, Sparkles, Video, VideoOff, AlertCircle } from 'lucide-react';

const ScanPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCameraReady(false);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported on this device');
      return;
    }

    try {
      let mediaStream: MediaStream | null = null;
      
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 }
          }
        });
      } catch (envError) {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 }
          }
        });
      }
      
      setStream(mediaStream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            setCameraReady(true);
          };
          videoRef.current.play().catch(playError => {
            console.error('Video play error:', playError);
            setCameraError('Failed to start video playback');
          });
        }
      }, 100);
      
    } catch (error: any) {
      console.error('Camera error:', error);
      let errorMessage = 'Unable to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported on this browser.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage += 'Camera constraints not supported.';
      } else {
        errorMessage += 'Please check your camera settings and try again.';
      }
      
      setCameraError(errorMessage);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraReady(false);
    setCameraError(null);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    console.log('Capturing photo...');
    
    if (!videoRef.current || !canvasRef.current || !cameraReady) {
      setCameraError('Camera not ready. Please wait and try again.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      setCameraError('Failed to capture image. Please try again.');
      return;
    }

    try {
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      setSelectedImage(imageDataUrl);
      stopCamera();
      
    } catch (captureError) {
      setCameraError('Failed to capture image. Please try again.');
    }
  }, [cameraReady, stopCamera]);

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/processing');
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  
  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-4 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-sage/20 mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-mint mr-2" />
            <span className="text-xs sm:text-sm font-medium text-primary-dark">AI Plant Analysis</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6 px-2">
            Upload Plant Image
          </h1>
          <p className="text-base sm:text-xl text-sage max-w-2xl mx-auto px-4">
            Take a clear photo of your plant or upload an existing image. Our AI will analyze it for diseases and health issues.
          </p>
        </div>

        {/* Camera Error */}
        {cameraError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 mx-3 sm:mx-0">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800 mb-1">Camera Access Error</h3>
                <p className="text-sm text-red-700">{cameraError}</p>
                <button 
                  onClick={() => setCameraError(null)}
                  className="text-xs text-red-600 underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Camera View */}
        {showCamera && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl mx-3 sm:mx-0">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold text-primary-dark mb-2">Camera Active</h3>
              <p className="text-sm sm:text-base text-sage">
                {cameraReady ? 'Position your plant in the frame and tap capture' : 'Loading camera...'}
              </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-video rounded-xl sm:rounded-2xl shadow-lg bg-gray-900"
                style={{ objectFit: 'cover' }}
              />
              
              {!cameraReady && (
                <div className="absolute inset-0 bg-gray-900/50 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Starting camera...</p>
                  </div>
                </div>
              )}
              
              {cameraReady && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-2 sm:inset-4 border-2 border-white/50 rounded-xl sm:rounded-2xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full"></div>
                </div>
              )}
              
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={stopCamera}
                  className="p-3 sm:p-4 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-200 touch-manipulation"
                >
                  <VideoOff className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                
                <button
                  onClick={capturePhoto}
                  disabled={!cameraReady}
                  className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm text-primary-dark rounded-full hover:bg-white transition-all duration-200 shadow-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera className="h-6 w-6 sm:h-8 sm:h-8" />
                </button>
              </div>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {/* Upload Area */}
        {!showCamera && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl mx-3 sm:mx-0">
            {!selectedImage ? (
              <div
                className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-mint bg-mint/5 scale-105'
                    : 'border-sage/30 hover:border-mint hover:bg-mint/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
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
                      onClick={() => fileInputRef.current?.click()}
                      className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-forest to-mint text-white font-semibold rounded-lg sm:rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                    >
                      <Upload className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                      Browse Files
                    </button>
                    
                    <button
                      onClick={startCamera}
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
                    onClick={clearImage}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  
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
                    <button
                      onClick={handleAnalyze}
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
                    
                    <button
                      onClick={clearImage}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-white/60 backdrop-blur-sm text-primary-dark font-semibold rounded-lg sm:rounded-xl border border-sage/20 hover:bg-white/80 transition-all duration-300 touch-manipulation"
                    >
                      Choose Different Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-pale/50 to-mint/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-sage/10 mx-3 sm:mx-0">
          <h3 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 sm:mb-6 flex items-center">
            <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-mint" />
            Tips for Best Results
          </h3>
          <div className="grid gap-3 sm:gap-6 sm:grid-cols-2">
            {[
              'Ensure good lighting and clear focus',
              'Include affected areas in the frame',
              'Avoid blurry or extremely close shots',
              'Capture multiple angles if needed'
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-sage">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ScanPage;