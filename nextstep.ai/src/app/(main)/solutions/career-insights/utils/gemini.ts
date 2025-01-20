import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface JobMarketAnalysis {
  overview: {
    demandLevel: 'high' | 'medium' | 'low';
    growthRate: string;
    averageSalary: string;
    competitionLevel: 'high' | 'medium' | 'low';
  };
  topEmployers: {
    name: string;
    description: string;
    openPositions: number;
    benefits: string[];
  }[];
  marketTrends: {
    trend: string;
    impact: string;
    timeframe: string;
  }[];
  locationInsights: {
    location: string;
    demandLevel: 'high' | 'medium' | 'low';
    averageSalary: string;
    costOfLiving: string;
  }[];
}

export interface SkillDemandAnalysis {
  coreSkills: {
    skill: string;
    demandLevel: 'high' | 'medium' | 'low';
    growthRate: string;
    averageSalaryImpact: string;
  }[];
  emergingSkills: {
    skill: string;
    description: string;
    adoptionRate: string;
    futureOutlook: string;
  }[];
  certifications: {
    name: string;
    provider: string;
    value: string;
    timeToComplete: string;
    cost: string;
  }[];
}

export interface CompanyInsight {
  overview: {
    name: string;
    industry: string;
    size: string;
    founded: string;
    headquarters: string;
  };
  culture: {
    workLifeBalance: string;
    careerGrowth: string;
    learningOpportunities: string;
    diversityInclusion: string;
  };
  benefits: {
    category: string;
    description: string;
    rating: 'excellent' | 'good' | 'average' | 'below average';
  }[];
  reviews: {
    position: string;
    pros: string[];
    cons: string[];
    rating: number;
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

export const generateJobMarketAnalysis = async (
  jobTitle: string,
  industry: string,
  location: string
): Promise<JobMarketAnalysis> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a job market analysis for:
    Job Title: ${jobTitle}
    Industry: ${industry}
    Location: ${location}

    Respond ONLY with a JSON object in this exact format:
    {
      "overview": {
        "demandLevel": "high" or "medium" or "low",
        "growthRate": "growth rate as string",
        "averageSalary": "salary as string",
        "competitionLevel": "high" or "medium" or "low"
      },
      "topEmployers": [
        {
          "name": "employer name",
          "description": "brief description",
          "openPositions": number,
          "benefits": ["benefit1", "benefit2", ...]
        }
      ],
      "marketTrends": [
        {
          "trend": "trend name",
          "impact": "impact description",
          "timeframe": "expected timeframe"
        }
      ],
      "locationInsights": [
        {
          "location": "location name",
          "demandLevel": "high" or "medium" or "low",
          "averageSalary": "salary as string",
          "costOfLiving": "cost of living description"
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
      overview: parsed.overview || {
        demandLevel: 'medium',
        growthRate: 'N/A',
        averageSalary: 'N/A',
        competitionLevel: 'medium'
      },
      topEmployers: Array.isArray(parsed.topEmployers) ? parsed.topEmployers : [],
      marketTrends: Array.isArray(parsed.marketTrends) ? parsed.marketTrends : [],
      locationInsights: Array.isArray(parsed.locationInsights) ? parsed.locationInsights : [],
    };
  } catch (error) {
    console.error('Error generating job market analysis:', error);
    throw error;
  }
};

export const generateSkillDemandAnalysis = async (
  jobTitle: string,
  industry: string
): Promise<SkillDemandAnalysis> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate a skill demand analysis for:
    Job Title: ${jobTitle}
    Industry: ${industry}

    Respond ONLY with a JSON object in this exact format:
    {
      "coreSkills": [
        {
          "skill": "skill name",
          "demandLevel": "high" or "medium" or "low",
          "growthRate": "growth rate description",
          "averageSalaryImpact": "salary impact description"
        }
      ],
      "emergingSkills": [
        {
          "skill": "skill name",
          "description": "skill description",
          "adoptionRate": "adoption rate description",
          "futureOutlook": "future outlook description"
        }
      ],
      "certifications": [
        {
          "name": "certification name",
          "provider": "provider name",
          "value": "value description",
          "timeToComplete": "time estimate",
          "cost": "cost estimate"
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
      coreSkills: Array.isArray(parsed.coreSkills) ? parsed.coreSkills : [],
      emergingSkills: Array.isArray(parsed.emergingSkills) ? parsed.emergingSkills : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
    };
  } catch (error) {
    console.error('Error generating skill demand analysis:', error);
    throw error;
  }
};

export const generateCompanyInsight = async (
  companyName: string,
  location: string
): Promise<CompanyInsight> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate company insights for:
    Company: ${companyName}
    Location: ${location}

    Respond ONLY with a JSON object in this exact format:
    {
      "overview": {
        "name": "company name",
        "industry": "industry name",
        "size": "company size",
        "founded": "founding year",
        "headquarters": "HQ location"
      },
      "culture": {
        "workLifeBalance": "description",
        "careerGrowth": "description",
        "learningOpportunities": "description",
        "diversityInclusion": "description"
      },
      "benefits": [
        {
          "category": "benefit category",
          "description": "benefit description",
          "rating": "excellent" or "good" or "average" or "below average"
        }
      ],
      "reviews": [
        {
          "position": "job position",
          "pros": ["pro1", "pro2", ...],
          "cons": ["con1", "con2", ...],
          "rating": number between 1-5
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
      overview: parsed.overview || {
        name: companyName,
        industry: 'N/A',
        size: 'N/A',
        founded: 'N/A',
        headquarters: location
      },
      culture: parsed.culture || {
        workLifeBalance: 'N/A',
        careerGrowth: 'N/A',
        learningOpportunities: 'N/A',
        diversityInclusion: 'N/A'
      },
      benefits: Array.isArray(parsed.benefits) ? parsed.benefits : [],
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
    };
  } catch (error) {
    console.error('Error generating company insight:', error);
    throw error;
  }
};
