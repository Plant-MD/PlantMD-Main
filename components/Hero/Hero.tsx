import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Hero() {
    return (
        <div className="overflow-hidden">
            <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
                {/* Background gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-20 blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-20 blur-3xl animate-pulse translate-x-1/2 translate-y-1/2 delay-1000"></div>
                </div>

                <div className="relative z-10">
                    {/* Main heading - mobile first */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8">
                            <span className="text-[#054714]">Diagnose Plant Disease </span>
                            <span className="text-black">Instantly</span>
                            <br />
                            <span className="text-[#054714]">with PlantMD</span>
                        </h1>
                        
                        <Link href="/scan" passHref>
                            <Button className="bg-[#011606] hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Try it now
                            </Button>
                        </Link>
                    </div>

                    {/* Phone mockups container */}
                    <div className="relative flex justify-center items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                        {/* Left phone */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-24 lg:-translate-x-32 -rotate-6 z-20">
                            <div className="phone-mockup">
                                <div className="bg-black rounded-[20px] sm:rounded-[30px] shadow-2xl p-1 w-40 sm:w-52 lg:w-64">
                                    <div className="bg-white rounded-[16px] sm:rounded-[26px] p-1 sm:p-2">
                                        <div className="bg-gray-100 rounded-[12px] sm:rounded-[20px] h-64 sm:h-80 lg:h-96 overflow-hidden">
                                            <img
                                                src="/hero/upload.png"
                                                alt="Plant image upload interface"
                                                className="w-full h-full object-cover rounded-[12px] sm:rounded-[20px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right phone */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-24 lg:translate-x-32 rotate-6 z-20">
                            <div className="phone-mockup">
                                <div className="bg-black rounded-[20px] sm:rounded-[30px] shadow-2xl p-1 w-40 sm:w-52 lg:w-64">
                                    <div className="bg-white rounded-[16px] sm:rounded-[26px] p-1 sm:p-2">
                                        <div className="bg-gray-100 rounded-[12px] sm:rounded-[20px] h-64 sm:h-80 lg:h-96 overflow-hidden">
                                            <img
                                                src="/hero/success.png"
                                                alt="Disease diagnosis results"
                                                className="w-full h-full object-cover rounded-[12px] sm:rounded-[20px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connecting arrow */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                                <svg className="w-full h-full animate-pulse" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    <path d="M69.7664 40.1915C62.7518 34.1248 53.6518 30.3332 43.6039 30.3332C25.9726 30.3332 11.0714 41.8219 5.83887 57.709L14.7872 60.6665C16.7832 54.5992 20.6435 49.3168 25.8179 45.5721C30.9923 41.8275 37.2167 39.8118 43.6039 39.8123C50.9976 39.8123 57.7468 42.5423 63.0172 46.9407L49.2914 60.6665H83.4164V26.5415L69.7664 40.1915Z" fill="url(#arrowFillGradient)" />
                                </svg>
                            </div>
                        </div>

                        {/* Left notification bubble */}
                        <div className="absolute left-0 sm:left-4 lg:left-8 top-1/4 bg-gradient-to-r from-green-400 to-green-600 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 lg:p-4 flex items-center space-x-2 sm:space-x-3 max-w-[160px] sm:max-w-[200px] lg:max-w-xs z-40 animate-bounce">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm sm:text-lg">🌿</span>
                            </div>
                            <div className="text-xs sm:text-sm text-white">
                                <p className="font-semibold leading-tight">Upload detected!</p>
                                <p className="text-green-100 text-xs font-medium">Processing...</p>
                            </div>
                        </div>

                        {/* Right notification bubble */}
                        <div className="absolute right-0 sm:right-4 lg:right-8 bottom-1/4 bg-gradient-to-r from-green-500 to-green-700 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 lg:p-4 flex items-center space-x-2 sm:space-x-3 max-w-[160px] sm:max-w-[200px] lg:max-w-xs z-40 animate-bounce delay-1000">
                            <div className="text-xs sm:text-sm text-white">
                                <p className="font-semibold leading-tight">Diagnosis complete!</p>
                                <p className="text-green-100 text-xs font-medium">97% confident</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm sm:text-lg">✅</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA section */}
                    <div className="text-center mt-8 sm:mt-12 lg:mt-16">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                            Join thousands of gardeners who trust PlantMD for accurate plant health diagnosis
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Instant results
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                95%+ accuracy
                            </div>
                            <div className="flex items-center text-sm sm:text-base text-gray-500">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Free to use
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .phone-mockup {
                    animation: float 6s ease-in-out infinite;
                }
                
                .phone-mockup:nth-child(2) {
                    animation-delay: -3s;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                    40%, 43% { transform: translate3d(0, -8px, 0); }
                    70% { transform: translate3d(0, -4px, 0); }
                    90% { transform: translate3d(0, -2px, 0); }
                }
                
                .animate-bounce {
                    animation: bounce 3s infinite;
                }
                
                /* Responsive adjustments */
                @media (max-width: 640px) {
                    .phone-mockup {
                        animation: float 4s ease-in-out infinite;
                    }
                }
                
                @media (max-width: 480px) {
                    /* Stack phones more vertically on very small screens */
                    .absolute:nth-child(1) {
                        transform: translate(-50%, -50%) translateX(-20px) translateY(-20px) rotate(-6deg) !important;
                    }
                    
                    .absolute:nth-child(2) {
                        transform: translate(-50%, -50%) translateX(20px) translateY(20px) rotate(6deg) !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default Hero