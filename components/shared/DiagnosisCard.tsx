"use client";
import React, { useState } from 'react';
import DiseaseResponse from '@/types/diagnosis_card';
import { Badge } from '../ui/badge';
import { HeartPulse } from 'lucide-react';

function DiagnosisCard(props: DiseaseResponse) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log(isFlipped);
  };

  // Confidence level interpretation
  const getConfidenceLabel = (confidence: number) => {
    if (confidence <= 25) return "Not sure";
    if (confidence <= 50) return "Pretty sure";
    if (confidence <= 75) return "Likely";
    return "Fully confident";
  };

  return (
    <div className="cursor-pointer mt-8" onClick={handleFlip}>
      {/* Front Side - Disease Information */}
      <div>
        <div className="text-xl font-bold text-white bg-green-900 py-4 px-6 rounded-t-xl flex justify-start items-center gap-2">
          {props.disease.disease_name}
          <span className="font-roboto">
            ({props.disease.scientific_name})
            <Badge
              variant="secondary"
              className="text-xs font-light font-mono bg-white text-black hover:bg-white ml-2"
            >
              {getConfidenceLabel(Math.round(props.confidence * 100) / 100)}
            </Badge>
          </span>
        </div>
      </div>

      {!isFlipped && (
        <>
          <div className="w-full h-full shadow-lg flex border rounded-b-3xl">
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-wrap gap-5">
                <div className="text-black">
                  <Badge variant="secondary" className="text-xs font-light font-mono">Code</Badge>
                  <span className="font-roboto text-sm"> {props.disease.disease_code}</span>
                </div>
                <div className="text-black">
                  <Badge variant="secondary" className="text-xs font-light font-mono">Category</Badge>
                  <span className="font-roboto text-sm"> {props.disease.category}</span>
                </div>
                <div className="text-black">
                  <Badge variant="secondary" className="text-xs font-light font-mono">Common Plants</Badge>
                  <span className="font-roboto text-sm"> {props.disease.common_plants.join(', ')}</span>
                </div>
                <div className="text-black">
                  <Badge variant="secondary" className="text-xs font-light font-mono">Risk Factor</Badge>
                  <span className="font-roboto text-sm"> {props.disease.risk_factor}</span>
                </div>
              </div>
              <p className="text-xs text-black italic mt-auto">Click to view cures</p>
            </div>
            <div className="w-full text-4xl font-oswald flex flex-col items-center justify-center">
              {props.confidence}%
            </div>
          </div>
        </>
      )}

      {/* Back Side - Cure Information */}
      {isFlipped && (
        <div className="w-full h-full bg-white border shadow-lg p-6 flex flex-col gap-4 rounded-b-3xl">
          <h2 className="text-2xl font-bold text-gray-800 flex gap-2">
            <HeartPulse />
            Cures for {props.cure.disease}
          </h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            {props.cure.cure.slice(0, 3).map((cure, index) => (
              <li key={index}>{cure}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiagnosisCard;