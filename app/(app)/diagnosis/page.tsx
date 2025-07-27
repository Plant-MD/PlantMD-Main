"use client";
import React, { useEffect, useState } from "react";
import DiagnosisCard from "@/components/shared/DiagnosisCard";
import axios from "axios";


function Diagnosis() {
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const params = new URLSearchParams(window.location.search);
      const predictionsParam = params.get("predictions");

      if (!predictionsParam) return;

      try {
        const predictions = JSON.parse(decodeURIComponent(predictionsParam));

        // Fetch all plant data in parallel
        const responses = await Promise.all(
          predictions.map((prediction: any) => {
            // Replace underscores with space before encoding
            const diseaseName = prediction.class;
            const confidence = prediction.confidence;

            return axios.get(
              `/api/predict?disease_name=${encodeURIComponent(diseaseName)}&confidence=${encodeURIComponent(confidence)}`
            );
          })
        );

        setPlants(responses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
    console.log(plants)
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="main max-w-3xl mx-auto px-4 py-5 mb-10">
        {plants.map((plant, index) => (
          <div key={index}>
            <DiagnosisCard {...plant} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diagnosis;
