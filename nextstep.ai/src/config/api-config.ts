// API Configuration for Gemini
export const GEMINI_CONFIG = {
  apiEndpoint: process.env.NEXT_PUBLIC_GEMINI_API_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  maxTokens: 1000,
  temperature: 0.7,
  topP: 0.8,
  topK: 40
};

// Utility function to validate API key
export const validateGeminiApiKey = (apiKey: string): boolean => {
  return apiKey.startsWith('AI') && apiKey.length > 20;
};

// Helper function to create headers with API key
export const createGeminiHeaders = (apiKey: string) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
};

// Example function for making Gemini API calls
export async function callGeminiAPI(prompt: string, apiKey: string) {
  try {
    if (!validateGeminiApiKey(apiKey)) {
      throw new Error('Invalid API key format');
    }

    const response = await fetch(`${GEMINI_CONFIG.apiEndpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: createGeminiHeaders(apiKey),
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: GEMINI_CONFIG.temperature,
          topP: GEMINI_CONFIG.topP,
          topK: GEMINI_CONFIG.topK,
          maxOutputTokens: GEMINI_CONFIG.maxTokens,
        }
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
