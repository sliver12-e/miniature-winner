"use client"

import { useState } from "react"
import { NavBar } from "@/components/navbar"
import { ModeSelector } from "@/components/mode-selector"
import { TodayMode } from "@/components/today-mode"
import { PlanAheadMode } from "@/components/plan-ahead-mode"
import { SkyMindOrb } from "@/components/skymind-orb"
import { AboutSection } from "@/components/about-section"
import type { useWeatherMood } from "@/lib/weatherMood"

export default function Home() {
  const [mode, setMode] = useState<"today" | "ahead" | null>(null)
  const [mood, setMood] = useState<ReturnType<typeof useWeatherMood> | null>(null)
  const [bgGradient, setBgGradient] = useState("from-background to-background")
  const [summary, setSummary] = useState("")

  const handleModeChange = (newMode: "today" | "ahead") => {
    setMode(newMode)
    setMood(null)
  }

  const handleResultsReady = (newMood: ReturnType<typeof useWeatherMood>) => {
    setMood(newMood)
    // Create gradient CSS
    setBgGradient(`from-[${newMood.colors.start}] via-[${newMood.colors.start}] to-[${newMood.colors.end}]`)

    // Create summary for TTS
    const tts = `Hey! It's ${newMood.mood.toLowerCase()} out there. ${
      newMood.tone === "energetic" ? "Get ready for an awesome day!" : "Perfect for a relaxing day."
    } Don't forget to check the outfit and activity suggestions!`
    setSummary(tts)
  }

  return (
    <main
      className="min-h-screen transition-all duration-500"
      style={{
        background: mood
          ? `linear-gradient(135deg, ${mood.colors.start} 0%, ${mood.colors.end} 100%)`
          : "linear-gradient(135deg, #F5F8FB 0%, #DCE5EA 100%)",
      }}
    >
      <NavBar />

      <div className="pt-24 pb-12">
        {!mode ? (
          <ModeSelector activeMode="today" onModeChange={handleModeChange} />
        ) : (
          <div>
            <div className="max-w-6xl mx-auto px-4 mb-8">
              <button
                onClick={() => handleModeChange("today")}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-1 px-3 rounded hover:bg-white/10"
              >
                ← Back to Mode Selection
              </button>
            </div>

            {mode === "today" && <TodayMode onResultsReady={handleResultsReady} />}
            {mode === "ahead" && <PlanAheadMode onResultsReady={handleResultsReady} />}
          </div>
        )}
      </div>

      <SkyMindOrb isActive={!!mood} summary={summary} tone={mood?.tone || "calm"} />

      <AboutSection />

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-sm text-foreground/50">
        <p>© 2025 WeatherWise | Designed by SliverVerse</p>
      </footer>
    </main>
  )
}
