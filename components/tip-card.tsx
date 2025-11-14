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
<<<<<<< HEAD
  const tip = tips[Math.floor(Math.random() * tips.length)]
=======

  // Pick 3 unique random tips
  const shuffled = [...tips].sort(() => 0.5 - Math.random())
  const selectedTips = shuffled.slice(0, 3)
>>>>>>> 7b9415a (clean update)

  return (
    <div className="glass rounded-2xl p-6 bg-accent/5 border-l-4 border-accent">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
        <div>
<<<<<<< HEAD
          <h3 className="text-lg font-semibold mb-1">Quick Tip</h3>
          <p className="text-foreground/90 text-sm">{tip}</p>
=======
          <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
          <ul className="text-foreground/90 text-sm list-disc list-inside space-y-1">
            {selectedTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
>>>>>>> 7b9415a (clean update)
        </div>
      </div>
    </div>
  )
}
