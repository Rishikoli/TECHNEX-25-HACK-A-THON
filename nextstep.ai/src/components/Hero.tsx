import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Target } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Background Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10"
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6"
          >
            Transform Your Career with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              AI-Powered Tools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto"
          >
            Get instant feedback, personalized recommendations, and improve your chances of landing your dream job with our advanced AI technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 group">
              <span>Analyze Your Resume</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <StatsCard
              icon={<FileText className="w-6 h-6" />}
              value="50k+"
              label="Resumes Analyzed"
            />
            <StatsCard
              icon={<Target className="w-6 h-6" />}
              value="95%"
              label="Success Rate"
            />
            <StatsCard
              icon={<Sparkles className="w-6 h-6" />}
              value="24/7"
              label="AI Support"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsCard = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center"
  >
    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mx-auto mb-4">
      {icon}
    </div>
    <div className="text-2xl font-bold text-neutral-900 mb-1">{value}</div>
    <div className="text-neutral-600">{label}</div>
  </motion.div>
);
