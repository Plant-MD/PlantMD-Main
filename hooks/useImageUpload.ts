'use client';

import { useState, useRef, useEffect } from 'react';

export const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debug: Log when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      console.log('Image selected and set:', selectedImage.substring(0, 30) + '...');
    }
  }, [selectedImage]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.onerror = (e) => {
        console.error('File reading error:', e);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPG, PNG, WebP, etc.)');
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

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const browseFiles = () => {
    fileInputRef.current?.click();
  };

  return {
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
  };
};