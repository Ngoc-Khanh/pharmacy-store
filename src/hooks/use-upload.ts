import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { siteConfig } from '@/config';

export interface UploadOptions {
  url: string;
  fieldName?: string;
  fileName?: string;
  invalidateQueries?: string[][];
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export interface UseUploadReturn {
  upload: (file: Blob | File, options: UploadOptions) => Promise<void>;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export function useUpload(): UseUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const upload = useCallback(async (file: Blob | File, options: UploadOptions) => {
    const {
      url,
      fieldName = 'file',
      fileName = 'upload.jpg',
      invalidateQueries = [],
      onSuccess,
      onError,
    } = options;

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(fieldName, file, fileName);

      const token = localStorage.getItem(siteConfig.auth.jwt_key);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      };

      // Handle successful upload
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            
            // Invalidate queries if specified
            invalidateQueries.forEach(queryKey => {
              queryClient.invalidateQueries({ queryKey });
            });

            onSuccess?.(response);
                     } catch {
             const error = new Error('Lỗi xử lý phản hồi từ server');
             setError(error.message);
             onError?.(error);
           }
        } else {
          const error = new Error(`Upload thất bại với mã lỗi: ${xhr.status}`);
          setError(error.message);
          onError?.(error);
        }
        setIsUploading(false);
      };

      // Handle upload error
      xhr.onerror = () => {
        const error = new Error('Lỗi kết nối khi upload file');
        setError(error.message);
        setIsUploading(false);
        onError?.(error);
      };

      // Handle upload timeout
      xhr.ontimeout = () => {
        const error = new Error('Upload file bị timeout');
        setError(error.message);
        setIsUploading(false);
        onError?.(error);
      };

      // Configure request
      xhr.open('POST', url);
      xhr.timeout = 30000; // 30 seconds timeout

      // Add authorization header if token exists
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      // Start upload
      xhr.send(formData);

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Lỗi không xác định khi upload file');
      setError(error.message);
      setIsUploading(false);
      onError?.(error);
    }
  }, [queryClient]);

  return {
    upload,
    isUploading,
    progress,
    error,
  };
} 