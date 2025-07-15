import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../ui/AnimatedCard';

const FeatureGrid = () => {
  const features = [
    { title: "AI Analytics", color: "from-cyan-500 to-blue-500" },
    { title: "Real-time Processing", color: "from-violet-500 to-purple-500" },
    { title: "Cloud Integration", color: "from-amber-500 to-orange-500" },
    { title: "Secure Data", color: "from-emerald-500 to-green-500" },
    { title: "Automation Tools", color: "from-rose-500 to-pink-500" },
    { title: "Custom Solutions", color: "from-indigo-500 to-blue-700" },
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Our Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <AnimatedCard key={idx} index={idx}>
              <div className={`h-full p-8 rounded-xl bg-gradient-to-br ${feature.color} 
                shadow-2xl hover:shadow-[0_0_40px_-5px] transition-all duration-300`}>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-200">
                    Advanced AI-powered tools for your business growth and productivity.
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
