import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  },
};

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    console.log('Starting DOCX extraction...');
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value.trim();
    
    if (!text) {
      console.error('No text content found in DOCX');
      throw new Error('No text content found in document');
    }
    
    console.log('DOCX extraction completed successfully');
    return text;
  } catch (err: any) {
    console.error('DOCX extraction error:', err);
    throw new Error(`Failed to extract text from document: ${err.message}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received file upload request');
    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      console.error('No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('Processing file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text based on file type
    let text = '';
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.type === 'application/msword'
    ) {
      text = await extractTextFromDOCX(buffer);
    } else {
      console.error('Unsupported file type:', file.type);
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a DOC or DOCX file.' },
        { status: 400 }
      );
    }

    // Clean up the extracted text
    text = text
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
      .trim(); // Remove leading/trailing whitespace

    if (!text) {
      console.error('No text could be extracted from the file');
      return NextResponse.json(
        { error: 'No text could be extracted from the file. Please check if the file is corrupted or empty.' },
        { status: 400 }
      );
    }

    console.log('Successfully extracted text from file');
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Error processing resume:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process resume. Please try again.' },
      { status: 500 }
    );
  }
}
