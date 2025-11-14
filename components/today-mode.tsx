"use client"

import { useState, useEffect } from "react"
import { Search, Star } from 'lucide-react'
import { fetchWeatherByCity, type WeatherData } from "@/lib/fetchWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import { WeatherCard } from "./weather-card"
import { ActivityCard } from "./activity-card"
import { OutfitCard } from "./outfit-card"
import { TipCard } from "./tip-card"
import { FavoritesDropdown } from "./favorites-dropdown"
import { WeatherCardSkeleton, ThreeCardSkeleton } from "./skeleton-loader"

interface TodayModeProps {
  onResultsReady: (mood: ReturnType<typeof useWeatherMood>) => void
}

export function TodayMode({ onResultsReady }: TodayModeProps) {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isFav, setIsFav] = useState(false)
  const mood = useWeatherMood("")

  useEffect(() => {
    if (weather) {
      setIsFav(isFavorite(weather.city))
    }
  }, [weather])

  const handleCheck = async () => {
    if (!city.trim()) return

    setLoading(true)
    setError("")

    try {
      const data = await fetchWeatherByCity(city)
      setWeather(data)

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

  const handleToggleFavorite = () => {
    if (!weather) return
    if (isFav) {
      removeFavorite(weather.city)
      setIsFav(false)
    } else {
      addFavorite(weather.city)
      setIsFav(true)
    }
  }

  const handleSelectFavorite = (favCity: string) => {
    setCity(favCity)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="city-input" className="block text-sm font-medium">
              Enter a city name
            </label>
            <FavoritesDropdown onSelectCity={handleSelectFavorite} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                id="city-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g., Lagos, Tokyo, New York..."
                className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 placeholder-muted-foreground/50 outline-2 outline-offset-2 outline-primary transition-all hover:bg-white/60"
                aria-label="City name input"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={!city.trim() || loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 outline-2 outline-offset-2 outline-primary hover:scale-105 active:scale-95"
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
      {loading && (
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <WeatherCardSkeleton />
          <ThreeCardSkeleton />
        </div>
      )}

      {weather && !loading && (
        <div className="max-w-6xl mx-auto px-4 space-y-6 animate-slide-up">
          <div className="flex items-center gap-2">
            <WeatherCard weather={weather} />
            <button
              onClick={handleToggleFavorite}
              className="flex-shrink-0 p-3 glass rounded-lg hover:scale-110 transition-transform outline-2 outline-offset-2 outline-primary"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                size={24}
                className={isFav ? "fill-accent text-accent" : "text-muted-foreground"}
              />
            </button>
          </div>

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
