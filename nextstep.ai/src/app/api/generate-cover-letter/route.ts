import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

async function generateCoverLetter(resume: string, jobTitle: string, companyName: string, jobDescription: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a professional cover letter writer. Write a compelling cover letter based on the following information:
    
    Resume:
    ${resume}
    
    Job Title: ${jobTitle}
    Company: ${companyName}
    Job Description:
    ${jobDescription}
    
    Guidelines:
    1. Keep it professional and concise (max 400 words)
    2. Highlight relevant experience and skills from the resume that match the job description
    3. Show enthusiasm for the role and company
    4. Use a formal business letter format
    5. Make it persuasive and engaging
    6. Include a strong opening and closing paragraph
    7. Avoid generic phrases and clichés
    
    Format the letter with proper spacing and paragraphs.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Failed to generate cover letter');
    }

    return text;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resume, jobTitle, companyName, jobDescription } = body;

    // Validate input
    if (!resume || !jobTitle || !companyName || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate cover letter
    const coverLetter = await generateCoverLetter(
      resume,
      jobTitle,
      companyName,
      jobDescription
    );

    return NextResponse.json({ coverLetter });
  } catch (error: any) {
    console.error('Cover letter generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}
