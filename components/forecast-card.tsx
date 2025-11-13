"use client"

import type React from "react"

import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react"
import type { ForecastData } from "@/lib/mockWeather"

interface ForecastCardProps {
  forecast: ForecastData[]
  city: string
  date: string
}

const iconMap: Record<string, React.ReactNode> = {
  Clear: <Sun className="w-8 h-8 text-accent" />,
  Clouds: <Cloud className="w-8 h-8 text-muted" />,
  Rain: <CloudRain className="w-8 h-8 text-blue-500" />,
  Snow: <CloudSnow className="w-8 h-8 text-blue-100" />,
}

export function ForecastCard({ forecast, city, date }: ForecastCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-2">Forecast for {city}</h2>
      <p className="text-muted-foreground mb-6">{formattedDate}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {forecast.map((f, idx) => {
          const time = new Date(f.date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          return (
            <div key={idx} className="bg-white/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">{time}</p>
              <div className="flex justify-center mb-2">{iconMap[f.weather] || iconMap.Clouds}</div>
              <p className="font-semibold text-lg mb-1">{Math.round(f.temp)}°</p>
              <p className="text-xs text-muted-foreground">{f.weather}</p>
              <div className="mt-3 text-xs space-y-1">
                <p>💧 {f.humidity}%</p>
                <p>🎯 {f.prob_precip}%</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
