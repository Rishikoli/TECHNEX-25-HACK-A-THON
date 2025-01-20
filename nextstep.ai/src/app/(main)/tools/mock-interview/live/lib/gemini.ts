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

interface DetailedAnalysisResult {
  clarity: number;
  relevance: number;
  technical_depth: number;
  communication: number;
  examples: number;
  problem_solving: number;
  confidence: number;
}

export async function analyzeInterview(
  question: string,
  answer: string,
  transcription: string,
  bodyLanguageData: any
): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert interview coach analyzing a mock interview response. Analyze the following interview response and provide structured feedback.

Question: "${question}"
Verbal Response: "${answer}"
Speech Transcription: "${transcription}"
Body Language Data: ${JSON.stringify(bodyLanguageData)}

Provide your analysis in the following format exactly:
{
  "score": <number between 0-100>,
  "strengths": [
    <list of 3-5 key strengths as complete sentences>
  ],
  "improvements": [
    <list of 3-5 specific areas for improvement as complete sentences>
  ],
  "technicalAccuracy": <number between 0-100>,
  "communicationClarity": <number between 0-100>,
  "confidence": <number between 0-100>,
  "bodyLanguage": [
    <list of 2-3 specific observations about body language>
  ]
}

Important:
1. Respond ONLY with the JSON object, no additional text
2. Ensure all numbers are between 0-100
3. Make all feedback specific and actionable
4. Format as valid JSON with double quotes for strings`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Try to parse the response as JSON
      const analysis = JSON.parse(text);
      return {
        score: Math.min(100, Math.max(0, analysis.score || 0)),
        strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
        improvements: Array.isArray(analysis.improvements) ? analysis.improvements : [],
        technicalAccuracy: Math.min(100, Math.max(0, analysis.technicalAccuracy || 0)),
        communicationClarity: Math.min(100, Math.max(0, analysis.communicationClarity || 0)),
        confidence: Math.min(100, Math.max(0, analysis.confidence || 0)),
        bodyLanguage: Array.isArray(analysis.bodyLanguage) ? analysis.bodyLanguage : []
      };
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      // Provide default response if parsing fails
      return {
        score: 70,
        strengths: ['Good attempt at answering the question'],
        improvements: ['Consider providing more specific examples'],
        technicalAccuracy: 70,
        communicationClarity: 70,
        confidence: 70,
        bodyLanguage: ['Maintained good posture during the interview']
      };
    }
  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw new Error('Failed to analyze interview response');
  }
}

export async function analyzeInterviewDetailed(
  question: string,
  answer: string
): Promise<DetailedAnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `As an expert interviewer, analyze this interview response and provide detailed scoring.

Question: "${question}"
Answer: "${answer}"

Analyze the answer based on these criteria and provide a score out of 10 for each:
1. Clarity: How clear and well-structured is the response?
2. Relevance: How well does it address the question?
3. Technical_depth: Level of technical understanding demonstrated
4. Communication: Effectiveness of communication and articulation
5. Examples: Quality and relevance of examples provided
6. Problem_solving: Evidence of analytical and problem-solving skills
7. Confidence: Level of confidence and authority in the response

Respond with ONLY a JSON object containing the scores. Example:
{
  "clarity": 8,
  "relevance": 7,
  "technical_depth": 9,
  "communication": 8,
  "examples": 6,
  "problem_solving": 7,
  "confidence": 8
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    try {
      const feedback = JSON.parse(response);
      return feedback;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Return default feedback if parsing fails
      return {
        clarity: 5,
        relevance: 5,
        technical_depth: 5,
        communication: 5,
        examples: 5,
        problem_solving: 5,
        confidence: 5
      };
    }
  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw error;
  }
}

export async function generateFollowUpQuestion(
  question: string,
  answer: string,
  previousQuestions: string[]
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert interviewer. Generate a relevant follow-up question based on this candidate's response.

Previous Question: "${question}"
Candidate's Answer: "${answer}"
Previous Questions Asked: ${JSON.stringify(previousQuestions)}

Requirements:
1. Ask ONE clear, specific follow-up question
2. Focus on exploring gaps or unclear points
3. Challenge assumptions or test technical knowledge
4. Avoid repeating previous questions
5. Keep a professional and constructive tone

Respond with ONLY the follow-up question, no additional text or explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response by removing quotes and extra whitespace
    return text.replace(/^["'\s]+|["'\s]+$/g, '');
  } catch (error) {
    console.error('Error generating follow-up question:', error);
    return 'Could you elaborate more on your previous answer?';
  }
}

export async function provideLiveCoachingTips(
  ongoingTranscript: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `As an interview coach providing real-time feedback, analyze this ongoing response and provide ONE immediate coaching tip.

Current Response: "${ongoingTranscript}"

Requirements:
1. Provide ONE short, specific tip
2. Make it actionable in real-time
3. Focus on delivery, pace, or clarity
4. Keep it encouraging and constructive

Respond with ONLY the coaching tip, no additional text or explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response by removing quotes and extra whitespace
    return text.replace(/^["'\s]+|["'\s]+$/g, '');
  } catch (error) {
    console.error('Error generating coaching tip:', error);
    return 'Speak clearly and maintain a steady pace';
  }
}
