import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Hero() {
    return (
        <div className="">
            <section className="relative px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
                    {/* iPhone mockups */}
                    <div className="relative flex justify-center w-full flex-col ">
                        <div className="relative w-full max-w-4xl ">
                            {/* Circular gradients - adjusted for mobile */}
                            <div className="absolute -top-5 sm:-top-10 -left-16 sm:-left-32 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-5 sm:-bottom-10 -right-16 sm:-right-32 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-30 blur-xl animate-pulse delay-1000"></div>

                            {/* First iPhone frame */}
                            <div className="relative left-4 sm:left-8 md:left-20 lg:left-20 z-10 transform -rotate-6 inline-block animate-float">
                                <div className="bg-black rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl p-1 w-36 sm:w-48 md:w-56 lg:w-[225px]">
                                    <div className="bg-white rounded-[1.2rem] sm:rounded-[2.2rem] p-1 sm:p-2">
                                        <div className="bg-gray-100 rounded-[1rem] sm:rounded-[1.8rem] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[350px] overflow-hidden">
                                            <img
                                                src="/hero/upload.png"
                                                alt="Plant image"
                                                className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.8rem]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Left notification - mobile optimized */}
                            <div className="absolute -left-8 sm:-left-12 md:-left-0 lg:-left-15 top-8 sm:top-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3 max-w-[180px] sm:max-w-xs z-20 animate-bounce-slow">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm sm:text-xl md:text-2xl">🌿</span>
                                </div>
                                <div className="text-xs sm:text-sm text-white">
                                    <p className="font-semibold leading-tight">This has a lot of potential</p>
                                    <p className="text-green-100 text-xs font-bold">Superr Franky</p>
                                </div>
                            </div>

                            {/* Curved arrow - mobile optimized */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                                <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[91px] md:h-[91px] flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                            {/* Second iPhone frame */}
                            <div className="absolute top-1 right-0 sm:right-4 md:right-15 lg:right-20 z-10 transform rotate-6 animate-float delay-500">
                                <div className="bg-black rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl p-1 w-36 sm:w-48 md:w-56 lg:w-[225px]">
                                    <div className="bg-white rounded-[1.2rem] sm:rounded-[2.2rem] p-1 sm:p-2">
                                        <div className="bg-gray-100 rounded-[1rem] sm:rounded-[1.8rem] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[350px] overflow-hidden">
                                            <img
                                                src="/hero/success.png"
                                                alt="Disease identified"
                                                className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.8rem]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right notification - mobile optimized */}
                            <div className="overflow-hidden absolute -right-8 sm:-right-12 md:-right-20 lg:-right-28 bottom-8 sm:bottom-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3 max-w-[180px] sm:max-w-xs z-20 animate-bounce-slow delay-1000">
                                <div className="text-xs sm:text-sm text-white">
                                    <p className="font-semibold leading-tight">This has a lot of potential</p>
                                    <p className="text-green-100 text-xs font-bold">Superr Franky</p>
                                </div>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm sm:text-xl md:text-2xl">🌿</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content below phones */}
                    <div className="text-center max-w-4xl mt-8 sm:mt-12 lg:mt-20 mb-8 px-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
                            <span className="text-[#054714]">Diagnose Plant Disease </span>
                            <span className="text-black">Instantly</span>
                            <br />
                            <span className="text-[#054714]">with PlantMD</span>
                        </h1>
                        <Link href="/scan" passHref>
                            <Button
                                className="bg-[#011606] hover:bg-gray-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-full animate-bounce-slow hover:scale-105 transition-all duration-300"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Try it now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero