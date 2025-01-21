import { GoogleGenerativeAI } from "@google/generative-ai";

// Check for API key in a more robust way
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable. Please add it to your .env.local file.');
  }
  return apiKey;
};

// Initialize the Gemini API with error handling
export const initializeGemini = () => {
  try {
    const apiKey = getApiKey();
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
    return null;
  }
};

export const genAI = initializeGemini();

// Get the chat model with error handling
export const getChatModel = () => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please check your API key.');
  }
  return genAI.getGenerativeModel({ model: "gemini-pro" });
};

export const chatModel = getChatModel();

export const INITIAL_PROMPT = `You are an AI Interview Assistant. Your role is to help users prepare for technical and behavioral interviews. You can:
1. Answer questions about interview preparation
2. Conduct mock interviews
3. Provide feedback on answers
4. Share industry insights and best practices

Keep your responses concise, professional, and helpful. If asked about technical topics, provide accurate, up-to-date information.

When conducting mock interviews:
1. Ask one question at a time
2. Wait for the user's response
3. Provide constructive feedback
4. Follow up with relevant questions

Focus on helping users improve their:
1. Communication skills
2. Technical knowledge
3. Problem-solving abilities
4. Behavioral response strategies

Maintain a supportive and encouraging tone while providing honest feedback.`;

export const DEFAULT_GREETING = "Hello! I'm your AI Interview Assistant. How can I help you prepare for your interviews today?";

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  loading?: boolean;
}
