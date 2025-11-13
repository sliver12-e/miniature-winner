"use client"

import { useState, useRef } from "react"
import { Mic, X } from "lucide-react"
import { speak, stopSpeech } from "@/lib/tts"

interface SkyMindOrbProps {
  isActive: boolean
  summary: string
  tone: "calm" | "energetic"
}

export function SkyMindOrb({ isActive, summary, tone }: SkyMindOrbProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleSpeak = async () => {
    try {
      if (isSpeaking) {
        stopSpeech()
        setIsSpeaking(false)
      } else {
        setIsSpeaking(true)
        setShowOverlay(true)
        await speak(summary, { tone, pitch: 1, rate: 0.9 })
        setIsSpeaking(false)
        timeoutRef.current = setTimeout(() => setShowOverlay(false), 1000)
      }
    } catch (error) {
      setIsSpeaking(false)
      console.error("TTS Error:", error)
    }
  }

  if (!isActive) return null

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
          <div className="glass-dark px-6 py-4 rounded-full backdrop-blur-xl animate-fade-in">
            <p className="text-sm text-white font-medium">{isSpeaking ? "🎤 Skymind is speaking..." : "✓ Done"}</p>
          </div>
        </div>
      )}

      {/* Orb Button */}
      <button
        onClick={handleSpeak}
        className={`fixed bottom-8 right-8 z-50 rounded-full shadow-2xl transition-all duration-300 outline-2 outline-offset-2 outline-primary ${
          isSpeaking
            ? "w-16 h-16 bg-accent animate-pulse-glow"
            : "w-14 h-14 bg-gradient-to-br from-accent to-accent/80 hover:scale-110 active:scale-95"
        }`}
        aria-label={isSpeaking ? "Stop speaking" : "Let Skymind read the weather"}
        title={isSpeaking ? "Stop speaking" : "Let Skymind read the weather"}
      >
        <div className="flex items-center justify-center w-full h-full">
          {isSpeaking ? (
            <X size={24} className="text-accent-foreground" />
          ) : (
            <Mic size={24} className="text-accent-foreground" />
          )}
        </div>
      </button>
    </>
  )
}
