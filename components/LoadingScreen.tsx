'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showText, setShowText] = useState(false)
  const [showSubtext, setShowSubtext] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  const words = ["Detect.", "Cure.", "Grow."]

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1500)
    const subtextTimer = setTimeout(() => setShowSubtext(true), 2500)

    const wordTimers = words.map((_, index) =>
      setTimeout(() => setWordIndex(index + 1), 3000 + index * 400)
    )

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500)
    }, 5500)

    return () => {
      clearTimeout(timer)
      clearTimeout(textTimer)
      clearTimeout(subtextTimer)
      wordTimers.forEach(clearTimeout)
    }
  }, [onLoadingComplete])

  const LogoImage = (
    <Image
      src="logo.png"
      alt="PlantMD Logo"
      width={150}
      height={150}
      className="mx-auto mb-4 animate-pulse"
    />
  )

  const AnimatedText = (
    <>
      {showSubtext && (
        <div className="flex justify-center space-x-2 text-xl text-green-600 mb-8">
          {words.map((word, index) => (
            <span
              key={index}
              className={`font-semibold ${index < wordIndex ? "animate-scale-in opacity-100" : "opacity-0"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </>
  )

  const ProgressBar = (
    showText && (
      <div className="w-64 h-1 bg-green-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 rounded-full animate-pulse"
          style={{ width: "100%", animation: "progress 4s ease-out forwards" }}
        ></div>
      </div>
    )
  )

  const Content = (
    <>
      <div className="mb-8">{LogoImage}</div>
      <h1 className="text-5xl font-bold text-green-800 animate-fade-in mb-4">Plant MD</h1>
      {AnimatedText}
      {ProgressBar}
    </>
  )

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-green-50 to-green-100 z-50 flex flex-col items-center justify-center ${!isVisible ? "animate-fade-out" : ""}`}>
      <div className="text-center">{showText && Content}</div>
    </div>
  )
}
