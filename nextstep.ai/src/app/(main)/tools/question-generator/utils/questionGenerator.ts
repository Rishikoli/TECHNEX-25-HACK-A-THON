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

const handleGeminiError = (error: any) => {
  console.error('Error calling Gemini API:', error);
  if (error.message?.includes('Failed to fetch')) {
    throw new Error('Unable to connect to the AI service. Please check your internet connection and try again.');
  } else if (error.message?.includes('API key')) {
    throw new Error('Invalid API key. Please check your environment variables.');
  } else {
    throw new Error('An error occurred while generating questions. Please try again.');
  }
};

export const generateQuestionsFromResume = async (
  resumeText: string,
  numberOfQuestions: number = 10
): Promise<QuestionSet> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Based on the following resume, generate ${numberOfQuestions} relevant technical interview questions.
      Resume Content:
      ${resumeText}

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

      Respond with ONLY the JSON object, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    return handleGeminiError(error);
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    return handleGeminiError(error);
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      totalQuestions: parsed.totalQuestions || 0,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      estimatedDuration: parsed.estimatedDuration || 'N/A'
    };
  } catch (error) {
    return handleGeminiError(error);
  }
};
