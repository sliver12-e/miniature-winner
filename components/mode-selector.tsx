"use client"

import { Cloud, Calendar } from "lucide-react"

interface ModeSelectorProps {
  activeMode: "today" | "ahead"
  onModeChange: (mode: "today" | "ahead") => void
}

export function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Choose Your Mode</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today Mode */}
        <button
          onClick={() => onModeChange("today")}
          className={`glass p-8 rounded-2xl text-left transition-all duration-300 group outline-2 outline-offset-2 outline-primary ${
            activeMode === "today"
              ? "ring-2 ring-primary shadow-lg scale-105"
              : "hover:shadow-lg hover:scale-102 opacity-70"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Check Current Weather</h3>
              <p className="text-muted-foreground">Get weather for today in any city</p>
            </div>
            <Cloud size={48} className="text-accent group-hover:animate-bounce transition-transform" />
          </div>
        </button>

        {/* Plan Ahead Mode */}
        <button
          onClick={() => onModeChange("ahead")}
          className={`glass p-8 rounded-2xl text-left transition-all duration-300 group outline-2 outline-offset-2 outline-primary ${
            activeMode === "ahead"
              ? "ring-2 ring-primary shadow-lg scale-105"
              : "hover:shadow-lg hover:scale-102 opacity-70"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Plan an Event</h3>
              <p className="text-muted-foreground">Forecast for a future date</p>
            </div>
            <Calendar size={48} className="text-accent group-hover:animate-bounce transition-transform" />
          </div>
        </button>
      </div>
    </div>
  )
}
