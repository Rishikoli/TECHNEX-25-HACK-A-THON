import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface AnalysisResult {
  feedback: {
    positive: string[];
    suggestions: string[];
    warnings: string[];
  };
  metrics: {
    confidence: number;
    clarity: number;
    relevance: number;
    completeness: number;
  };
}

// Helper function to extract JSON from the response
function extractJsonFromText(text: string): any {
  try {
    // Try to parse the entire text as JSON first
    return JSON.parse(text);
  } catch (e) {
    // If that fails, try to extract JSON from markdown
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to extract JSON from response:', e);
    }
    
    // If all parsing fails, return a structured error response
    return {
      feedback: {
        positive: ['Unable to parse AI response'],
        suggestions: ['Please try again'],
        warnings: ['Analysis service encountered an error']
      }
    };
  }
}

function calculateConfidence(text: string): number {
  // Check for confidence indicators
  const confidenceIndicators = [
    'I believe', 'I think', 'maybe', 'perhaps', 'um', 'uh', 'like'
  ];
  const words = text.toLowerCase().split(' ');
  const hesitationCount = words.filter(word => 
    confidenceIndicators.includes(word)
  ).length;
  
  // More hesitation = lower confidence
  const confidenceScore = Math.max(0, 100 - (hesitationCount * 10));
  return Math.min(100, confidenceScore);
}

function calculateClarity(text: string): number {
  // Check for clear speech patterns
  const words = text.split(' ');
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const sentenceCount = text.split(/[.!?]+/).length;
  const wordsPerSentence = words.length / sentenceCount;
  
  // Ideal: 4-5 letter words, 15-20 words per sentence
  const clarityScore = 100 - (
    Math.abs(avgWordLength - 4.5) * 10 +
    Math.abs(wordsPerSentence - 17.5) * 2
  );
  
  return Math.max(0, Math.min(100, clarityScore));
}

function calculateRelevance(text: string, question: string): number {
  // Extract keywords from question
  const questionWords = question.toLowerCase()
    .split(' ')
    .filter(word => word.length > 3);
  
  // Check how many question keywords appear in answer
  const answerWords = text.toLowerCase().split(' ');
  const matchedWords = questionWords.filter(word =>
    answerWords.includes(word)
  ).length;
  
  const relevanceScore = (matchedWords / questionWords.length) * 100;
  return Math.min(100, relevanceScore);
}

function calculateCompleteness(text: string, type: 'behavioral' | 'technical'): number {
  const words = text.split(' ');
  
  // For behavioral questions, check for STAR method components
  if (type === 'behavioral') {
    const starIndicators = {
      situation: ['when', 'while', 'during', 'at', 'in'],
      task: ['needed', 'had to', 'responsible', 'goal'],
      action: ['i', 'we', 'implemented', 'created', 'developed', 'managed'],
      result: ['resulted', 'achieved', 'improved', 'increased', 'decreased']
    };
    
    let starScore = 0;
    Object.values(starIndicators).forEach(indicators => {
      if (indicators.some(indicator => 
        text.toLowerCase().includes(indicator)
      )) {
        starScore += 25;
      }
    });
    
    return starScore;
  }
  
  // For technical questions, check for key components
  const technicalIndicators = {
    approach: ['approach', 'would', 'could', 'should', 'first'],
    implementation: ['implement', 'use', 'using', 'with', 'by'],
    complexity: ['time', 'space', 'complexity', 'performance'],
    considerations: ['however', 'although', 'consider', 'trade-off']
  };
  
  let technicalScore = 0;
  Object.values(technicalIndicators).forEach(indicators => {
    if (indicators.some(indicator => 
      text.toLowerCase().includes(indicator)
    )) {
      technicalScore += 25;
    }
  });
  
  // Also consider response length
  const minWords = type === 'behavioral' ? 100 : 50;
  const lengthScore = Math.min(100, (words.length / minWords) * 100);
  
  return Math.min(100, (technicalScore + lengthScore) / 2);
}

export async function analyzeResponse(
  transcript: string,
  question: string,
  type: 'behavioral' | 'technical'
): Promise<AnalysisResult> {
  try {
    // Calculate metrics
    const confidence = calculateConfidence(transcript);
    const clarity = calculateClarity(transcript);
    const relevance = calculateRelevance(transcript, question);
    const completeness = calculateCompleteness(transcript, type);

    // Use Gemini for detailed feedback
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
    Analyze this ${type} interview response and provide feedback in JSON format.
    Do not include any markdown formatting or additional text.
    Only return a valid JSON object.

    Question: "${question}"
    Response: "${transcript}"

    Return the analysis in this exact JSON structure:
    {
      "feedback": {
        "positive": ["point1", "point2", "point3"],
        "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
        "warnings": ["warning1", "warning2"]
      }
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    const feedbackJson = extractJsonFromText(responseText);

    return {
      feedback: feedbackJson.feedback,
      metrics: {
        confidence,
        clarity,
        relevance,
        completeness
      }
    };
  } catch (error) {
    console.error('Error analyzing response:', error);
    return {
      feedback: {
        positive: ['Analysis service encountered an error'],
        suggestions: [],
        warnings: ['Please try again']
      },
      metrics: {
        confidence: calculateConfidence(transcript),
        clarity: calculateClarity(transcript),
        relevance: calculateRelevance(transcript, question),
        completeness: calculateCompleteness(transcript, type)
      }
    };
  }
}
