"use client"

import { Shirt } from "lucide-react"
import type { WeatherData } from "@/lib/mockWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { outfitMessages } from "@/lib/messages"

interface OutfitCardProps {
  weather: WeatherData
}

export function OutfitCard({ weather }: OutfitCardProps) {
  const mood = useWeatherMood(weather.weather[0].description)
  const outfits = outfitMessages[mood.dominantConditions[0] || "clouds"] || outfitMessages.clouds

  // Pick 3 unique random outfit suggestions
  const shuffled = [...outfits].sort(() => 0.5 - Math.random())
  const selectedOutfits = shuffled.slice(0, 3)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shirt size={24} className="text-accent" />
        <h3 className="text-lg font-semibold">Outfit Suggestions</h3>
      </div>
      <ul className="text-foreground/90 leading-relaxed list-disc list-inside space-y-1">
        {selectedOutfits.map((outfit, idx) => (
          <li key={idx}>{outfit}</li>
        ))}
      </ul>
    </div>
  )
}
