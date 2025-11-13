"use client"

import type React from "react"

import { Cloud, CloudRain, CloudSnow, Wind, Droplets, Sun } from "lucide-react"
import type { WeatherData } from "@/lib/mockWeather"

interface WeatherCardProps {
  weather: WeatherData
}

const iconMap: Record<string, React.ReactNode> = {
  Clear: <Sun className="w-16 h-16 text-accent" />,
  Clouds: <Cloud className="w-16 h-16 text-muted" />,
  Rain: <CloudRain className="w-16 h-16 text-muted" />,
  Snow: <CloudSnow className="w-16 h-16 text-muted" />,
  Mist: <Cloud className="w-16 h-16 text-muted/50" />,
  Storm: <CloudRain className="w-16 h-16 text-destructive" />,
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const condition = weather.weather[0].main
  const icon = iconMap[condition] || iconMap.Clouds

  return (
    <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-4xl font-bold text-foreground">{weather.city}</h2>
          <p className="text-muted-foreground text-sm">{weather.weather[0].description}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-bold text-primary">{Math.round(weather.main.temp)}°</div>
          <p className="text-sm text-muted-foreground">Feels like {Math.round(weather.main.feels_like)}°</p>
        </div>
      </div>

      <div className="flex justify-center mb-8">{icon}</div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Droplets size={16} className="text-blue-400" />
            <span className="text-sm text-muted-foreground">Humidity</span>
          </div>
          <p className="font-semibold text-foreground">{weather.main.humidity}%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Wind size={16} className="text-blue-400" />
            <span className="text-sm text-muted-foreground">Wind</span>
          </div>
          <p className="font-semibold text-foreground">{weather.wind.speed.toFixed(1)} m/s</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Sun size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">UV Index</span>
          </div>
          <p className="font-semibold text-foreground">{weather.uv}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Tap the microphone icon to let Skymind read this aloud.
      </p>
    </div>
  )
}
