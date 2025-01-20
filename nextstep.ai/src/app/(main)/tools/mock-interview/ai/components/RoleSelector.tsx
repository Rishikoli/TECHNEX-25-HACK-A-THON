'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Search } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  description: string;
  skills: string[];
  level: string;
}

interface RoleSelectorProps {
  onSelect: (role: Role) => void;
}

const roles: Role[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Specialize in building user interfaces and web applications',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    level: 'All Levels',
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Focus on server-side logic and database management',
    skills: ['Node.js', 'Python', 'Databases', 'APIs', 'Cloud'],
    level: 'All Levels',
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    description: 'Handle both frontend and backend development',
    skills: ['Frontend', 'Backend', 'DevOps', 'Databases', 'APIs'],
    level: 'All Levels',
  },
  {
    id: 'devops-eng',
    title: 'DevOps Engineer',
    description: 'Manage deployment, scaling, and operations',
    skills: ['CI/CD', 'Cloud', 'Containers', 'Infrastructure', 'Automation'],
    level: 'All Levels',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data sets',
    skills: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis', 'SQL'],
    level: 'All Levels',
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    description: 'Build and deploy machine learning models',
    skills: ['Python', 'Deep Learning', 'MLOps', 'TensorFlow', 'PyTorch'],
    level: 'All Levels',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead product development and strategy',
    skills: ['Strategy', 'Leadership', 'Analytics', 'UX', 'Agile'],
    level: 'All Levels',
  },
  {
    id: 'ui-designer',
    title: 'UI/UX Designer',
    description: 'Design user interfaces and experiences',
    skills: ['Design', 'Prototyping', 'User Research', 'Figma', 'Adobe XD'],
    level: 'All Levels',
  },
];

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const filteredRoles = roles.filter(
    (role) =>
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    onSelect(role);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search roles or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoles.map((role) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedRole?.id === role.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-200'
            }`}
            onClick={() => handleRoleSelect(role)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-emerald-500 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">{role.title}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 ${
                  selectedRole?.id === role.id
                    ? 'text-emerald-500'
                    : 'text-gray-300'
                }`}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
