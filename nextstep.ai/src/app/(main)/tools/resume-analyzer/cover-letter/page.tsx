'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import FileUpload from './components/FileUpload';
import JobDetails from './components/JobDetails';
import type { JobDetailsData } from './components/JobDetails';

export default function CoverLetterPage() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDetails, setJobDetails] = useState<JobDetailsData>({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleResumeSelect = (text: string) => {
    setResumeText(text);
  };

  const handleError = (message: string) => {
    toast.error(message);
  };

  const handleJobDetailsChange = (details: JobDetailsData) => {
    setJobDetails(details);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeText) {
      toast.error('Please upload your resume first');
      return;
    }

    if (!jobDetails.jobTitle || !jobDetails.companyName || !jobDetails.jobDescription) {
      toast.error('Please fill in all job details');
      return;
    }

    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resumeText,
          ...jobDetails,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate cover letter');
      }

      const data = await response.json();
      
      // Store the generated cover letter and job details in localStorage
      localStorage.setItem('coverLetter', data.coverLetter);
      localStorage.setItem('jobTitle', jobDetails.jobTitle);
      localStorage.setItem('companyName', jobDetails.companyName);

      // Navigate to the display page
      router.push('/tools/resume-analyzer/cover-letter/display');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cover Letter Generator</h1>
        <p className="text-neutral-600">
          Upload your resume and provide job details to generate a tailored cover letter.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
            <FileUpload onFileSelect={handleResumeSelect} onError={handleError} />
          </div>

          <div>
            <h2 className="text-xl font-semibold my-4">Job Details</h2>
            <JobDetails onChange={handleJobDetailsChange} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-3 px-6 text-white bg-primary-600 rounded-lg font-medium
            ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}
            transition-colors duration-200`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Generating Cover Letter...</span>
            </div>
          ) : (
            'Generate Cover Letter'
          )}
        </button>
      </form>
    </div>
  );
}
