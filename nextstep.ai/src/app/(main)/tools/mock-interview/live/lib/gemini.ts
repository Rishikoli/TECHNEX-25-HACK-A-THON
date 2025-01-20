import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  technicalAccuracy: number;
  communicationClarity: number;
  confidence: number;
  bodyLanguage: string[];
}

export async function analyzeInterview(
  question: string,
  answer: string,
  transcription: string,
  bodyLanguageData: any
): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      As an expert interview coach, analyze this mock interview response.
      
      Question: "${question}"
      
      Verbal Response: "${answer}"
      
      Speech Transcription: "${transcription}"
      
      Body Language Data: ${JSON.stringify(bodyLanguageData)}
      
      Provide a detailed analysis in the following JSON format:
      {
        "score": <overall score 0-100>,
        "strengths": [<list of key strengths>],
        "improvements": [<list of areas for improvement>],
        "technicalAccuracy": <score 0-100>,
        "communicationClarity": <score 0-100>,
        "confidence": <score 0-100>,
        "bodyLanguage": [<list of body language observations>]
      }
      
      Focus on:
      1. Technical accuracy and relevance of the answer
      2. Communication clarity and structure
      3. Confidence and delivery
      4. Body language and non-verbal cues
      5. Areas of excellence
      6. Specific suggestions for improvement
      
      Provide the response in valid JSON format only.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const analysis = JSON.parse(text);

    return {
      score: analysis.score,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      technicalAccuracy: analysis.technicalAccuracy,
      communicationClarity: analysis.communicationClarity,
      confidence: analysis.confidence,
      bodyLanguage: analysis.bodyLanguage
    };
  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw new Error('Failed to analyze interview response');
  }
}

export async function generateFollowUpQuestion(
  question: string,
  answer: string,
  previousQuestions: string[]
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      As an expert interviewer, generate a relevant follow-up question based on the candidate's response.
      
      Original Question: "${question}"
      Candidate's Answer: "${answer}"
      Previous Questions Asked: ${JSON.stringify(previousQuestions)}
      
      Generate a single follow-up question that:
      1. Probes deeper into the candidate's response
      2. Explores any gaps or unclear points
      3. Challenges assumptions or tests technical knowledge
      4. Avoids repeating previous questions
      5. Maintains a professional and constructive tone
      
      Provide only the follow-up question without any additional text or explanation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().replace(/^["']|["']$/g, ''); // Remove quotes if present
  } catch (error) {
    console.error('Error generating follow-up question:', error);
    throw new Error('Failed to generate follow-up question');
  }
}

export async function provideLiveCoachingTips(
  ongoingTranscript: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      As an interview coach providing real-time feedback, analyze this ongoing response and provide immediate coaching tips.
      
      Current Response: "${ongoingTranscript}"
      
      Provide a single, concise coaching tip that:
      1. Addresses immediate improvements needed
      2. Is actionable in real-time
      3. Focuses on delivery, pace, or clarity
      4. Is encouraging and constructive
      
      Provide only the coaching tip without any additional text or explanation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error('Error generating coaching tip:', error);
    throw new Error('Failed to generate coaching tip');
  }
}
