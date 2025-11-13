"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Linkedin, Globe, Target, Rocket, Eye } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    },
    {
      icon: Rocket,
      title: "Mission",
      description:
        "Provide real-time, actionable weather advice with outfit and activity suggestions, all delivered with a friendly AI voice.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "Make planning your day seamless and enjoyable — wherever you are in the world.",
    },
  ]

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

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - App Info Cards */}
          <div className="space-y-6">
            {infoCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  className={`glass rounded-xl p-6 transition-all duration-700 transform hover:translate-y-[-8px] hover:shadow-lg cursor-default ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                  aria-label={`${card.title} card`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Developer Card */}
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
          >
            <div className="w-full max-w-xs">
              {/* Circular Photo Frame */}
              <div className="relative mb-8 mx-auto" aria-label="Developer Photo">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white/30 transition-transform duration-300 hover:scale-105">
                  <img src="/placeholder-user.jpg" alt="Sliverboy / PrismX_Y4" className="w-full h-full object-cover" />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                </div>
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110 -z-10" />
              </div>

              {/* Developer Info Card */}
              <div className="glass rounded-xl p-8 text-center" aria-label="Developer Information">
                <h3 className="text-2xl font-bold text-foreground mb-1">Sliverboy / PrismX_Y4</h3>
                <p className="text-sm font-medium text-primary mb-4">Full-stack Developer, Founder of SliverVerse</p>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Building innovative apps that combine design, AI, and fun — one project at a time.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Portfolio website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Email contact"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
