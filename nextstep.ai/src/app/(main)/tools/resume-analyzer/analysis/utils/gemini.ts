import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Queue system for managing requests
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private readonly minDelay = 10000; // 10 seconds between requests

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minDelay) {
        await new Promise(resolve => 
          setTimeout(resolve, this.minDelay - timeSinceLastRequest)
        );
      }

      const request = this.queue.shift();
      if (request) {
        try {
          await request();
        } catch (error) {
          console.error('Error processing request:', error);
        }
      }

      this.lastRequestTime = Date.now();
    }

    this.isProcessing = false;
  }
}

const requestQueue = new RequestQueue();

export interface ResumeAnalysisResult {
  summary: string;
  strengths: string[];
  improvements: string[];
  skillsAnalysis: {
    technical: string[];
    soft: string[];
    missing: string[];
  };
  formatAnalysis: {
    structure: string;
    clarity: string;
    suggestions: string[];
  };
  overallScore: number;
}

function validateResumeText(text: string): string {
  // Remove any non-printable characters
  text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Check if text is too short
  if (text.length < 50) {
    throw new Error('The resume content appears to be too short. Please check the file and try again.');
  }
  
  // Check if text is too long (100KB limit)
  if (text.length > 100000) {
    text = text.substring(0, 100000);
  }
  
  return text;
}

function validateGeminiResponse(response: any): ResumeAnalysisResult {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format from AI');
  }

  const requiredFields = [
    'summary',
    'strengths',
    'improvements',
    'skillsAnalysis',
    'formatAnalysis',
    'overallScore'
  ];

  for (const field of requiredFields) {
    if (!(field in response)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Ensure arrays are actually arrays
  ['strengths', 'improvements'].forEach(field => {
    if (!Array.isArray(response[field])) {
      response[field] = [];
    }
  });

  // Ensure nested objects exist and their arrays
  if (!response.skillsAnalysis || typeof response.skillsAnalysis !== 'object') {
    response.skillsAnalysis = { technical: [], soft: [], missing: [] };
  } else {
    ['technical', 'soft', 'missing'].forEach(field => {
      if (!Array.isArray(response.skillsAnalysis[field])) {
        response.skillsAnalysis[field] = [];
      }
    });
  }

  if (!response.formatAnalysis || typeof response.formatAnalysis !== 'object') {
    response.formatAnalysis = { structure: '', clarity: '', suggestions: [] };
  } else {
    if (!Array.isArray(response.formatAnalysis.suggestions)) {
      response.formatAnalysis.suggestions = [];
    }
    if (typeof response.formatAnalysis.structure !== 'string') {
      response.formatAnalysis.structure = '';
    }
    if (typeof response.formatAnalysis.clarity !== 'string') {
      response.formatAnalysis.clarity = '';
    }
  }

  // Ensure score is a number between 0 and 100
  response.overallScore = Math.min(100, Math.max(0, Number(response.overallScore) || 0));

  // Ensure all string fields are strings
  response.summary = String(response.summary || '');

  return response as ResumeAnalysisResult;
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
  return requestQueue.add(async () => {
    try {
      // Validate and clean input text
      const cleanedText = validateResumeText(resumeText);

      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          }
        ],
      });

      const prompt = `You are a professional resume analyzer. Your task is to analyze the provided resume and return a JSON object with detailed feedback.

IMPORTANT: Your response must be ONLY the JSON object, with no additional text or markdown. The JSON must exactly match this structure:

{
  "summary": "Brief overview of the candidate's profile",
  "strengths": ["Strong point 1", "Strong point 2", ...],
  "improvements": ["Improvement suggestion 1", "Improvement suggestion 2", ...],
  "skillsAnalysis": {
    "technical": ["Technical skill 1", "Technical skill 2", ...],
    "soft": ["Soft skill 1", "Soft skill 2", ...],
    "missing": ["Recommended skill 1", "Recommended skill 2", ...]
  },
  "formatAnalysis": {
    "structure": "Comment on resume structure",
    "clarity": "Comment on clarity and readability",
    "suggestions": ["Format suggestion 1", "Format suggestion 2", ...]
  },
  "overallScore": 85
}

Guidelines:
1. All array fields must contain at least one item
2. 'overallScore' must be a number between 0 and 100
3. All text fields must be descriptive but concise
4. Focus on actionable feedback
5. Be specific and professional

Resume to analyze:
${cleanedText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Try to extract JSON if it's wrapped in other text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON object found in response');
        }
        
        const parsedResponse = JSON.parse(jsonMatch[0]);
        return validateGeminiResponse(parsedResponse);
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        console.error("Raw response:", text);
        throw new Error("The AI response was not in the expected format. Please try again.");
      }
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      
      if (error?.message?.includes("quota") || error?.message?.includes("429")) {
        throw new Error("We've reached our API limit. Please try again in a few minutes.");
      }
      
      throw new Error(error?.message || "Failed to analyze resume. Please try again.");
    }
  });
}

export async function generateImprovementSuggestions(resumeText: string, jobDescription?: string): Promise<string[]> {
  return requestQueue.add(async () => {
    try {
      // Validate and clean input text
      const cleanedText = validateResumeText(resumeText);

      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          }
        ],
      });

      const prompt = `You are a professional resume improvement advisor. Analyze this resume${jobDescription ? ' and job description' : ''} and provide specific, actionable suggestions for improvement.

IMPORTANT: Your response must be ONLY a JSON array of strings, with no additional text or markdown. Each string should be a specific suggestion. Example:

["Add quantifiable achievements to highlight impact", "Include relevant certifications", "Improve formatting consistency"]

Guidelines:
1. Each suggestion should be clear and actionable
2. Focus on both content and presentation
3. Be specific and professional
4. Provide at least 3 suggestions

Resume:
${cleanedText}

${jobDescription ? `Job Description:\n${jobDescription}` : ''}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Try to extract JSON array if it's wrapped in other text
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          return ["Unable to generate suggestions. Please try again."];
        }
        
        const suggestions = JSON.parse(jsonMatch[0]);
        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          return ["Unable to generate suggestions. Please try again."];
        }
        return suggestions.map(s => String(s));
      } catch (parseError) {
        console.error("Error parsing suggestions response:", parseError);
        console.error("Raw response:", text);
        return ["Unable to generate suggestions at this time. Please try again later."];
      }
    } catch (error: any) {
      console.error("Error generating suggestions:", error);
      
      if (error?.message?.includes("quota") || error?.message?.includes("429")) {
        return ["We've reached our API limit. Please try again in a few minutes."];
      }
      
      return ["Failed to generate suggestions. Please try again."];
    }
  });
}
