'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { MessageSquare, Book } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricHistory {
  timestamp: number;
  value: number;
}

interface AnalyticsData {
  vocabulary: number;
  clarity: number;
}

interface InterviewAnalyticsProps {
  transcript: string;
  isRecording: boolean;
}

export const InterviewAnalytics = ({
  transcript,
  isRecording,
}: InterviewAnalyticsProps) => {
  const [metrics, setMetrics] = useState<AnalyticsData>({
    vocabulary: 0,
    clarity: 0,
  });

  const [history, setHistory] = useState<{
    [key: string]: MetricHistory[];
  }>({
    vocabulary: [],
    clarity: [],
  });

  const [uniqueWords, setUniqueWords] = useState(new Set<string>());
  const lastTranscriptRef = useRef<string>('');

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(updateMetrics, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording, transcript]);

  const updateMetrics = () => {
    if (!transcript || transcript === lastTranscriptRef.current) return;
    lastTranscriptRef.current = transcript;

    const words = transcript.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);

    // Update unique words
    words.forEach(word => uniqueWords.add(word));
    setUniqueWords(new Set(uniqueWords));
    
    const newMetrics = {
      vocabulary: calculateVocabularyScore(words),
      clarity: calculateClarity(transcript),
    };

    setMetrics(newMetrics);

    const timestamp = Date.now();
    setHistory(prev => {
      const newHistory = { ...prev };
      Object.keys(newMetrics).forEach(key => {
        newHistory[key] = [
          ...prev[key],
          { timestamp, value: newMetrics[key as keyof AnalyticsData] }
        ].slice(-30); // Keep last 30 seconds
      });
      return newHistory;
    });
  };

  const calculateVocabularyScore = (words: string[]): number => {
    if (words.length === 0) return 0;

    // Calculate lexical diversity (unique words / total words)
    const uniqueWordCount = uniqueWords.size;
    const totalWords = words.length;
    const lexicalDiversity = uniqueWordCount / totalWords;

    // Check for advanced vocabulary
    const advancedWords = new Set([
      'therefore', 'however', 'moreover', 'consequently', 'furthermore',
      'nevertheless', 'specifically', 'additionally', 'subsequently', 'accordingly',
      'analyze', 'implement', 'integrate', 'optimize', 'facilitate',
      'paradigm', 'methodology', 'infrastructure', 'innovative', 'strategic'
    ]);

    const advancedWordCount = words.filter(word => advancedWords.has(word)).length;
    const advancedWordRatio = advancedWordCount / totalWords;

    // Calculate final score
    const diversityScore = Math.min(100, lexicalDiversity * 100);
    const advancedScore = Math.min(100, advancedWordRatio * 200);
    
    return Math.round((diversityScore * 0.7 + advancedScore * 0.3));
  };

  const calculateClarity = (text: string): number => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    if (sentences.length === 0) return 0;
    
    // Check average sentence length (ideal: 15-20 words)
    const avgWordsPerSentence = sentences.reduce((acc, sentence) => 
      acc + sentence.trim().split(/\s+/).length, 0) / sentences.length;
    
    // Check for transition words
    const transitionWords = ['first', 'second', 'finally', 'moreover', 'furthermore', 'therefore'];
    const hasTransitions = transitionWords.some(word => text.toLowerCase().includes(word));
    
    // Check for proper punctuation
    const properPunctuation = sentences.every(s => s.trim().match(/[.!?]$/));
    
    let score = 0;
    
    // Score for sentence length
    if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) score += 40;
    else if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 30) score += 20;
    
    // Score for transitions
    if (hasTransitions) score += 30;
    
    // Score for punctuation
    if (properPunctuation) score += 30;
    
    return Math.min(100, score);
  };

  const getChartData = (metricKey: string) => {
    const metricHistory = history[metricKey];
    return {
      labels: metricHistory.map((_, i) => `-${metricHistory.length - i}s`),
      datasets: [
        {
          label: metricKey.replace(/([A-Z])/g, ' $1').trim(),
          data: metricHistory.map(h => h.value),
          fill: true,
          borderColor: getMetricColor(metricKey),
          backgroundColor: `${getMetricColor(metricKey)}33`,
          tension: 0.4,
        },
      ],
    };
  };

  const getMetricColor = (metric: string): string => {
    const colors: Record<string, string> = {
      vocabulary: '#8B5CF6', // Purple
      clarity: '#6366F1', // Indigo
    };
    return colors[metric] || '#6B7280';
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'vocabulary':
        return <Book className="w-4 h-4" />;
      case 'clarity':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          callback: (value: number) => `${value}%`,
          font: { size: 10 },
          color: '#6B7280',
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10 },
          color: '#6B7280',
          maxRotation: 0,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y.toFixed(1)}%`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 8,
        hoverRadius: 4,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Speech Analysis</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg bg-opacity-20`} style={{ backgroundColor: `${getMetricColor(key)}33` }}>
                  {getMetricIcon(key)}
                </div>
                <span className="font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold" style={{ color: getMetricColor(key) }}>
                  {Math.round(value)}
                </span>
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: getMetricColor(key) }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="h-40 relative">
              <Line 
                data={getChartData(key)} 
                options={chartOptions}
                className="transition-opacity duration-200 hover:opacity-90"
              />
            </div>

            {key === 'vocabulary' && (
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Unique Words:</span>
                  <span className="font-medium">{uniqueWords.size}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
