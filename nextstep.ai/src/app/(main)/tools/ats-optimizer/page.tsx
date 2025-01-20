'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Search, Settings, BarChart } from 'lucide-react';

export default function ATSOptimizerPage() {
  const features = [
    {
      icon: CheckCircle,
      title: "ATS Compatibility Check",
      description: "Verify if your resume will successfully pass through Applicant Tracking Systems."
    },
    {
      icon: Search,
      title: "Keyword Analysis",
      description: "Identify missing keywords and phrases that are crucial for your target role."
    },
    {
      icon: Settings,
      title: "Format Optimization",
      description: "Ensure your resume's format and structure are ATS-friendly."
    },
    {
      icon: BarChart,
      title: "Success Probability",
      description: "Get a detailed score of your resume's likelihood to pass ATS systems."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary-500 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ATS Optimization Tool
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Ensure your resume gets past Applicant Tracking Systems and into the hands of hiring managers.
            </p>
            <button className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Check Your Resume
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-secondary-50">
                    <feature.icon className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Upload Resume",
                  description: "Upload your resume in any standard format."
                },
                {
                  step: "2",
                  title: "ATS Analysis",
                  description: "Our system analyzes your resume against common ATS requirements."
                },
                {
                  step: "3",
                  title: "Get Score",
                  description: "Receive a detailed ATS compatibility score and recommendations."
                },
                {
                  step: "4",
                  title: "Optimize",
                  description: "Make the suggested improvements to increase your ATS success rate."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-500 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't Let ATS Systems Block Your Dream Job
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            95% of Fortune 500 companies use ATS. Make sure your resume is optimized to get through.
          </p>
          <button className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-colors">
            Start Optimizing
          </button>
        </div>
      </section>
    </div>
  );
}
