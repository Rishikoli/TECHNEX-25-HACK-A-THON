'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Copy, Download, ArrowLeft } from 'lucide-react';

export default function DisplayPage() {
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Get data from localStorage
    const storedCoverLetter = localStorage.getItem('coverLetter');
    const storedJobTitle = localStorage.getItem('jobTitle');
    const storedCompanyName = localStorage.getItem('companyName');

    if (storedCoverLetter && storedJobTitle && storedCompanyName) {
      setCoverLetter(storedCoverLetter);
      setJobTitle(storedJobTitle);
      setCompanyName(storedCompanyName);
    }
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      toast.success('Cover letter copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadAsPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const element = document.getElementById('cover-letter');
      if (!element) return;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Cover_Letter_${companyName.replace(/\s+/g, '_')}.pdf`);
      toast.success('Cover letter downloaded as PDF');
    } catch (err) {
      toast.error('Failed to generate PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const goBack = () => {
    router.push('/tools/resume-analyzer/cover-letter');
  };

  if (!coverLetter || !jobTitle || !companyName) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">No cover letter found</h1>
        <button
          onClick={goBack}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back and generate a cover letter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cover Letter</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
          <button
            onClick={downloadAsPDF}
            disabled={isGeneratingPDF}
            className={`inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg
              ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}`}
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
          <button
            onClick={goBack}
            className="inline-flex items-center px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-8">
        <div id="cover-letter" className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-2">
            {jobTitle} - {companyName}
          </h2>
          <div className="whitespace-pre-wrap">{coverLetter}</div>
        </div>
      </div>
    </div>
  );
}
