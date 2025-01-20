'use client';

import React, { createContext, useContext, useState } from 'react';
import { callGeminiAPI } from '@/config/api-config';

interface GeminiContextType {
  isLoading: boolean;
  error: string | null;
  generateContent: (prompt: string) => Promise<any>;
}

const GeminiContext = createContext<GeminiContextType | undefined>(undefined);

export function GeminiProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (prompt: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get API key from environment variable
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const response = await callGeminiAPI(prompt, apiKey);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GeminiContext.Provider value={{ isLoading, error, generateContent }}>
      {children}
    </GeminiContext.Provider>
  );
}

// Custom hook to use Gemini context
export function useGemini() {
  const context = useContext(GeminiContext);
  if (context === undefined) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
}
