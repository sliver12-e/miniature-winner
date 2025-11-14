// Weather-based animations component
import { useEffect, useState } from "react"

interface WeatherAnimationsProps {
  weatherType: string
}

export function WeatherAnimations({ weatherType }: WeatherAnimationsProps) {
  const [animationType, setAnimationType] = useState("")

  useEffect(() => {
    const type = weatherType.toLowerCase()
    if (type.includes("cloud")) {
      setAnimationType("clouds")
    } else if (type.includes("rain")) {
      setAnimationType("rain")
    } else if (type.includes("clear") || type.includes("sunny")) {
      setAnimationType("sun")
    }
  }, [weatherType])

  if (animationType === "clouds") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-16 bg-white/10 rounded-full blur-2xl animate-drift"></div>
        <div className="absolute top-40 right-20 w-40 h-20 bg-white/10 rounded-full blur-2xl animate-drift" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-18 bg-white/10 rounded-full blur-2xl animate-drift" style={{ animationDelay: "4s" }}></div>
      </div>
    )
  }

  if (animationType === "rain") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-white/30 animate-rainfall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
    )
  }

  if (animationType === "sun") {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-yellow-300/20 blur-3xl animate-shimmer"></div>
        <div className="absolute top-20 right-20 w-20 h-20 rounded-full border-4 border-yellow-400/30 animate-sun-rotate"></div>
      </div>
    )
  }

  return null
}
