import React from "react";
import { Zap, Leaf, Shield } from "lucide-react";

const features = [
  { icon: <Zap className="text-white" />, label: "AI Powered" },
  { icon: <Leaf className="text-white" />, label: "Instant Feedback" },
  { icon: <Shield className="text-white" />, label: "Solution and Warning" },
];

const AboutSection: React.FC = () => {
  return (
    <section className="bg-green-50 px-4 sm:px-6 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Plant MD</h2>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed px-4">
          PlantMD is a smart mobile application that helps farmers identify plant diseases early and suggest reliable
          treatment methods. Using advanced image recognition and data-driven insights, it provides quick, accurate
          diagnoses right from a phone.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="w-16 h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-4 animate-glow">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
