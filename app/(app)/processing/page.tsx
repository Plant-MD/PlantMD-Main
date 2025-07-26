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
  const [plant, setPlant] = useState<string>('');
  const [hasRedirected, setHasRedirected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      if (hasRedirected) return;

      const resultId = searchParams.get('id');
      const queryPredictions = searchParams.get('predictions');

      if (resultId) {
        try {
          const response = await fetch(`/api/store-results?id=${resultId}`);
          if (response.ok) {
            const data = await response.json();
            setPredictions(data.data.predictions);
            setPlant(data.data.plant);
          } else {
            console.error('Failed to load results from server');
            router.push('/scan');
            return;
          }
        } catch (error) {
          console.error('Error loading results:', error);
          router.push('/scan');
          return;
        }
      } else if (queryPredictions) {
        try {
          const decodedPredictions = JSON.parse(decodeURIComponent(queryPredictions));
          setPredictions(decodedPredictions);
          setPlant(searchParams.get('plant') || '');
        } catch (error) {
          console.error('Failed to parse predictions:', error);
          router.push('/scan');
          return;
        }
      } else {
        router.push('/scan');
        return;
      }

      setIsLoading(false);

      const step2Timer = setTimeout(() => setStep(2), 1500);
      const step3Timer = setTimeout(() => setStep(3), 3000);
      const redirectTimer = setTimeout(() => {
        if (resultId) {
          router.push(`/diagnosis?id=${resultId}`);
        } else {
          router.push(`/diagnosis?predictions=${encodeURIComponent(JSON.stringify(predictions))}&plant=${plant}`);
        }
        setHasRedirected(true);
      }, 4500);

      return () => {
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
        clearTimeout(redirectTimer);
      };
    };

    loadResults();
  }, [router, searchParams, hasRedirected]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-soft-beige to-pale">
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-forest animate-spin mx-auto mb-4" />
            <p className="text-sage">Loading analysis results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-soft-beige to-pale">
      
      <div className="pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-soft-beige/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-12 border border-sage/20">
            
            <div className="mb-8">
              <div className="relative">
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-forest to-leaf-green rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-soft-beige rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-forest animate-spin" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-primary-dark mb-4">
                Analyzing Your {plant.charAt(0).toUpperCase() + plant.slice(1)} Plant...
              </h1>
              <p className="text-lg text-sage mb-8">
                Our AI is examining your image to detect any potential diseases or issues.
              </p>
            </div>

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
                description={`Comparing with ${plant} disease database`}
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

            <div className="w-full bg-sage/20 rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-forest to-leaf-green h-2 rounded-full transition-all duration-1000"
                   style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>

            <div className="bg-pale rounded-lg p-6 border border-sage/20">
              <h3 className="text-sm font-semibold text-forest-green mb-2 uppercase tracking-wide">
                Did You Know?
              </h3>
              <p className="text-sage text-sm">
                Our AI has been trained on over 50,000 {plant} plant images and can identify more than 30 common {plant} diseases with 95% accuracy.
              </p>
            </div>
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
    <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
      isActive ? 'bg-pale' : 'bg-sage/10'
    }`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
        isCompleted
          ? 'bg-forest text-white'
          : isActive
          ? 'bg-leaf-green text-white animate-pulse'
          : 'bg-sage/30 text-sage'
      }`}>
        {isCompleted ? <CheckCircle className="h-5 w-5" /> : icon}
      </div>

      <div className="flex-1 text-left">
        <h4 className={`font-semibold transition-colors duration-500 ${
          isActive ? 'text-primary-dark' : 'text-sage'
        }`}>
          {title}
        </h4>
        <p className={`text-sm transition-colors duration-500 ${
          isActive ? 'text-sage' : 'text-neutral-gray'
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
  );
};

export default ProcessingPage;