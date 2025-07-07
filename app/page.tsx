import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react";
import Header from "@/components/home/Header";
import ShowHeroSection from "@/components/home/Hero";
import AboutSection from "@/components/home/About";
import TeamSection from "@/components/home/Team";

export default function PlantMDLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ShowHeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <TeamSection /> 

      {/* Using The App */}
      <section className="bg-gray-50 px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Using The App</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Step 1",
                image: "placeholder-step1.jpg",
                description: "Upload a photo of your plant’s leaf via our app.",
              },
              {
                title: "Step 2",
                image: "placeholder-step2.jpg",
                description: "Get immediate feedback about your plant’s health.",
              },
              {
                title: "Step 3",
                image: "placeholder-step3.jpg",
                description: "Send feedback about the diagnosis you received.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center animate-fade-in-up">
                <div className="bg-black rounded-[2.5rem] shadow-2xl p-1 w-72 mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-[2.2rem] p-2">
                    <div className="bg-gray-100 rounded-[1.8rem] h-[400px] flex items-center justify-center">
                      <Image src={`/images/${step.image}`} alt={step.title} width={180} height={350} className="rounded-2xl" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/video-background.png"
              alt="Plant MD in action"
              width={800}
              height={400}
              className="w-full h-80 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button className="bg-[#011606] hover:bg-[#022a0a] text-white rounded-full w-24 h-24 shadow-2xl">
                <Play className="w-10 h-10" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-plant-dark px-4 sm:px-6 py-8 sm:py-16 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <form className="space-y-6 w-full">
              <Input placeholder="Your Full Name" className="bg-white h-12 rounded-xl" />
              <Input placeholder="Your Phone Number" className="bg-white h-12 rounded-xl" />
              <Input placeholder="Your Email" className="bg-white h-12 rounded-xl" />
              <Textarea placeholder="Drop your message" className="bg-white min-h-32 rounded-xl" />
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full h-12 rounded-xl">
                Send Message
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-green-100 rounded-2xl p-6 flex justify-center items-center">
                <Image
                  src="/images/contact-illustration.png"
                  alt="Contact illustration"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="text-green-400" />
                  <span>connect@plantmd.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-green-400 mt-1" />
                  <div>
                    <p>+977 9800000000</p>
                    <p>+977 9800000001</p>
                    <p>+977 9800000002</p>
                    <p>+977 9800000003</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
