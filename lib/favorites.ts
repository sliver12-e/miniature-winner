// Favorites management utility using localStorage
export interface FavoriteCity {
  name: string
  addedAt: number
}

const FAVORITES_KEY = "weatherwise_favorites"

export function getFavorites(): FavoriteCity[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function addFavorite(cityName: string): boolean {
  if (typeof window === "undefined") return false
  const favorites = getFavorites()
  if (favorites.some((f) => f.name.toLowerCase() === cityName.toLowerCase())) {
    return false
  }
  favorites.push({ name: cityName, addedAt: Date.now() })
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  return true
}

export function removeFavorite(cityName: string): boolean {
  if (typeof window === "undefined") return false
  const favorites = getFavorites()
  const filtered = favorites.filter((f) => f.name.toLowerCase() !== cityName.toLowerCase())
  if (filtered.length === favorites.length) return false
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  return true
}

export function isFavorite(cityName: string): boolean {
  const favorites = getFavorites()
  return favorites.some((f) => f.name.toLowerCase() === cityName.toLowerCase())
}
