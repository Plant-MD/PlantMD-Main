import React from 'react';
import ImageUploadArea from '@/components/scan/ImageUploadArea';
import ImagePreview from '@/components/scan/ImagePreview';
import CameraView from '@/components/scan/CameraView';
import ErrorAlert from '@/components/scan/ErrorAlert';

interface HeroUploadContainerProps {
  showCamera: boolean;
  stream: MediaStream | null;
  cameraReady: boolean;
  cameraError: string | null;
  
  selectedImage: string | null;
  isDragging: boolean;
  selectedPlant: 'tomato' | 'corn';
  isProcessing: boolean;
  
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
  onPlantChange: (plant: 'tomato' | 'corn') => void;
  onCapturePhoto: (videoElement?: HTMLVideoElement) => void;
  onStopCamera: () => void;
  onClearImage: () => void;
  onAnalyze: () => void;
  onDismissError: () => void;
  
  fileInputRef: React.RefObject<HTMLInputElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeroUploadContainer: React.FC<HeroUploadContainerProps> = ({
  showCamera,
  stream,
  cameraReady,
  cameraError,
  selectedImage,
  isDragging,
  selectedPlant,
  isProcessing,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera,
  onPlantChange,
  onCapturePhoto,
  onStopCamera,
  onClearImage,
  onAnalyze,
  onDismissError,
  fileInputRef,
  canvasRef,
  onFileInputChange
}) => {
  return (
    <>
      {cameraError && (
        <div className="mb-4 w-full max-w-md">
          <ErrorAlert 
            error={cameraError} 
            onDismiss={onDismissError} 
          />
        </div>
      )}

      <div className="w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/50 shadow-lg p-4">
          
          {showCamera && (
            <CameraView
              stream={stream}
              cameraReady={cameraReady}
              onCapturePhoto={onCapturePhoto}
              onStopCamera={onStopCamera}
            />
          )}

          {!showCamera && selectedImage && (
            <ImagePreview
              selectedImage={selectedImage}
              selectedPlant={selectedPlant}
              isProcessing={isProcessing}
              onClearImage={onClearImage}
              onAnalyze={onAnalyze}
            />
          )}

          {!showCamera && !selectedImage && (
            <ImageUploadArea
              isDragging={isDragging}
              selectedPlant={selectedPlant}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onBrowseFiles={onBrowseFiles}
              onStartCamera={onStartCamera}
              onPlantChange={onPlantChange}
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileInputChange}
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </>
  );
};

export default HeroUploadContainer;