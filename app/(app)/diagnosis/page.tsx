import React from 'react'
import data from './data.json' assert { type: 'json' }; // Import JSON as an object
import DiagnosisCard from '@/components/shared/DiagnosisCard';

function Diagnosis() {
  return (
    <div className="min-h-screen bg-white">
      <div className="main max-w-3xl mx-auto px-4 py-5">

        <DiagnosisCard {...data} />

      </div>

    </div>
  )
}

export default Diagnosis