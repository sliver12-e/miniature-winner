"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { mockCities, generateWeatherForCity, type WeatherData } from "@/lib/mockWeather"
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
  const [suggestions, setSuggestions] = useState<string[]>([])
  const mood = useWeatherMood("") // Initialize mood at the top level

  const handleCheck = async () => {
    if (!city.trim()) return

    setLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const data = generateWeatherForCity(city)
    setWeather(data)

    onResultsReady(mood) // Use the mood from the top level

    // Filter matching cities for suggestions
    setSuggestions(
      mockCities.filter((c) => c.toLowerCase().includes(city.toLowerCase()) && c.toLowerCase() !== city.toLowerCase()),
    )

    setLoading(false)
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
            <div className="flex-1 relative">
              <input
                id="city-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g., Lagos, Tokyo, New York..."
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 placeholder-muted-foreground/50 outline-2 outline-offset-2 outline-primary transition-all"
                aria-label="City name input"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-border z-10">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setCity(s)}
                      className="w-full text-left px-4 py-2 hover:bg-background/50 first:rounded-t-lg last:rounded-b-lg text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleCheck}
              disabled={!city.trim() || loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 outline-2 outline-offset-2 outline-primary"
              aria-label="Check current weather for city"
            >
              <Search size={20} />
              <span className="hidden sm:inline">Show Weather</span>
            </button>
          </div>
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
