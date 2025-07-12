import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

function Hero() {
    return (
        <div>      {/* Hero Section */}
            <section className="relative px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
                    <div className="sprouty ml-auto max-w-md">
                        <Image
                            src="/sprouty.png"
                            alt="Hero"
                            width={350}
                            height={350}
                            className="mx-auto"
                        />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight text-right">
                            <span className="text-[#054714] font-oswald">Diagnose Plant Disease </span>
                            <span className="text-black text-5xl">Instantly</span>
                            <br />
                            <span className="text-[#054714] font-oswald">with PlantMD</span>
                        </h1>
                    </div>
                    {/* Content below phones */}
                    <div className="flex justify-center items-center mr-auto flex-col">
                        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full text-center border border-green-200">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-full h-48 border-4 border-dashed border-green-400 rounded-2xl flex justify-center items-center bg-green-50 hover:bg-green-100 transition-colors pointer-cursor">
                                    <Link href="/scan">
                                        <button className="text-green-700 font-semibold">
                                            <span className="text-2xl block">Upload Image</span>
                                            <span className="text-sm">or drop a file</span>
                                        </button>
                                    </Link>
                                </div>

                                <p className="text-green-700 mt-4 text-sm">
                                    By uploading an image, you agree to our Terms of Service. <br />
                                    Learn how we handle your data in our Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero