import React from "react";
import Image from "next/image";

const mentors = [
  { name: "Abhishek Dev", role: "Mentor", image: "Abhishek Dev.jpeg" },
  { name: "Aanchal Nancy Jha", role: "Team Member", image: "Aanchal Nancy Jha.jpg" },
];


const members = [
  { name: "Bishika Pant", role: "Team Member", image: "Bishika Pant.png" },
  { name: "Chetna Sharma", role: "Team Member", image: "Chetna Sharma.jpeg" },
  { name: "Mandip Sapkota", role: "Team Member", image: "Mandip Sapkota.jpeg" },
  { name: "Safal Poudel", role: "Team Member", image: "Safal Poudel.jpg" },
  { name: "Suyog Prasai", role: "Team Member", image: "Suyog Prasai.jpg" },
  { name: "Vishesh Jha", role: "Team Member", image: "Vishesh Jha.jpg" },
];

const TeamSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Team</h2>

        {/* Top row: Mentors */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 mb-8">
          {mentors.map((person, i) => (
            <div key={i} className="text-center animate-fade-in-up">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-black">
                <Image
                  src={`/images/team/${person.image}`}
                  alt={person.name}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-gray-900">{person.name}</h3>
              <p className="text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>

        {/* Grid of Members */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {members.map((member, i) => (
            <div
              key={member.name}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden border-4 border-black hover:scale-110 transition-transform duration-300">
                <Image
                  src={`/images/team/${member.image}`}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
              <p className="text-xs text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
