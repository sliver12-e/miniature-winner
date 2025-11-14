"use client"

import { useState } from "react"
import { Calendar } from 'lucide-react'
import { fetchForecastByCity, type ForecastData } from "@/lib/fetchWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { ForecastCard } from "./forecast-card"
import { ActivityCard } from "./activity-card"
import { OutfitCard } from "./outfit-card"
import { EventAdviceCard } from "./event-advice-card"

interface PlanAheadModeProps {
  onResultsReady: (mood: ReturnType<typeof useWeatherMood>) => void
}

const CITIES = ["Lagos", "Tokyo", "New York", "London", "Paris", "Sydney", "Dubai", "Singapore"]

export function PlanAheadMode({ onResultsReady }: PlanAheadModeProps) {
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const mood = useWeatherMood("")

  const handleCheck = async () => {
    if (!city.trim() || !date) return

    setLoading(true)
    setError("")

    try {
      const data = await fetchForecastByCity(city)
      setForecast(data)

      // Generate mood from first forecast entry
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

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass p-6 rounded-2xl space-y-4">
          <div>
            <label htmlFor="city-select" className="block text-sm font-medium mb-2">
              Select a city
            </label>
            <select
              id="city-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 outline-2 outline-offset-2 outline-primary transition-all"
              aria-label="City selection"
              disabled={loading}
            >
              <option value="">Choose a city...</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 outline-2 outline-offset-2 outline-primary transition-all"
              aria-label="Event date selection"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={!city || !date || loading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 outline-2 outline-offset-2 outline-primary"
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

      {/* Results Section */}
      {forecast.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 space-y-6 animate-slide-up">
          <ForecastCard forecast={forecast} city={city} date={date} />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ActivityCard
                weather={
                  {
                    weather: [{ main: forecast[0].weather, description: forecast[0].description }],
                    main: {
                      temp: forecast[0].temp,
                      humidity: forecast[0].humidity,
                      feels_like: forecast[0].feels_like,
                    },
                    wind: { speed: forecast[0].wind },
                    uv: forecast[0].uv,
                  } as any
                }
              />
              <OutfitCard
                weather={
                  {
                    weather: [{ main: forecast[0].weather, description: forecast[0].description }],
                    main: {
                      temp: forecast[0].temp,
                      humidity: forecast[0].humidity,
                      feels_like: forecast[0].feels_like,
                    },
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
