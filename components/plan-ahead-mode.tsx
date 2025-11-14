"use client"

import { useState, useEffect } from "react"
import { Calendar, Star, ArrowLeft } from 'lucide-react'
import { fetchForecastByCity, type ForecastData } from "@/lib/fetchWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import { ForecastCard } from "./forecast-card"
import { ActivityCard } from "./activity-card"
import { OutfitCard } from "./outfit-card"
import { EventAdviceCard } from "./event-advice-card"
import { FavoritesDropdown } from "./favorites-dropdown"
import { WeatherCardSkeleton } from "./skeleton-loader"

interface PlanAheadModeProps {
  onResultsReady: (mood: ReturnType<typeof useWeatherMood>) => void
  onBack?: () => void
}

export function PlanAheadMode({ onResultsReady, onBack }: PlanAheadModeProps) {
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isFav, setIsFav] = useState(false)
  const mood = useWeatherMood("")

  useEffect(() => {
    setIsFav(city ? isFavorite(city) : false)
  }, [city])

  const handleCheck = async () => {
    if (!city.trim() || !date) return

    setLoading(true)
    setError("")

    try {
      const data = await fetchForecastByCity(city)
      setForecast(data)

      const description = data[0] ? data[0].description : ""
      const realMood = useWeatherMood(description)
      onResultsReady(realMood)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch forecast. Please try again."
      setError(errorMsg)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = () => {
    if (!city) return
    if (isFav) {
      removeFavorite(city)
      setIsFav(false)
    } else {
      addFavorite(city)
      setIsFav(true)
    }
  }

  const handleSelectFavorite = (favCity: string) => {
    setCity(favCity)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="city-input" className="block text-sm font-medium">
              Enter a city
            </label>
            <FavoritesDropdown onSelectCity={handleSelectFavorite} />
          </div>
          <div className="flex gap-2">
            <input
              id="city-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Type your city..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/50 border border-white/30 outline-2 outline-offset-2 outline-primary transition-all hover:bg-white/60"
              disabled={loading}
            />
            <button
              onClick={handleToggleFavorite}
              disabled={!city}
              className="flex-shrink-0 p-3 glass rounded-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed outline-2 outline-offset-2 outline-primary"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Star
                size={20}
                className={isFav ? "fill-accent text-accent" : "text-muted-foreground"}
              />
            </button>
          </div>

          <div>
            <label htmlFor="date-input" className="block text-sm font-medium mb-2">
              Select a date
            </label>
            <input
              id="date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 outline-2 outline-offset-2 outline-primary transition-all hover:bg-white/60"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={!city || !date || loading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 outline-2 outline-offset-2 outline-primary hover:scale-105 active:scale-95"
          >
            <Calendar size={20} />
            {loading ? "Loading..." : "Check Forecast"}
          </button>

          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Back to Mode Button */}
      {forecast.length > 0 && !loading && onBack && (
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Mode
          </button>
        </div>
      )}

      {/* Results Section */}
      {loading && (
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <WeatherCardSkeleton />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <WeatherCardSkeleton />
              <WeatherCardSkeleton />
            </div>
            <WeatherCardSkeleton />
          </div>
        </div>
      )}

      {forecast.length > 0 && !loading && (
        <div className="max-w-6xl mx-auto px-4 space-y-6 animate-slide-up">
          <ForecastCard forecast={forecast} city={city} date={date} />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ActivityCard
                weather={
                  {
                    weather: [{ main: forecast[0].weather, description: forecast[0].description }],
                    main: { temp: forecast[0].temp, humidity: forecast[0].humidity, feels_like: forecast[0].feels_like },
                    wind: { speed: forecast[0].wind },
                    uv: forecast[0].uv,
                  } as any
                }
              />
              <OutfitCard
                weather={
                  {
                    weather: [{ main: forecast[0].weather, description: forecast[0].description }],
                    main: { temp: forecast[0].temp, humidity: forecast[0].humidity, feels_like: forecast[0].feels_like },
                    wind: { speed: forecast[0].wind },
                    uv: forecast[0].uv,
                  } as any
                }
              />
            </div>
            <EventAdviceCard forecast={forecast} />
          </div>
        </div>
      )}
    </div>
  )
}
