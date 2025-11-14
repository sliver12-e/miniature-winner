export interface WeatherData {
  city: string
  dt: number
  weather: Array<{ main: string; description: string }>
  main: { temp: number; feels_like: number; humidity: number }
  wind: { speed: number }
  uv: number
}

export interface ForecastData {
  date: string
  weather: string
  description: string
  temp: number
  feels_like: number
  humidity: number
  wind: number
  uv: number
  prob_precip: number
}

const API_KEY = "8a6b39ac48083b9dc055856c0629e747"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeatherByCity(location: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`,
      { cache: "no-store" }
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${location}" not found. Please check the spelling and try again.`)
      }
      throw new Error("Failed to fetch weather data. Please try again.")
    }

    const data = await response.json()

    return {
      city: data.name,
      dt: data.dt,
      weather: data.weather.map((w: any) => ({
        main: w.main,
        description: w.description,
      })),
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      },
      wind: {
        speed: data.wind.speed,
      },
      uv: 0, // OpenWeather free tier doesn't provide UV index in this endpoint
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred while fetching weather data.")
  }
}

export async function fetchForecastByCity(location: string): Promise<ForecastData[]> {
  try {
    // First get coordinates for the city
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`,
      { cache: "no-store" }
    )

    if (!geoResponse.ok) {
      throw new Error(`City "${location}" not found.`)
    }

    const geoData = await geoResponse.json()
    if (geoData.length === 0) {
      throw new Error(`City "${location}" not found. Please check the spelling and try again.`)
    }

    const { lat, lon } = geoData[0]

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { cache: "no-store" }
    )

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data.")
    }

    const forecastData = await forecastResponse.json()

    // Transform API response to our ForecastData format
    // Take next 4 forecast points (3-hour intervals)
    return forecastData.list.slice(0, 4).map((item: any) => ({
      date: item.dt_txt,
      weather: item.weather[0].main,
      description: item.weather[0].description,
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      wind: item.wind.speed,
      uv: 0, // Free tier limitation
      prob_precip: (item.pop || 0) * 100, // pop is probability of precipitation (0-1)
    }))
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred while fetching forecast data.")
  }
}
