"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { getFavorites } from "@/lib/favorites"

interface FavoritesDropdownProps {
  onSelectCity: (city: string) => void
}

export function FavoritesDropdown({ onSelectCity }: FavoritesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const favorites = getFavorites()

  if (favorites.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 rounded-lg transition-colors text-sm font-medium outline-2 outline-offset-2 outline-primary"
      >
        <span>⭐ Favorites ({favorites.length})</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white/95 border border-white/30 rounded-lg shadow-lg z-50 min-w-48 backdrop-blur-sm">
          {favorites.map((fav) => (
            <button
              key={fav.name}
              onClick={() => {
                onSelectCity(fav.name)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors text-sm border-b border-white/10 last:border-b-0"
            >
              {fav.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
