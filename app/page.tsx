"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import LoadingScreen from "@/components/loading-screen"
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react"

export default function PlantMDLanding() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleComingSoon = () => {
    setShowComingSoon(true)
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl sm:text-2xl font-bold text-gray-900">Plant MD</div>
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button onClick={handleComingSoon} className="text-gray-600 hover:text-gray-900 transition-colors">
            About Us
          </button>
          <button onClick={handleComingSoon} className="text-gray-600 hover:text-gray-900 transition-colors">
            Tutorial
          </button>
          <button onClick={handleComingSoon} className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </button>
          <Button onClick={handleComingSoon} className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6">
            Dashboard
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button onClick={handleComingSoon} className="md:hidden p-2">
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-gray-900"></div>
            <div className="w-full h-0.5 bg-gray-900"></div>
            <div className="w-full h-0.5 bg-gray-900"></div>
          </div>
        </button>
      </header>

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
                  <span className="text-2xl">👨‍🌾</span>
                </div>
                <div className="text-sm text-white">
                  <p className="font-semibold">This has a lot of potential</p>
                  <p className="text-green-100 text-xs font-bold">Superr Franky</p>
                </div>
              </div>

              {/* Curved arrow connecting phones */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-24 h-16 flex items-center justify-center">
                  <svg width="80" height="60" viewBox="0 0 80 60" className="text-black animate-pulse">
                    <path
                      d="M10 30 Q40 10 70 30"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M65 25 L70 30 L65 35"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  <span className="text-2xl">👨‍🌾</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content below phones */}
          <div className="text-center max-w-4xl mt-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="text-[#054714]">Diagnose Plant Disease </span>
              <span className="text-black">Instantly</span>
              <br />
              <span className="text-[#054714]">with PlantMD</span>
            </h1>
            <Button
              onClick={handleComingSoon}
              className="bg-[#011606] hover:bg-gray-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full animate-bounce-slow hover:scale-105 transition-all duration-300"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
                <path d="M13 5v14l11-7z" />
              </svg>
              Try it now
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-50 px-4 sm:px-6 py-8 sm:py-16">
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
      <section className="bg-gray-50 px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Using The App</h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center animate-slide-in-left delay-200">
              {/* Mobile phone frame for Step 1 */}
              <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-64 sm:w-72 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[2.2rem] p-2">
                  <div className="bg-gray-100 rounded-[1.8rem] h-[400px] flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=350&width=180"
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
                      src="/placeholder.svg?height=350&width=180"
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
                      src="/placeholder.svg?height=350&width=180"
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

      {/* Video Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image
              src="/images/video-background.png"
              alt="Plant MD in action - Smart farming technology"
              width={800}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button
                onClick={handleComingSoon}
                className="bg-[#011606] hover:bg-[#022a0a] text-white border-0 rounded-full w-24 h-24 sm:w-28 sm:h-28 transition-all duration-300 shadow-2xl"
              >
                <Play className="w-10 h-10 sm:w-12 sm:h-12" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-plant-dark px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">Get In Touch</h2>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Contact Form */}
            <div className="space-y-4 sm:space-y-6">
              <Input placeholder="Your Full Name" className="bg-white border-0 h-12 text-base rounded-xl" />
              <Input placeholder="Your Phone Number" className="bg-white border-0 h-12 text-base rounded-xl" />
              <Input placeholder="Your Email" className="bg-white border-0 h-12 text-base rounded-xl" />
              <Textarea placeholder="Drop your message" className="bg-white border-0 min-h-32 text-base rounded-xl" />
              <div
                className="bg-green-600 hover:bg-green-700 text-white w-full h-12 text-base rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                onClick={handleComingSoon}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                Send Message
              </div>
            </div>

            {/* Contact Info with Illustration */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-green-100 rounded-2xl p-4 sm:p-6 h-48 sm:h-64 flex items-center justify-center">
                <Image
                  src="/images/contact-illustration.png"
                  alt="Contact us - Customer support illustration"
                  width={400}
                  height={300}
                  className="rounded-lg max-w-full h-auto object-contain"
                />
              </div>

              <div className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                  <span className="break-all">connect@plantmd@gmail.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div className="space-y-1 text-sm">
                    <div>+977 9800000000</div>
                    <div>+977 9800000000</div>
                    <div>+977 9800000000</div>
                    <div>+977 9800000000</div>
                  </div>
                </div>
                {/* Add Social Media Icons here */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleComingSoon}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>

                  <button
                    onClick={handleComingSoon}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </button>

                  <button
                    onClick={handleComingSoon}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0\
