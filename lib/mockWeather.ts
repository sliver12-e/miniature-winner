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

export const mockCurrent: WeatherData = {
  city: "Lagos",
  dt: 1700000000,
  weather: [{ main: "Light Rain", description: "light rain, scattered clouds" }],
  main: { temp: 28, feels_like: 30, humidity: 78 },
  wind: { speed: 4.2 },
  uv: 7,
}

export const mockCities = ["Lagos", "Tokyo", "New York", "London", "Paris", "Sydney", "Dubai", "Singapore"]

export const mockForecast: ForecastData[] = [
  {
    date: "2025-11-20T12:00:00Z",
    weather: "Clear",
    description: "clear sky",
    temp: 31,
    feels_like: 32,
    humidity: 65,
    wind: 3.5,
    uv: 9,
    prob_precip: 0,
  },
  {
    date: "2025-11-20T15:00:00Z",
    weather: "Clouds",
    description: "scattered clouds",
    temp: 28,
    feels_like: 29,
    humidity: 72,
    wind: 4.1,
    uv: 6,
    prob_precip: 10,
  },
  {
    date: "2025-11-20T18:00:00Z",
    weather: "Rain",
    description: "light rain",
    temp: 26,
    feels_like: 27,
    humidity: 85,
    wind: 5.2,
    uv: 3,
    prob_precip: 60,
  },
  {
    date: "2025-11-21T06:00:00Z",
    weather: "Mist",
    description: "mist",
    temp: 22,
    feels_like: 21,
    humidity: 88,
    wind: 2.1,
    uv: 1,
    prob_precip: 30,
  },
]

export function generateWeatherForCity(city: string): WeatherData {
  const conditions = [
    { main: "Clear", description: "clear sky" },
    { main: "Clouds", description: "scattered clouds, partly cloudy" },
    { main: "Rain", description: "light rain, overcast" },
    { main: "Storm", description: "thunderstorm, heavy rain" },
    { main: "Snow", description: "light snow" },
    { main: "Mist", description: "mist, fog" },
  ]

  const condition = conditions[Math.floor(Math.random() * conditions.length)]
  const temp = Math.floor(Math.random() * 30) + 10

  return {
    city,
    dt: Date.now() / 1000,
    weather: [condition],
    main: {
      temp,
      feels_like: temp + Math.random() * 3 - 1.5,
      humidity: Math.floor(Math.random() * 50) + 40,
    },
    wind: { speed: Math.random() * 10 + 1 },
    uv: Math.floor(Math.random() * 11),
  }
}

export function generateForecastForDate(date: string): ForecastData[] {
  const baseConditions = [
    { weather: "Clear", description: "clear sky", tempOffset: 0 },
    { weather: "Clouds", description: "scattered clouds", tempOffset: -2 },
    { weather: "Rain", description: "light rain", tempOffset: -4 },
    { weather: "Storm", description: "thunderstorm", tempOffset: -6 },
  ]

  return Array.from({ length: 4 }, (_, i) => {
    const condition = baseConditions[Math.floor(Math.random() * baseConditions.length)]
    const baseTemp = 26 + condition.tempOffset
    return {
      date: new Date(new Date(date).getTime() + i * 3 * 60 * 60 * 1000).toISOString(),
      weather: condition.weather,
      description: condition.description,
      temp: baseTemp + (i % 2 === 0 ? 2 : -1),
      feels_like: baseTemp + (i % 2 === 0 ? 1 : -2),
      humidity: Math.floor(Math.random() * 40) + 50,
      wind: Math.random() * 8 + 2,
      uv: Math.max(0, 8 - i * 2),
      prob_precip: condition.weather === "Rain" ? 70 : condition.weather === "Storm" ? 90 : 20,
    }
  })
}
