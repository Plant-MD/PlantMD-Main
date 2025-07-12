import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LoadingScreen from "@/components/LoadingScreen"
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react"
import Hero from "@/components/Hero/Hero"
import About from "@/components/Hero/About"

export default function PlantMDLanding() {
  // const [showComingSoon, setShowComingSoon] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)

  // const handleComingSoon = () => {
  //   setShowComingSoon(true)
  // }

  // const handleLoadingComplete = () => {
  //   setIsLoading(false)
  // }

  // if (isLoading) {
  //   return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  // }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      {/* About Section */}

      <About />

      {/* Team Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Our Team</h2>

          <div className="flex flex-col items-center space-y-6">
            {/* Top row - 2 members */}
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12">
              <div className="text-center animate-fade-in-up">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-black overflow-hidden">
                  <Image
                    src="/images/team/mentor.jpg"
                    alt="Abhishek Dev"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">Abhishek Dev</h3>
                <p className="text-gray-600">Mentor</p>
              </div>
              <div className="text-center animate-fade-in-up delay-200">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-black overflow-hidden">
                  <Image
                    src="/images/team/peermentor.jpg"
                    alt="Aanchal Nancy Jha"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">Aanchal Nancy Jha</h3>
                <p className="text-gray-600">Team Member</p>
              </div>
            </div>

            {/* Bottom row - 6 members */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                { name: "Bishika Pant", image: "1.jpg" },
                { name: "Chetna Sharma", image: "2.jpg" },
                { name: "Mandip Sapkota", image: "3.jpg" },
                { name: "Safal Poudel", image: "4.jpg" },
                { name: "Suyog Prasai", image: "5.jpg" },
                { name: "Vishesh Jha", image: "6.jpg" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 border-4 border-black overflow-hidden hover:scale-110 transition-transform duration-300">
                    <Image
                      src={`/images/team/${member.image}`}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-xs text-gray-600">Member</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Using The App Section */}
      <section className="bg-gray-50 px-4 sm:px-6 py-8 sm:py-16" id="tutorial">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Using The App</h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center animate-slide-in-left delay-200">
              {/* Mobile phone frame for Step 1 */}
              <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-64 sm:w-72 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[2.2rem] p-2">
                  <div className="bg-gray-100 rounded-[1.8rem] h-[400px] flex items-center justify-center">
                    <Image
                      src="/images/placeholder-step1.jpg"
                      alt="Step 1 - Upload photo"
                      width={180}
                      height={350}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1</h3>
              <p className="text-gray-600">
                Put a simple photo containing a leaf of your plant and upload it to our app from our app.
              </p>
            </div>

            <div className="text-center animate-scale-in delay-400">
              {/* Mobile phone frame for Step 2 */}
              <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-64 sm:w-72 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[2.2rem] p-2">
                  <div className="bg-gray-100 rounded-[1.8rem] h-[400px] flex items-center justify-center">
                    <Image
                      src="/images/placeholder-step2.jpg"
                      alt="Step 2 - Check results"
                      width={180}
                      height={350}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2</h3>
              <p className="text-gray-600">Check for the results and what your plant's are suffering from.</p>
            </div>

            <div className="text-center animate-slide-in-right delay-600">
              {/* Mobile phone frame for Step 3 */}
              <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-64 sm:w-72 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[2.2rem] p-2">
                  <div className="bg-gray-100 rounded-[1.8rem] h-[400px] flex items-center justify-center">
                    <Image
                      src="/images/placeholder-step3.jpg"
                      alt="Step 3 - Provide feedback"
                      width={180}
                      height={350}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3</h3>
              <p className="text-gray-600">Provide a feedback for the diagnosis of plant disease.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image
              src="/images/video-background.png"
              alt="Plant MD in action - Smart farming technology"
              width={800}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button
                // onClick={handleComingSoon}
                className="bg-[#011606] hover:bg-[#022a0a] text-white border-0 rounded-full w-24 h-24 sm:w-28 sm:h-28 transition-all duration-300 shadow-2xl"
              >
                <Play className="w-10 h-10 sm:w-12 sm:h-12" />
              </Button>
            </div>
          </div>
        </div>
      </section>

  
    </div>
  )
}