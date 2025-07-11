import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LoadingScreen from "@/components/LoadingScreen"
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react"

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
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
          {/* iPhone mockups */}
          <div className="relative flex justify-center w-full">
            <div className="relative w-full max-w-4xl">
              {/* Circular gradients */}
              <div className="absolute -top-10 -left-32 w-64 h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-32 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>

              {/* First iPhone frame */}
              <div className="relative z-10 transform -rotate-6 inline-block animate-float">
                <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-72 sm:w-80">
                  <div className="bg-white rounded-[2.2rem] p-2">
                    <div className="bg-gray-100 rounded-[1.8rem] h-[500px] flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <p className="text-sm">Upload Plant Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left notification - positioned outside with green gradient */}
              <div className="absolute -left-28 sm:-left-36 top-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl shadow-xl p-4 flex items-center space-x-3 max-w-xs z-20 animate-bounce-slow">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌿</span>
                </div>
                <div className="text-sm text-white">
                  <p className="font-semibold">This has a lot of potential</p>
                  <p className="text-green-100 text-xs font-bold">Superr Franky</p>
                </div>
              </div>

              {/* Curved arrow connecting phones */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-[91px] h-[91px] flex items-center justify-center">
                  <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="arrowFillGradient" x1="0" y1="0" x2="91" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#011606">
                          <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="0%" stopColor="#b6e7c9">
                          <animate attributeName="offset" values="0.01;1" dur="2s" repeatCount="indefinite" />
                        </stop>
                      </linearGradient>
                    </defs>
                    <path d="M69.7664 40.1915C62.7518 34.1248 53.6518 30.3332 43.6039 30.3332C25.9726 30.3332 11.0714 41.8219 5.83887 57.709L14.7872 60.6665C16.7832 54.5992 20.6435 49.3168 25.8179 45.5721C30.9923 41.8275 37.2167 39.8118 43.6039 39.8123C50.9976 39.8123 57.7468 42.5423 63.0172 46.9407L49.2914 60.6665H83.4164V26.5415L69.7664 40.1915Z" fill="url(#arrowFillGradient)"/>
                  </svg>
                </div>
              </div>

              {/* Second iPhone frame - positioned closer */}
              <div className="absolute top-20 right-8 z-10 transform rotate-6 animate-float delay-500">
                <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-72 sm:w-80">
                  <div className="bg-white rounded-[2.2rem] p-2">
                    <div className="bg-gray-100 rounded-[1.8rem] h-[500px] flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <p className="text-sm">Disease Identified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right notification - positioned outside with green gradient */}
              <div className="absolute -right-28 sm:-right-36 bottom-12 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-xl p-4 flex items-center space-x-3 max-w-xs z-20 animate-bounce-slow delay-1000">
                <div className="text-sm text-white">
                  <p className="font-semibold">This has a lot of potential</p>
                  <p className="text-green-100 text-xs font-bold">Superr Franky</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content below phones */}
          <div className="text-center max-w-4xl mt-20 mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="text-[#054714]">Diagnose Plant Disease </span>
              <span className="text-black">Instantly</span>
              <br />
              <span className="text-[#054714]">with PlantMD</span>
            </h1>
            <Link href="/scan" passHref>
              <Button
                className="bg-[#011606] hover:bg-gray-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full animate-bounce-slow hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Try it now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-green-50 px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">About Plant MD</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4">
            PlantMD is a smart mobile application that helps farmers identify plant diseases early and suggest reliable
            treatment methods. Using advanced image recognition and data-driven insights, it provides quick, accurate
            diagnoses right from a phone. Our goal is to support sustainable farming by reducing crop loss and making
            disease management simple, fast, and accessible to farmers everywhere.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center animate-scale-in delay-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-glow">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">AI Powered</h3>
            </div>
            <div className="text-center animate-scale-in delay-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-glow delay-200">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Instant feedback</h3>
            </div>
            <div className="text-center animate-scale-in delay-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-glow delay-400">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Solution and warning</h3>
            </div>
          </div>
        </div>
      </section>

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