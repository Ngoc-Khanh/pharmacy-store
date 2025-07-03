import { useState, useCallback } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseImageCropConfig {
  outputWidth?: number;
  outputHeight?: number;
  outputFormat?: 'image/jpeg' | 'image/png';
  outputQuality?: number;
}

export interface UseImageCropReturn {
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | null;
  isCropDialogOpen: boolean;
  finalImageUrl: string | null;
  setCrop: (crop: Point) => void;
  setZoom: (zoom: number) => void;
  handleCropChange: (crop: Point) => void;
  handleCropComplete: (croppedArea: CropArea) => void;
  openCropDialog: () => void;
  closeCropDialog: () => void;
  applyCrop: (imageUrl: string) => Promise<void>;
  removeFinalImage: () => void;
  reset: () => void;
  getCroppedBlob: () => Promise<Blob | null>;
}

export function useImageCrop(config: UseImageCropConfig = {}): UseImageCropReturn {
  const {
    outputWidth = 200,
    outputHeight = 200,
    outputFormat = 'image/jpeg',
    outputQuality = 0.9,
  } = config;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const handleCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const handleCropComplete = useCallback((croppedArea: CropArea) => {
    setCroppedAreaPixels({
      x: croppedArea.x,
      y: croppedArea.y,
      width: croppedArea.width,
      height: croppedArea.height
    });
  }, []);

  const openCropDialog = useCallback(() => {
    setIsCropDialogOpen(true);
  }, []);

  const closeCropDialog = useCallback(() => {
    setIsCropDialogOpen(false);
    // Reset crop settings when closing
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<Blob | null> => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas size to output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Draw the cropped image scaled to fit the output dimensions
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob(resolve, outputFormat, outputQuality);
      });
    } catch (error) {
      console.error('Error cropping image:', error);
      return null;
    }
  };

  const applyCrop = useCallback(async (imageUrl: string) => {
    if (!croppedAreaPixels) {
      throw new Error('No crop area defined');
    }

    try {
      setCurrentImageUrl(imageUrl);
      const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
      
      if (croppedBlob) {
        const croppedImageUrl = URL.createObjectURL(croppedBlob);
        setFinalImageUrl(croppedImageUrl);
        closeCropDialog();
      } else {
        throw new Error('Failed to crop image');
      }
    } catch (error) {
      console.error('Error applying crop:', error);
      throw error;
    }
  }, [croppedAreaPixels, closeCropDialog, outputWidth, outputHeight, outputFormat, outputQuality]);

  const getCroppedBlob = useCallback(async (): Promise<Blob | null> => {
    if (!currentImageUrl || !croppedAreaPixels) {
      return null;
    }

    return await getCroppedImg(currentImageUrl, croppedAreaPixels);
  }, [currentImageUrl, croppedAreaPixels, outputWidth, outputHeight, outputFormat, outputQuality]);

  const removeFinalImage = useCallback(() => {
    if (finalImageUrl) {
      URL.revokeObjectURL(finalImageUrl);
      setFinalImageUrl(null);
    }
  }, [finalImageUrl]);

  const reset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsCropDialogOpen(false);
    setCurrentImageUrl(null);
    
    if (finalImageUrl) {
      URL.revokeObjectURL(finalImageUrl);
      setFinalImageUrl(null);
    }
  }, [finalImageUrl]);

  return {
    crop,
    zoom,
    croppedAreaPixels,
    isCropDialogOpen,
    finalImageUrl,
    setCrop,
    setZoom,
    handleCropChange,
    handleCropComplete,
    openCropDialog,
    closeCropDialog,
    applyCrop,
    removeFinalImage,
    reset,
    getCroppedBlob,
  };
} 