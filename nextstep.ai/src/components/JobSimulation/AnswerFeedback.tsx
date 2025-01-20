'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, ArrowRight, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface AnswerFeedbackProps {
  transcript: string;
  questionType: string;
  category: string;
}

interface ModelAnswer {
  content: string;
  keyPoints: string[];
  improvements: string[];
}

const getModelAnswer = (type: string, category: string): ModelAnswer => {
  // This would ideally come from an API or database
  // For now, we'll provide some example responses
  const answers: Record<string, Record<string, ModelAnswer>> = {
    behavioral: {
      'Teamwork': {
        content: `When I encountered a difficult team member in my previous role, I took a proactive approach to address the situation. First, I scheduled a private meeting to understand their perspective and any underlying concerns. I practiced active listening and remained professional throughout our discussion. Together, we identified the root causes of our challenges and developed an action plan with clear expectations and communication guidelines. This approach led to improved collaboration and team dynamics.`,
        keyPoints: [
          'Proactive approach to conflict resolution',
          'One-on-one discussion in private',
          'Active listening and professional demeanor',
          'Root cause analysis',
          'Collaborative solution development',
          'Clear action plan and expectations'
        ],
        improvements: [
          'Include specific metrics or outcomes',
          'Mention follow-up actions taken',
          'Describe lessons learned',
          'Add details about team impact'
        ]
      },
      'Problem Solving': {
        content: `In my last project, we faced a significant challenge when our key deliverable was at risk. I immediately gathered the team to assess the situation, identified the critical bottlenecks, and developed a mitigation plan. We implemented daily stand-ups to track progress and adjusted resources as needed. Through clear communication and focused effort, we not only met our deadline but also improved our process for future projects.`,
        keyPoints: [
          'Quick response to crisis',
          'Team collaboration',
          'Structured problem-solving approach',
          'Regular progress monitoring',
          'Resource optimization',
          'Process improvement'
        ],
        improvements: [
          'Quantify the impact',
          'Describe specific tools or methods used',
          'Include stakeholder management details',
          'Mention risk mitigation strategies'
        ]
      }
    },
    technical: {
      'System Design': {
        content: `To design a scalable web application, I would focus on key architectural principles: 1) Use a microservices architecture to enable independent scaling and deployment, 2) Implement caching at multiple levels (CDN, application, database), 3) Choose appropriate databases based on data patterns, 4) Set up load balancing and auto-scaling, 5) Monitor system performance with comprehensive metrics.`,
        keyPoints: [
          'Microservices architecture',
          'Multi-level caching strategy',
          'Database optimization',
          'Load balancing and auto-scaling',
          'Performance monitoring',
          'Security considerations'
        ],
        improvements: [
          'Include specific technology choices',
          'Address disaster recovery',
          'Discuss cost optimization',
          'Add deployment strategy details'
        ]
      }
    }
  };

  return answers[type]?.[category] || {
    content: 'Model answer not available for this question type.',
    keyPoints: [],
    improvements: []
  };
};

export const AnswerFeedback = ({ transcript, questionType, category }: AnswerFeedbackProps) => {
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const modelAnswer = getModelAnswer(questionType, category);

  const analyzeAnswer = (transcript: string, modelAnswer: ModelAnswer) => {
    const improvements: string[] = [];
    
    // Length analysis
    if (transcript.split(' ').length < 50) {
      improvements.push('Provide more detail in your response');
    }

    // Key point coverage
    const transcriptLower = transcript.toLowerCase();
    const missingPoints = modelAnswer.keyPoints.filter(point => 
      !transcriptLower.includes(point.toLowerCase())
    );

    if (missingPoints.length > 0) {
      improvements.push(`Consider including key points: ${missingPoints.slice(0, 2).join(', ')}`);
    }

    // Structure analysis
    if (!transcript.includes('example') && !transcript.includes('instance')) {
      improvements.push('Include specific examples to support your points');
    }

    return improvements;
  };

  const improvements = analyzeAnswer(transcript, modelAnswer);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Answer Analysis</h3>
        <button
          onClick={() => setShowModelAnswer(!showModelAnswer)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Star className="w-4 h-4" />
          <span>Model Answer</span>
          {showModelAnswer ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {showModelAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-l-4 border-blue-500 pl-4 py-2"
          >
            <h4 className="font-semibold mb-2">Model Response:</h4>
            <p className="text-gray-700 mb-4">{modelAnswer.content}</p>
            
            <h5 className="font-semibold mb-2">Key Points:</h5>
            <ul className="list-disc list-inside space-y-1 mb-4">
              {modelAnswer.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600">{point}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-orange-600">
          <Lightbulb className="w-5 h-5" />
          <h4 className="font-semibold">Suggested Improvements</h4>
        </div>

        <div className="space-y-2">
          {improvements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2"
            >
              <ArrowRight className="w-4 h-4 text-orange-500 mt-1" />
              <span className="text-gray-700">{improvement}</span>
            </motion.div>
          ))}
          {modelAnswer.improvements.map((improvement, index) => (
            <motion.div
              key={`model-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (improvements.length + index) * 0.1 }}
              className="flex items-start space-x-2"
            >
              <ArrowRight className="w-4 h-4 text-orange-500 mt-1" />
              <span className="text-gray-700">{improvement}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-600" />
          <h4 className="font-semibold">Your Response:</h4>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
      </div>
    </div>
  );
};
