import { Leaf, Shield, Zap } from 'lucide-react'
import React from 'react'

function About() {
    return (
        <div>
            <section id="about" className="bg-green-50 px-4 sm:px-6 py-8 sm:py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">About Plant MD</h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4 text-center font-roboto">
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
                            <h3 className="text-lg sm:text-lg font-light font-roboto text-gray-900 mb-2">AI Powered</h3>
                        </div>
                        <div className="text-center animate-scale-in delay-300">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-glow delay-200">
                                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-lg font-light font-roboto text-gray-900 mb-2">Instant feedback</h3>
                        </div>
                        <div className="text-center animate-scale-in delay-500">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-plant-dark rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-glow delay-400">
                                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-lg font-light font-roboto text-gray-900 mb-2">Solution and warning</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About