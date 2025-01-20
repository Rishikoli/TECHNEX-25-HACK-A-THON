'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [
        "+1 (555) 123-4567",
        "Mon-Fri 9am-6pm EST"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "support@nextstep.ai",
        "careers@nextstep.ai"
      ]
    },
    {
      icon: MapPin,
      title: "Office",
      details: [
        "123 Innovation Drive",
        "Silicon Valley, CA 94025"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How quickly can I expect a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Yes, we offer customized enterprise plans for organizations. Contact our sales team for details."
    },
    {
      question: "Is technical support available 24/7?",
      answer: "Yes, our technical support team is available 24/7 for all premium users."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Have questions? We're here to help you achieve your career goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-lg bg-primary-50 mb-4">
                  <info.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-neutral-600">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-neutral-600">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Support */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Global Support
          </h2>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              <span>20+ Languages</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              <span>Live Chat</span>
            </div>
          </div>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Our global support team is here to help you succeed, no matter where you are in the world.
          </p>
        </div>
      </section>
    </div>
  );
}
