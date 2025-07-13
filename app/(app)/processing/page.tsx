'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Eye, Brain, CheckCircle } from 'lucide-react';

const ProcessingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Retrieve and parse predictions only if not already set
    if (predictions.length === 0 && !hasRedirected) {
      const queryPredictions = searchParams.get('predictions');
      if (queryPredictions) {
        try {
          const decodedPredictions = JSON.parse(decodeURIComponent(queryPredictions));
          setPredictions(decodedPredictions);
        } catch (error) {
          console.error('Failed to parse predictions:', error);
        }
      }
    }

    // Set up timers only if not redirected
    if (!hasRedirected) {
      const step2Timer = setTimeout(() => setStep(2), 1500);
      const step3Timer = setTimeout(() => setStep(3), 3000);
      const redirectTimer = setTimeout(() => {
        router.push(
          `/diagnosis?predictions=${encodeURIComponent(JSON.stringify(predictions))}`
        );
        setHasRedirected(true); // Prevent further redirects
      }, 4000);

      return () => {
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [router, predictions, hasRedirected]); // Safe dependencies

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 animate-fade-in">
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-forest to-mint rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-forest animate-spin" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-primary-dark mb-4">
              Analyzing Your Plant...
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI is examining your image to detect any potential diseases or issues.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-6 mb-8">
            <ProcessingStep
              icon={<Eye className="h-5 w-5" />}
              title="Scanning Image"
              description="Analyzing plant structure and visible symptoms"
              isActive={step >= 1}
              isCompleted={step > 1}
            />

            <ProcessingStep
              icon={<Brain className="h-5 w-5" />}
              title="AI Analysis"
              description="Comparing with disease database"
              isActive={step >= 2}
              isCompleted={step > 2}
            />

            <ProcessingStep
              icon={<CheckCircle className="h-5 w-5" />}
              title="Generating Report"
              description="Preparing treatment recommendations"
              isActive={step >= 3}
              isCompleted={false}
            />
          </div>

          {/* Loading Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-forest to-mint h-2 rounded-full animate-progress-bar"></div>
          </div>

          {/* Fun Facts */}
          <div className="bg-pale rounded-lg p-6">
            <h3 className="text-sm font-semibold text-forest mb-2 uppercase tracking-wide">
              Did You Know?
            </h3>
            <p className="text-gray-600 text-sm">
              Our AI has been trained on over 50,000 plant images and can identify more than 30 common plant diseases with 95% accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProcessingStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

const ProcessingStep: React.FC<ProcessingStepProps> = ({
  icon,
  title,
  description,
  isActive,
  isCompleted
}) => {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>

      <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${isActive ? 'bg-pale' : 'bg-gray-50'
        }`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted
            ? 'bg-forest text-white'
            : isActive
              ? 'bg-mint text-white animate-pulse'
              : 'bg-gray-200 text-gray-400'
          }`}>
          {isCompleted ? <CheckCircle className="h-5 w-5" /> : icon}
        </div>

        <div className="flex-1 text-left">
          <h4 className={`font-semibold transition-colors duration-500 ${isActive ? 'text-primary-dark' : 'text-gray-500'
            }`}>
            {title}
          </h4>
          <p className={`text-sm transition-colors duration-500 ${isActive ? 'text-gray-600' : 'text-gray-400'
            }`}>
            {description}
          </p>
        </div>

        {isActive && !isCompleted && (
          <div className="flex-shrink-0">
            <Loader2 className="h-4 w-4 text-forest animate-spin" />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ProcessingPage;