"use client"

import { AlertCircle } from "lucide-react"
import type { WeatherData } from "@/lib/mockWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { adviceMessages } from "@/lib/messages"

interface TipCardProps {
  weather: WeatherData
}

export function TipCard({ weather }: TipCardProps) {
  const mood = useWeatherMood(weather.weather[0].description)
  const tips = adviceMessages[mood.dominantConditions[0] || "clouds"] || adviceMessages.clouds
  const tip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <div className="glass rounded-2xl p-6 bg-accent/5 border-l-4 border-accent">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold mb-1">Quick Tip</h3>
          <p className="text-foreground/90 text-sm">{tip}</p>
        </div>
      </div>
    </div>
  )
}
