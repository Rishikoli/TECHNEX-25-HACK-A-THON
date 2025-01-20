'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { extractTextFromPDF, extractTextFromDoc } from '../utils/pdfUtils';

interface FileUploadProps {
  onFileSelect: (text: string) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
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
      setError(err.message || 'Error processing file. Please try again with a different file.');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileSelect]);

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
          <div>
            <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop your resume here' : 'Drop your resume here or click to browse'}
            </p>
            <p className="text-sm text-neutral-500">
              Supported formats: PDF, DOCX, DOC, TXT (Max size: 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
