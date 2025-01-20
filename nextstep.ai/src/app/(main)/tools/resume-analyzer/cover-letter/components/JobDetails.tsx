'use client';

import { useState, useEffect } from 'react';

interface JobDetailsData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

interface JobDetailsProps {
  onChange: (details: JobDetailsData) => void;
}

const JobDetails = ({ onChange }: JobDetailsProps) => {
  const [details, setDetails] = useState<JobDetailsData>({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
  });

  useEffect(() => {
    onChange(details);
  }, [details, onChange]);

  const handleChange = (field: keyof JobDetailsData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newDetails = { ...details, [field]: e.target.value };
    setDetails(newDetails);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-neutral-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          value={details.jobTitle}
          onChange={handleChange('jobTitle')}
          placeholder="e.g. Software Engineer"
          className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          value={details.companyName}
          onChange={handleChange('companyName')}
          placeholder="e.g. Acme Corporation"
          className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-neutral-700 mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          value={details.jobDescription}
          onChange={handleChange('jobDescription')}
          placeholder="Paste the job description here..."
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>
    </div>
  );
};

export type { JobDetailsData };
export default JobDetails;
