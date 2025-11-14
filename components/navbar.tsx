"use client"

<<<<<<< HEAD
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = ["Today", "Plan Ahead", "About", "Voice Mode"]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WeatherWise
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Skymind</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors outline-2 outline-offset-2 outline-primary rounded px-2 py-1"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors outline-2 outline-offset-2 outline-primary"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-white/5 rounded transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        )}
=======
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
>>>>>>> 7b9415a (clean update)
      </div>
    </nav>
  )
}
