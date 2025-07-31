"use client";
import React, { useEffect, useState } from "react";
import DiagnosisCard from "@/components/shared/DiagnosisCard";
import axios from "axios";
import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


function Diagnosis() {
  const [plants, setPlants] = useState<any[]>([]);
  const [plantType, setPlantType] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      const params = new URLSearchParams(window.location.search);
      const predictionsParam = params.get("predictions");
      const plantParam = params.get("plant");

      if (!predictionsParam) return;

      setPlantType(plantParam || 'plant');

      try {
        const predictions = JSON.parse(decodeURIComponent(predictionsParam));
        console.log('Parsed predictions:', predictions);

        // Fetch all plant data in parallel with error handling
        const responses = await Promise.allSettled(
          predictions.map((prediction: any) => {
            const diseaseName = prediction.class;
            const confidence = prediction.confidence;

            return axios.get(
              `/api/predict?disease_name=${encodeURIComponent(diseaseName)}&confidence=${encodeURIComponent(confidence)}`
            );
          })
        );

        // Process successful responses and create fallback data for failed ones
        const processedPlants = responses.map((response, index) => {
          if (response.status === 'fulfilled') {
            return response.value.data;
          } else {
            console.error(`Failed to fetch data for prediction ${index}:`, response.reason);
            // Create fallback data structure
            const prediction = predictions[index];
            return {
              success: true,
              disease: {
                _id: `fallback-${index}`,
                disease_code: 'N/A',
                disease_name: prediction.class.replace(/_/g, ' '),
                scientific_name: 'Unknown',
                common_plants: ['Unknown'],
                category: 'Unknown',
                risk_factor: 'Unknown'
              },
              cure: {
                _id: `fallback-cure-${index}`,
                disease_id: `fallback-${index}`,
                disease: prediction.class.replace(/_/g, ' '),
                cure: ['Treatment information not available'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              },
              confidence: Number(prediction.confidence) * 100
            };
          }
        });

        setPlants(processedPlants);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Disease Analysis Results</h1>
                  <p className="text-gray-600">Analysis for your {plantType} plant</p>
                </div>
              </div>
            </div>
            <Badge className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold">
              {plantType.charAt(0).toUpperCase() + plantType.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600">Analyzing your plant...</p>
            </div>
          </div>
        ) : plants.length > 0 ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-oswald font-bold text-gray-900 mb-2">
                Analysis Complete
              </h2>
            </div>
            
            {plants.map((plant, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <DiagnosisCard {...plant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Results</h3>
            <p className="text-gray-600">No disease predictions were found for your plant.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
