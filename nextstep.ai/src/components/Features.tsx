import { motion } from 'framer-motion';
import { 
  FileSearch, 
  Target, 
  TrendingUp, 
  Users,
  Zap,
  Award,
  LineChart,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: <FileSearch />,
    title: "Smart Resume Analysis",
    description: "Our AI analyzes your resume against industry standards and job requirements."
  },
  {
    icon: <Target />,
    title: "Job Match Scoring",
    description: "Get instant compatibility scores for job postings based on your resume."
  },
  {
    icon: <TrendingUp />,
    title: "Skill Gap Analysis",
    description: "Identify missing skills and get recommendations for improvement."
  },
  {
    icon: <Users />,
    title: "Industry Insights",
    description: "Access real-time industry trends and salary insights."
  },
  {
    icon: <Zap />,
    title: "Instant Feedback",
    description: "Receive immediate suggestions for resume optimization."
  },
  {
    icon: <Award />,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems."
  },
  {
    icon: <LineChart />,
    title: "Progress Tracking",
    description: "Monitor your improvement and application success rate."
  },
  {
    icon: <Shield />,
    title: "Privacy First",
    description: "Your data is encrypted and secure with enterprise-grade protection."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const Features = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Powered by Advanced{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              AI Technology
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive resume analysis and career guidance
            to help you stand out in today's competitive job market.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
