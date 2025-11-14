"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Rocket, Eye } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const infoCards = [
    {
      icon: Target,
      title: "Goal",
      description: "Empower users to make weather-smart decisions effortlessly.",
      moreInfo:
        "Our goal is to make weather data actionable for daily planning. Users can get outfit suggestions, activity recommendations, and smart alerts based on the AI-powered forecast.",
    },
    {
      icon: Rocket,
      title: "Mission",
      description:
        "Provide real-time, actionable weather advice with outfit and activity suggestions, all delivered with a friendly AI voice.",
      moreInfo:
        "We aim to integrate multiple data sources to give accurate, location-specific weather guidance. The AI learns user preferences to make planning effortless.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "Make planning your day seamless and enjoyable — wherever you are in the world.",
      moreInfo:
        "We envision a world where users feel confident in their daily decisions, from travel to dressing, based on smart, AI-assisted weather insights.",
    },
  ]

  const toggleCard = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} aria-label="WeatherWise About Section" className="py-16 px-4 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">About WeatherWise — Skymind Edition</h2>
          <p className="text-lg text-foreground/70">
            Your AI-powered weather companion that helps you plan smarter, dress better, and enjoy every day.
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {infoCards.map((card, index) => {
            const Icon = card.icon
            const isExpanded = expandedCardIndex === index

            return (
              <div
                key={index}
                className={`glass rounded-xl p-6 transition-all duration-700 transform hover:translate-y-[-8px] hover:shadow-lg cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => toggleCard(index)}
                aria-label={`${card.title} card`}
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{card.description}</p>

                    {isExpanded && (
                      <p className="text-foreground/60 mt-2 leading-relaxed">{card.moreInfo}</p>
                    )}

                    <button
                      className="mt-2 text-sm text-primary font-medium underline"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent parent click toggle
                        toggleCard(index)
                      }}
                    >
                      {isExpanded ? "View Less" : "View More"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
