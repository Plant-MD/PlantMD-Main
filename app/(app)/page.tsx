import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react"
import Hero from "@/components/Hero/Hero"
import About from "@/components/Hero/About"
import TeamSection from "@/components/Hero/Team"
import Header from "@/components/Layout/Header"
import VideoSection from "@/components/Hero/Tutorial"

export default function PlantMDLanding() {

  return (
    <div className="min-h-screen bg-white">

      <Header />

      <Hero />
      {/* About Section */}
      <div id="about">

        <About />
      </div>

      {/* Team Section */}
      <div id="team">

        <TeamSection />
      </div>
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
                      src="/hero/upload.png"
                      alt="Step 1 - Upload photo"
                      width={180}
                      height={400}
                      className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.8rem]"
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
                      src="/hero/process.png"
                      alt="Step 2 - Process Photo"
                      width={180}
                      height={350}
                      className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.8rem]"
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
                      src="/hero/success.png"
                      alt="Step 3 - Result photo"
                      width={180}
                      height={350}
                      className="w-full h-full object-cover rounded-[1rem] sm:rounded-[1.8rem]"
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

      <VideoSection />

    </div>
  )
}