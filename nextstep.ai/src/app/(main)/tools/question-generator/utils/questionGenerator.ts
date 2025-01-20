import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface Question {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  expectedDuration: string;
  skillsTested: string[];
}

export interface QuestionSet {
  questions: Question[];
  totalQuestions: number;
  categories: string[];
  estimatedDuration: string;
}

const extractJSONFromText = (text: string) => {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    if (start === -1 || end === 0) throw new Error('No JSON object found in response');
    const jsonStr = text.slice(start, end);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error extracting JSON from text:', error);
    throw new Error('Failed to parse response from AI. Please try again.');
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      if (retries >= maxRetries || !error.message?.includes('429')) {
        throw error;
      }
      const delayTime = initialDelay * Math.pow(2, retries);
      await delay(delayTime);
      retries++;
    }
  }
};

const handleGeminiError = (error: any) => {
  console.error('Error calling Gemini API:', error);
  if (error.message?.includes('429')) {
    throw new Error('API rate limit exceeded. Please try again in a few moments.');
  } else if (error.message?.includes('Failed to fetch')) {
    throw new Error('Unable to connect to the AI service. Please check your internet connection and try again.');
  } else if (error.message?.includes('API key')) {
    throw new Error('Invalid API key. Please check your environment variables.');
  } else {
    throw new Error('An error occurred while generating questions. Please try again.');
  }
};

export const generateQuestionsFromSkills = async (
  skills: string[],
  experience: string,
  numberOfQuestions: number = 10
): Promise<QuestionSet> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Generate ${numberOfQuestions} technical interview questions based on the following:
      Skills: ${skills.join(', ')}
      Experience Level: ${experience}

      Generate a JSON object with the following structure:
      {
        "questions": [
          {
            "id": "unique string id",
            "question": "detailed question text",
            "difficulty": "easy" or "medium" or "hard",
            "category": "category name (e.g., Technical, Behavioral, Problem Solving)",
            "expectedDuration": "time in minutes",
            "skillsTested": ["skill1", "skill2", ...]
          }
        ],
        "totalQuestions": number,
        "categories": ["category1", "category2", ...],
        "estimatedDuration": "total time in format: X hours Y minutes"
      }

      Ensure questions match the experience level and focus on practical scenarios.
      Respond with ONLY the JSON object, no additional text.
    `;

    const generateContent = async () => {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    };

    const text = await retryWithBackoff(generateContent);
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateQuestionsByTopic = async (
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  numberOfQuestions: number = 10
): Promise<QuestionSet> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Generate ${numberOfQuestions} ${difficulty} level interview questions about ${topic}.

      Generate a JSON object with the following structure:
      {
        "questions": [
          {
            "id": "unique string id",
            "question": "detailed question text",
            "difficulty": "${difficulty}",
            "category": "category name",
            "expectedDuration": "time in minutes",
            "skillsTested": ["skill1", "skill2", ...]
          }
        ],
        "totalQuestions": number,
        "categories": ["category1", "category2", ...],
        "estimatedDuration": "total time in format: X hours Y minutes"
      }

      Respond with ONLY the JSON object, no additional text.
    `;

    const generateContent = async () => {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    };

    const text = await retryWithBackoff(generateContent);
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const generateCustomQuestions = async (
  requirements: {
    topics: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    type: 'technical' | 'behavioral' | 'both';
    numberOfQuestions: number;
  }
): Promise<QuestionSet> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Generate ${requirements.numberOfQuestions} interview questions based on these requirements:
      Topics: ${requirements.topics.join(', ')}
      Difficulty: ${requirements.difficulty}
      Type: ${requirements.type}

      Generate a JSON object with the following structure:
      {
        "questions": [
          {
            "id": "unique string id",
            "question": "detailed question text",
            "difficulty": "${requirements.difficulty}",
            "category": "category name",
            "expectedDuration": "time in minutes",
            "skillsTested": ["skill1", "skill2", ...]
          }
        ],
        "totalQuestions": number,
        "categories": ["category1", "category2", ...],
        "estimatedDuration": "total time in format: X hours Y minutes"
      }

      Respond with ONLY the JSON object, no additional text.
    `;

    const generateContent = async () => {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    };

    const text = await retryWithBackoff(generateContent);
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    throw handleGeminiError(error);
  }
};
