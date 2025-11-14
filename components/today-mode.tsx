"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { fetchWeatherByCity, type WeatherData } from "@/lib/fetchWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { WeatherCard } from "./weather-card"
import { ActivityCard } from "./activity-card"
import { OutfitCard } from "./outfit-card"
import { TipCard } from "./tip-card"

interface TodayModeProps {
  onResultsReady: (mood: ReturnType<typeof useWeatherMood>) => void
}

export function TodayMode({ onResultsReady }: TodayModeProps) {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const mood = useWeatherMood("")

  const handleCheck = async () => {
    if (!city.trim()) return

    setLoading(true)
    setError("")

    try {
      const data = await fetchWeatherByCity(city)
      setWeather(data)

      // Generate mood from real weather description
      const description = data.weather.map((w) => w.description).join(", ")
      const realMood = useWeatherMood(description)
      onResultsReady(realMood)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch weather. Please try again."
      setError(errorMsg)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass p-6 rounded-2xl">
          <label htmlFor="city-input" className="block text-sm font-medium mb-3">
            Enter a city name
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                id="city-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g., Lagos, Tokyo, New York..."
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 placeholder-muted-foreground/50 outline-2 outline-offset-2 outline-primary transition-all"
                aria-label="City name input"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={!city.trim() || loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 outline-2 outline-offset-2 outline-primary"
              aria-label="Check current weather for city"
            >
              <Search size={20} />
              <span className="hidden sm:inline">{loading ? "Loading..." : "Show Weather"}</span>
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {weather && (
        <div className="max-w-6xl mx-auto px-4 space-y-6 animate-slide-up">
          <WeatherCard weather={weather} />

          <div className="grid md:grid-cols-3 gap-6">
            <ActivityCard weather={weather} />
            <OutfitCard weather={weather} />
            <TipCard weather={weather} />
          </div>
        </div>
      )}
    </div>
  )
}
