"use client"

import Link from "next/link"

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-24">
          {/* Centered, Bigger Header */}
          <Link href="/" className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
              WeatherWise
            </div>
            <span className="mt-1 block text-lg sm:text-xl text-muted-foreground">
              Skymind
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
