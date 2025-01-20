import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface SalaryPrediction {
  salaryRange: {
    min: number;
    max: number;
    median: number;
  };
  marketTrend: 'up' | 'down' | 'stable';
  factors: string[];
  recommendations: string[];
}

export interface BenefitsAnalysis {
  monetaryValue: number;
  breakdown: {
    component: string;
    value: number;
    description: string;
  }[];
  recommendations: string[];
}

export interface NegotiationStrategy {
  talkingPoints: string[];
  marketData: string[];
  approach: string;
  counterPoints: string[];
}

export interface MarketData {
  industryAverage: number;
  marketGrowth: number;
  demandLevel: string;
}

const extractJSONFromText = (text: string) => {
  try {
    // Find the first { and last } to extract the JSON object
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

export const generateSalaryPrediction = async (
  jobTitle: string,
  location: string,
  experience: number,
  skills: string[]
): Promise<SalaryPrediction> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a JSON object with salary prediction data for:
    Job Title: ${jobTitle}
    Location: ${location}
    Years of Experience: ${experience}
    Skills: ${skills.join(', ')}

    Respond ONLY with a JSON object in this exact format:
    {
      "salaryRange": {
        "min": number,
        "max": number,
        "median": number
      },
      "marketTrend": "up" or "down" or "stable",
      "factors": [string array of factors],
      "recommendations": [string array of recommendations]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      salaryRange: {
        min: parsed.salaryRange.min,
        max: parsed.salaryRange.max,
        median: parsed.salaryRange.median,
      },
      marketTrend: parsed.marketTrend,
      factors: parsed.factors,
      recommendations: parsed.recommendations,
    };
  } catch (error) {
    console.error('Error generating salary prediction:', error);
    throw error;
  }
};

export const analyzeBenefitsPackage = async (
  benefits: { type: string; value: number; description: string }[]
): Promise<BenefitsAnalysis> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Analyze this benefits package and respond ONLY with a JSON object in this exact format:
    {
      "monetaryValue": total value as number,
      "breakdown": [
        {
          "component": benefit name,
          "value": numeric value,
          "description": analysis description
        }
      ],
      "recommendations": [array of recommendation strings]
    }

    Benefits to analyze:
    ${JSON.stringify(benefits, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      monetaryValue: parsed.monetaryValue,
      breakdown: parsed.breakdown,
      recommendations: parsed.recommendations,
    };
  } catch (error) {
    console.error('Error analyzing benefits package:', error);
    throw error;
  }
};

export const generateNegotiationStrategy = async (
  currentSalary: number,
  offeredSalary: number,
  jobLevel: string,
  marketData: MarketData
): Promise<NegotiationStrategy> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a negotiation strategy based on this information:
    Current Salary: $${currentSalary}
    Offered Salary: $${offeredSalary}
    Job Level: ${jobLevel}
    Industry Average: $${marketData.industryAverage}
    Market Growth: ${marketData.marketGrowth}%
    Market Demand: ${marketData.demandLevel}

    Respond ONLY with a JSON object in this exact format:
    {
      "talkingPoints": [array of key points to discuss],
      "marketData": [array of relevant market insights as strings],
      "approach": "detailed approach as a string",
      "counterPoints": [array of counter arguments]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = extractJSONFromText(text);
    
    return {
      talkingPoints: Array.isArray(parsed.talkingPoints) ? parsed.talkingPoints : [],
      marketData: Array.isArray(parsed.marketData) ? parsed.marketData : [],
      approach: String(parsed.approach || ''),
      counterPoints: Array.isArray(parsed.counterPoints) ? parsed.counterPoints : [],
    };
  } catch (error) {
    console.error('Error generating negotiation strategy:', error);
    throw error;
  }
};
