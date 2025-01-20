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

export interface ATSOptimizationResult {
  optimizedResume: string;
  improvements: {
    keywords: string[];
    formatting: string[];
    content: string[];
  };
  compatibility: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  jobMatch?: {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendations: string[];
  };
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

function validateGeminiResponse(response: any): ATSOptimizationResult {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format from AI');
  }

  const requiredFields = ['optimizedResume', 'improvements', 'compatibility'];
  for (const field of requiredFields) {
    if (!(field in response)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate and ensure proper structure
  if (typeof response.optimizedResume !== 'string' || !response.optimizedResume.trim()) {
    throw new Error('Optimized resume content is missing or invalid');
  }

  // Ensure improvements structure
  if (!response.improvements || typeof response.improvements !== 'object') {
    response.improvements = { keywords: [], formatting: [], content: [] };
  } else {
    ['keywords', 'formatting', 'content'].forEach(field => {
      if (!Array.isArray(response.improvements[field])) {
        response.improvements[field] = [];
      }
    });
  }

  // Ensure compatibility structure
  if (!response.compatibility || typeof response.compatibility !== 'object') {
    response.compatibility = { score: 0, issues: [], suggestions: [] };
  } else {
    response.compatibility.score = Math.min(100, Math.max(0, Number(response.compatibility.score) || 0));
    if (!Array.isArray(response.compatibility.issues)) {
      response.compatibility.issues = [];
    }
    if (!Array.isArray(response.compatibility.suggestions)) {
      response.compatibility.suggestions = [];
    }
  }

  // Validate job match if present
  if (response.jobMatch) {
    if (typeof response.jobMatch !== 'object') {
      delete response.jobMatch;
    } else {
      response.jobMatch.score = Math.min(100, Math.max(0, Number(response.jobMatch.score) || 0));
      ['matchedKeywords', 'missingKeywords', 'recommendations'].forEach(field => {
        if (!Array.isArray(response.jobMatch[field])) {
          response.jobMatch[field] = [];
        }
      });
    }
  }

  return response as ATSOptimizationResult;
}

export async function optimizeResume(resumeText: string, jobDescription?: string): Promise<ATSOptimizationResult> {
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

      const prompt = `You are an expert ATS (Applicant Tracking System) optimization specialist. Your task is to analyze and optimize the provided resume${jobDescription ? ' for a specific job description' : ''}.

IMPORTANT FORMATTING RULES:
1. NEVER use asterisks (*) anywhere in the resume
2. Use these exact section headers (in capital letters):
   - PROFILE SUMMARY
   - EXPERIENCE
   - EDUCATION
   - SKILLS
   - CERTIFICATIONS (if applicable)
   - PROJECTS (if applicable)
3. Format dates as: MM/YYYY (e.g., 06/2023)
4. Use bullet points with "•" symbol (not "-" or "*")
5. Contact information format:
   Full Name
   Email | Phone | Location
6. Experience format:
   Company Name
   Job Title (MM/YYYY - MM/YYYY)
   • Achievement
   • Achievement
7. Skills format:
   Category: Skill 1, Skill 2, Skill 3

Your response must be ONLY a JSON object with no additional text. The JSON must follow this structure:

{
  "optimizedResume": "FULL NAME\\nEmail | Phone | Location\\n\\nPROFILE SUMMARY\\nConcise professional summary without any special characters\\n\\nEXPERIENCE\\nCompany Name\\nJob Title (MM/YYYY - MM/YYYY)\\n• Achievement 1\\n• Achievement 2\\n\\nEDUCATION\\n...",
  "improvements": {
    "keywords": ["Added keyword 1", "Added keyword 2"],
    "formatting": ["Format improvement 1", "Format improvement 2"],
    "content": ["Content improvement 1", "Content improvement 2"]
  },
  "compatibility": {
    "score": 85,
    "issues": ["Issue 1", "Issue 2"],
    "suggestions": ["Suggestion 1", "Suggestion 2"]
  }${jobDescription ? `,
  "jobMatch": {
    "score": 75,
    "matchedKeywords": ["Matched skill 1", "Matched skill 2"],
    "missingKeywords": ["Missing skill 1", "Missing skill 2"],
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  }` : ''}
}

IMPORTANT NOTES:
1. Remove ALL asterisks (*) from both headings and content
2. Replace any asterisks in bullet points with "•"
3. Use plain text without any special formatting
4. Keep section headers in CAPITAL LETTERS
5. Maintain clean, consistent spacing between sections
6. Ensure all dates follow MM/YYYY format
7. Remove any decorative characters or symbols

Original Resume:
${cleanedText}

${jobDescription ? `Job Description:\n${jobDescription}` : ''}`;

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
        throw new Error("Failed to generate optimized resume. Please try again.");
      }
    } catch (error: any) {
      console.error("Error optimizing resume:", error);
      
      if (error?.message?.includes("quota") || error?.message?.includes("429")) {
        throw new Error("We've reached our API limit. Please try again in a few minutes.");
      }
      
      throw new Error(error?.message || "Failed to optimize resume. Please try again.");
    }
  });
}
