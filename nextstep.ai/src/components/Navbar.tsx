'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import WaveClipText from './WaveClipText';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: 'Tools',
      href: '/tools',
      items: [
        { label: 'Resume Analyzer', href: '/tools/resume-analyzer' },
        { label: 'ATS Optimizer', href: '/tools/ats-optimizer' },
        { label: 'Interview Preparation', href: '/tools/interview-prep' },
      ],
    },
    {
      label: 'Solutions',
      href: '/solutions',
      items: [
        { label: 'Career Insights', href: '/solutions/career-insights' },
        { label: 'Skill Development', href: '/solutions/skill-development' },
      ],
    },
    {
      label: 'Resources',
      href: '/resources',
      items: [
        { label: 'Career Blog', href: '/resources/blog' },
        { label: 'Success Stories', href: '/resources/success-stories' },
        { label: 'Help Center', href: '/resources/help' },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <AnimatedLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-500 transition-colors py-2"
                >
                  {item.label}
                </Link>
                {/* Dropdown */}
                <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary-500"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="mb-4">
              <Link
                href={item.href}
                className="text-lg font-medium text-neutral-900 hover:text-primary-500"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              <div className="mt-2 ml-4 space-y-2">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="block text-neutral-600 hover:text-primary-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/contact"
            className="block w-full px-4 py-2 bg-primary-500 text-white rounded-lg text-center hover:bg-primary-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
