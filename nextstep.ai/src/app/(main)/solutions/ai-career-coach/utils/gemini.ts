import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface CareerAssessment {
  strengths: string[];
  weaknesses: string[];
  recommendedRoles: {
    title: string;
    description: string;
    matchScore: number;
  }[];
  skillGaps: {
    skill: string;
    importance: 'high' | 'medium' | 'low';
    resources: string[];
  }[];
}

export interface LearningPath {
  title: string;
  description: string;
  duration: string;
  milestones: {
    title: string;
    description: string;
    timeframe: string;
    resources: {
      type: string;
      name: string;
      url?: string;
    }[];
  }[];
}

export interface IndustryInsight {
  trends: {
    name: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  skills: {
    name: string;
    demand: 'increasing' | 'stable' | 'decreasing';
    timeToMaster: string;
  }[];
  opportunities: {
    role: string;
    description: string;
    growthPotential: string;
    requiredSkills: string[];
  }[];
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
    throw error;
  }
};

export const generateCareerAssessment = async (
  background: string,
  interests: string[],
  skills: string[],
  experience: string
): Promise<CareerAssessment> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a career assessment based on:
    Background: ${background}
    Interests: ${interests.join(', ')}
    Skills: ${skills.join(', ')}
    Experience: ${experience}

    Respond ONLY with a JSON object in this exact format:
    {
      "strengths": [array of strength strings],
      "weaknesses": [array of weakness strings],
      "recommendedRoles": [
        {
          "title": "role title",
          "description": "role description",
          "matchScore": number between 0-100
        }
      ],
      "skillGaps": [
        {
          "skill": "skill name",
          "importance": "high" or "medium" or "low",
          "resources": [array of learning resource strings]
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      recommendedRoles: Array.isArray(parsed.recommendedRoles) ? parsed.recommendedRoles : [],
      skillGaps: Array.isArray(parsed.skillGaps) ? parsed.skillGaps : [],
    };
  } catch (error) {
    console.error('Error generating career assessment:', error);
    throw error;
  }
};

export const generateLearningPath = async (
  currentSkills: string[],
  targetRole: string,
  timeframe: string
): Promise<LearningPath> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Create a learning path for:
    Current Skills: ${currentSkills.join(', ')}
    Target Role: ${targetRole}
    Desired Timeframe: ${timeframe}

    Respond ONLY with a JSON object in this exact format:
    {
      "title": "learning path title",
      "description": "overall description",
      "duration": "estimated duration",
      "milestones": [
        {
          "title": "milestone title",
          "description": "milestone description",
          "timeframe": "estimated time",
          "resources": [
            {
              "type": "course" or "book" or "project" or "certification",
              "name": "resource name",
              "url": "optional url"
            }
          ]
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      title: String(parsed.title || ''),
      description: String(parsed.description || ''),
      duration: String(parsed.duration || ''),
      milestones: Array.isArray(parsed.milestones) ? parsed.milestones : [],
    };
  } catch (error) {
    console.error('Error generating learning path:', error);
    throw error;
  }
};

export const generateIndustryInsights = async (
  industry: string,
  role: string,
  region: string
): Promise<IndustryInsight> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Provide industry insights for:
    Industry: ${industry}
    Role: ${role}
    Region: ${region}

    Respond ONLY with a JSON object in this exact format:
    {
      "trends": [
        {
          "name": "trend name",
          "description": "trend description",
          "impact": "high" or "medium" or "low"
        }
      ],
      "skills": [
        {
          "name": "skill name",
          "demand": "increasing" or "stable" or "decreasing",
          "timeToMaster": "estimated time"
        }
      ],
      "opportunities": [
        {
          "role": "role title",
          "description": "role description",
          "growthPotential": "growth description",
          "requiredSkills": [array of required skill strings]
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      trends: Array.isArray(parsed.trends) ? parsed.trends : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      opportunities: Array.isArray(parsed.opportunities) ? parsed.opportunities : [],
    };
  } catch (error) {
    console.error('Error generating industry insights:', error);
    throw error;
  }
};
