export type Diagnosis = {
    disease: string;
    severity: string;
    confidence: number;
    description: string;
    symptoms: string[];
    causes: string[];
    severityColor?: string;
    confidenceColor?: string;
  };
  
  export const diagnosisData: Diagnosis[] = [
    {
      disease: 'Leaf Spot Disease',
      severity: 'Moderate severity',
      confidence: 94,
      description: 'Fungal infection causing circular brown spots with yellow halos on leaves.',
      symptoms: ['Brown circular spots', 'Yellow halos around spots', 'Leaf yellowing'],
      causes: ['High humidity', 'Poor air circulation', 'Overhead watering'],
      severityColor: 'bg-yellow-100 text-yellow-700',
      confidenceColor: 'text-green-700',
    },
    {
      disease: 'Early Blight',
      severity: 'Mild severity',
      confidence: 78,
      description: 'Common fungal disease affecting lower leaves first.',
      symptoms: ['Dark spots with concentric rings', 'Yellowing leaves', 'Premature leaf drop'],
      causes: ['Warm, humid conditions', 'Stressed plants', 'Poor nutrition'],
      severityColor: 'bg-green-100 text-green-700',
      confidenceColor: 'text-yellow-700',
    },
  ];