'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, VideoOff } from 'lucide-react';

interface CameraViewProps {
  stream: MediaStream | null;
  cameraReady: boolean;
  onCapturePhoto: (videoElement?: HTMLVideoElement) => void;
  onStopCamera: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  stream,
  cameraReady,
  onCapturePhoto,
  onStopCamera
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (stream && videoRef.current) {
      const video = videoRef.current;
      
      setVideoLoaded(false);
      
      const handleVideoLoad = () => {
        console.log('Video loaded successfully');
        setTimeout(() => {
          setVideoLoaded(true);
        }, 500);
      };

      const handleVideoError = (e: any) => {
        console.error('Video error:', e);
        setVideoLoaded(false);
      };

      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('canplay', handleVideoLoad);
      video.addEventListener('playing', handleVideoLoad);
      video.addEventListener('error', handleVideoError);

      video.srcObject = stream;
      
      video.play().catch(error => {
        console.error('Video play failed:', error);
      });

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('canplay', handleVideoLoad);
        video.removeEventListener('playing', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, [stream]);

  const isFullyReady = cameraReady && videoLoaded && stream;

  const handleCapture = () => {
    if (videoRef.current && isFullyReady) {
      onCapturePhoto(videoRef.current);
    } else {
      console.error('Video not ready for capture');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-lg sm:text-2xl font-bold text-primary-dark mb-2">Camera Active</h3>
        <p className="text-sm sm:text-base text-sage">
          {isFullyReady 
            ? 'Position your plant in the frame and tap capture' 
            : 'Starting camera...'}
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

        {!isFullyReady && (
          <div className="absolute inset-0 bg-gray-900/50 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm">Starting camera...</p>
              <p className="text-xs mt-1 opacity-75">
                Stream: {stream ? '✓' : '✗'} | 
                Camera: {cameraReady ? '✓' : '✗'} | 
                Video: {videoLoaded ? '✓' : '✗'}
              </p>
            </div>
          </div>
        )}

        {isFullyReady && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-2 sm:inset-4 border-2 border-white/50 rounded-xl sm:rounded-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full"></div>
          </div>
        )}

        <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onStopCamera}
            className="p-3 sm:p-4 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all duration-200 touch-manipulation"
          >
            <VideoOff className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={handleCapture}
            disabled={!isFullyReady}
            className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm text-primary-dark rounded-full hover:bg-white transition-all duration-200 shadow-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="h-6 w-6 sm:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraView;