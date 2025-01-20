'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { extractTextFromPDF, extractTextFromDoc } from '../utils/pdfUtils';

interface FileUploadProps {
  onFileSelect: (text: string) => void;
  onError: (message: string) => void;
}

const FileUpload = ({ onFileSelect, onError }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setError(null);
      setIsProcessing(true);
      let text = '';

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword' ||
        file.type === 'text/plain'
      ) {
        text = await extractTextFromDoc(file);
      } else {
        throw new Error('Unsupported file format. Please upload a PDF, DOC, DOCX, or TXT file.');
      }

      if (!text.trim()) {
        throw new Error('No text content found in the file. Please check if the file is corrupted or empty.');
      }

      setFileName(file.name);
      onFileSelect(text);
    } catch (err: any) {
      console.error('File processing error:', err);
      const errorMessage = err.message || 'Error processing file. Please try again with a different file.';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileSelect, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isProcessing
  });

  const clearFile = () => {
    setFileName(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:border-primary-500'}
          ${fileName ? 'bg-neutral-50' : ''}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-neutral-600">Processing file...</p>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-center space-x-3">
            <File className="w-6 h-6 text-primary-600" />
            <span className="text-neutral-800">{fileName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="p-1 hover:bg-neutral-200 rounded-full"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-neutral-400 mb-4" />
            <p className="text-neutral-600 mb-2">
              Drag & drop your resume here or <span className="text-primary-600">browse</span>
            </p>
            <p className="text-sm text-neutral-500">
              Supports PDF, DOC, DOCX, and TXT (max 5MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
