"use client"

import { AlertCircle, TrendingUp } from "lucide-react"
import type { ForecastData } from "@/lib/mockWeather"

interface EventAdviceCardProps {
  forecast: ForecastData[]
}

export function EventAdviceCard({ forecast }: EventAdviceCardProps) {
  const bestTime = forecast.reduce((best, current) => (current.prob_precip < best.prob_precip ? current : best))

  const avgTemp = Math.round(forecast.reduce((sum, f) => sum + f.temp, 0) / forecast.length)
  const maxPrecip = Math.max(...forecast.map((f) => f.prob_precip))

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <TrendingUp size={20} className="text-accent" />
        Event Advice
      </h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Best Time</p>
          <p className="font-semibold text-foreground">
            {new Date(bestTime.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p className="text-xs text-muted-foreground">{bestTime.prob_precip}% rain chance</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Average Temperature</p>
          <p className="font-semibold text-foreground">{avgTemp}°C</p>
        </div>

        <div className="bg-accent/10 rounded-lg p-3 flex gap-2">
          <AlertCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">
            {maxPrecip > 60
              ? "High chance of rain—plan indoor backup activities."
              : maxPrecip > 30
                ? "Moderate rain risk—have an umbrella ready."
                : "Great conditions for outdoor events!"}
          </p>
        </div>
      </div>
    </div>
  )
}
