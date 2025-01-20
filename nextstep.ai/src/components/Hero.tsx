import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Target } from 'lucide-react';
import FloatingBoxesAnimation from './FloatingBoxesAnimation';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <FloatingBoxesAnimation />
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
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
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Transform Your Career with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              AI-Powered Tools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Get instant feedback, personalized recommendations, and improve your chances of landing your dream job with our advanced AI technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center space-x-2 group">
              <span>Analyze Your Resume</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
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
    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto mb-4">
      {icon}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-white/80">{label}</div>
  </motion.div>
);
