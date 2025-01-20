import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

// Initialize PDF.js worker
if (typeof window !== 'undefined') {
  // Dynamically import the worker
  import('pdfjs-dist/build/pdf.worker.min.js').then(worker => {
    GlobalWorkerOptions.workerSrc = worker.default;
  });
}

export async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }

        const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
        const loadingTask = getDocument({ data: typedarray });
        
        try {
          const pdf = await loadingTask.promise;
          let fullText = '';
          
          // Get total number of pages
          const numPages = pdf.numPages;
          
          // Extract text from each page
          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(' ');
            fullText += pageText + '\n';
          }
          
          if (!fullText.trim()) {
            throw new Error('No text content found in PDF');
          }
          
          resolve(fullText.trim());
        } catch (err) {
          console.error('PDF parsing error:', err);
          reject(new Error('Failed to parse PDF content'));
        }
      } catch (err) {
        console.error('PDF extraction error:', err);
        reject(new Error('Failed to extract text from PDF'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export async function extractTextFromDoc(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        if (!text?.trim()) {
          throw new Error('No text content found in document');
        }
        resolve(text.trim());
      } catch (err) {
        reject(new Error('Failed to extract text from document'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
