'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const TipsSection: React.FC = () => {
  const tips = [
    'Ensure good lighting and clear focus',
    'Include affected areas in the frame',
    'Avoid blurry or extremely close shots',
    'Capture multiple angles if needed'
  ];

  return (
    <div className="bg-gradient-to-r from-pale/50 to-mint/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-sage/10 mx-3 sm:mx-0">
      <h3 className="text-lg sm:text-xl font-bold text-primary-dark mb-4 sm:mb-6 flex items-center">
        <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-mint" />
        Tips for Best Results
      </h3>
      <div className="grid gap-3 sm:gap-6 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-mint rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm sm:text-base text-sage">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TipsSection;
