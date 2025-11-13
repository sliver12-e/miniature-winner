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
  const outfit = outfits[Math.floor(Math.random() * outfits.length)]

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shirt size={24} className="text-accent" />
        <h3 className="text-lg font-semibold">Outfit Suggestion</h3>
      </div>
      <p className="text-foreground/90 leading-relaxed">{outfit}</p>
    </div>
  )
}
