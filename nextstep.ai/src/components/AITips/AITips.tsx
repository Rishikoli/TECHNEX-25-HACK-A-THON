import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ThumbsUp, AlertCircle, BarChart2 } from 'lucide-react';

interface AITipsProps {
  transcript: string;
  isRecording: boolean;
  question: string;
  type: 'behavioral' | 'technical';
}

interface Metrics {
  confidence: number;
  clarity: number;
  relevance: number;
  completeness: number;
}

export const AITips = ({ transcript, isRecording, question, type }: AITipsProps) => {
  const [metrics, setMetrics] = useState<Metrics>({
    confidence: 0,
    clarity: 0,
    relevance: 0,
    completeness: 0
  });

  const calculateMetrics = (text: string) => {
    if (!text || text.trim().length === 0) {
      console.log('Empty transcript, skipping metrics calculation');
      return;
    }

    console.log('Calculating metrics for transcript:', text);

    // Calculate Confidence
    const hesitationWords = ['um', 'uh', 'like', 'maybe', 'i think', 'perhaps'];
    const words = text.toLowerCase().split(' ');
    const hesitationCount = words.filter(word => 
      hesitationWords.some(hw => word.includes(hw))
    ).length;
    const confidence = Math.max(0, Math.min(100, 100 - (hesitationCount * 10)));
    console.log('Confidence calculation:', { hesitationCount, confidence });

    // Calculate Clarity
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = sentences.length > 0 
      ? words.length / sentences.length 
      : 0;
    const clarity = Math.max(0, Math.min(100, 
      100 - Math.abs(avgWordsPerSentence - 15) * 2
    ));
    console.log('Clarity calculation:', { sentences: sentences.length, avgWordsPerSentence, clarity });

    // Calculate Relevance
    const questionWords = question.toLowerCase()
      .split(' ')
      .filter(w => w.length > 3)
      .filter(w => !['what', 'when', 'where', 'why', 'how', 'the', 'and', 'that'].includes(w));
    const matchedWords = questionWords.filter(qw => 
      words.some(w => w.includes(qw))
    ).length;
    const relevance = questionWords.length > 0
      ? Math.min(100, (matchedWords / questionWords.length) * 100)
      : 0;
    console.log('Relevance calculation:', { questionWords, matchedWords, relevance });

    // Calculate Completeness
    let completeness = 0;
    if (type === 'behavioral') {
      const starComponents = {
        situation: ['when', 'while', 'during', 'at', 'in', 'situation'],
        task: ['needed', 'had to', 'responsible', 'goal', 'task'],
        action: ['i', 'we', 'implemented', 'created', 'developed', 'managed', 'did'],
        result: ['resulted', 'achieved', 'improved', 'increased', 'decreased', 'outcome']
      };

      let starScore = 0;
      Object.entries(starComponents).forEach(([component, keywords]) => {
        const hasComponent = keywords.some(k => words.includes(k));
        if (hasComponent) starScore += 25;
        console.log(`STAR ${component}:`, { hasComponent, keywords: keywords.join(', ') });
      });
      completeness = starScore;
    } else {
      const technicalComponents = {
        approach: ['approach', 'would', 'could', 'should', 'first'],
        implementation: ['implement', 'use', 'using', 'with', 'by'],
        complexity: ['time', 'space', 'complexity', 'performance'],
        considerations: ['however', 'although', 'consider', 'trade-off']
      };

      let techScore = 0;
      Object.entries(technicalComponents).forEach(([component, keywords]) => {
        const hasComponent = keywords.some(k => words.includes(k));
        if (hasComponent) techScore += 25;
        console.log(`Technical ${component}:`, { hasComponent, keywords: keywords.join(', ') });
      });
      completeness = techScore;
    }

    console.log('Final metrics:', { confidence, clarity, relevance, completeness });

    setMetrics({
      confidence,
      clarity,
      relevance,
      completeness
    });
  };

  useEffect(() => {
    if (!isRecording && transcript) {
      calculateMetrics(transcript);
    }
  }, [transcript, isRecording, question, type]);

  const getMetricColor = (value: number): string => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart2 className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900">Real-time Analysis</h3>
        </div>
        {isRecording && (
          <span className="text-sm text-purple-600 animate-pulse">
            Recording...
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 capitalize">{key}</span>
              <span className="text-sm font-medium">{Math.round(value)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${getMetricColor(value)}`}
              />
            </div>
          </div>
        ))}
      </div>

      {!transcript && !isRecording && (
        <p className="text-gray-400 italic text-center py-2">
          Start speaking to see real-time metrics
        </p>
      )}
    </div>
  );
};
