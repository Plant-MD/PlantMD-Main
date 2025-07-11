"use client"

import { useState, useEffect } from "react"
import { Leaf } from "lucide-react"

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
    // Show main text and leaf together after 1.5 seconds
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 1500)

    // Show subtext after 2.5 seconds
    const subtextTimer = setTimeout(() => {
      setShowSubtext(true)
    }, 2500)

    // Animate words one by one
    const wordTimers = words.map((_, index) =>
      setTimeout(
        () => {
          setWordIndex(index + 1)
        },
        3000 + index * 400,
      ),
    )

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500)
    }, 5500) // Extended to 5.5 seconds for better experience

    return () => {
      clearTimeout(timer)
      clearTimeout(textTimer)
      clearTimeout(subtextTimer)
      wordTimers.forEach(clearTimeout)
    }
  }, [onLoadingComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-green-100 z-50 flex flex-col items-center justify-center animate-fade-out">
        <div className="text-center">
          {/* Main text and rotating leaf appear together */}
          {showText && (
            <>
              {/* Rotating leaf that fades in with text */}
              <div className="mb-8">
                <Leaf className="w-16 h-16 text-green-600 mx-auto animate-spin animate-fade-in" />
              </div>
              <h1 className="text-5xl font-bold text-green-800 animate-fade-in mb-4">Plant MD</h1>
            </>
          )}

          {/* Subtext with popping words */}
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

          {/* Progress bar */}
          {showText && (
            <div className="w-64 h-1 bg-green-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full animate-pulse"
                style={{
                  width: "100%",
                  animation: "progress 4s ease-out forwards",
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-green-100 z-50 flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Main text and rotating leaf appear together */}
        {showText && (
          <>
            {/* Rotating leaf that fades in with text */}
            <div className="mb-8">
              <Leaf className="w-16 h-16 text-green-600 mx-auto animate-spin animate-fade-in" />
            </div>
            <h1 className="text-5xl font-bold text-green-800 animate-fade-in mb-4">Plant MD</h1>
          </>
        )}

        {/* Subtext with popping words */}
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

        {/* Progress bar */}
        {showText && (
          <div className="w-64 h-1 bg-green-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full animate-pulse"
              style={{
                width: "100%",
                animation: "progress 4s ease-out forwards",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}
