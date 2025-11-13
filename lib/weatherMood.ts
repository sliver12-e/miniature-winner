export interface MoodProfile {
  mood: string
  intensity: number
  colors: { start: string; end: string }
  dominantConditions: string[]
  tone: "calm" | "energetic"
}

const CONDITION_TOKENS: Record<string, number> = {
  clear: 0.8,
  sunny: 0.9,
  clouds: 0.3,
  cloudy: 0.2,
  rain: -0.5,
  rainy: -0.6,
  light: -0.3,
  heavy: -0.7,
  storm: -0.9,
  thunderstorm: -0.95,
  snow: 0.2,
  snowy: 0.1,
  mist: 0.1,
  fog: 0.05,
  overcast: 0.1,
  scattered: 0.2,
  partly: 0.3,
}

const COLOR_MAPPING: Record<string, { start: string; end: string }> = {
  clear: {
    start: "rgb(0, 120, 255)",
    end: "rgb(143, 211, 255)",
  },
  clouds: {
    start: "rgb(143, 164, 176)",
    end: "rgb(220, 229, 234)",
  },
  rain: {
    start: "rgb(58, 107, 123)",
    end: "rgb(110, 143, 160)",
  },
  storm: {
    start: "rgb(43, 33, 58)",
    end: "rgb(73, 58, 86)",
  },
  snow: {
    start: "rgb(230, 241, 255)",
    end: "rgb(248, 251, 255)",
  },
  mist: {
    start: "rgb(197, 205, 211)",
    end: "rgb(231, 236, 239)",
  },
}

function parseRGB(rgb: string): [number, number, number] {
  const match = rgb.match(/\d+/g)
  return [Number.parseInt(match?.[0] || "0"), Number.parseInt(match?.[1] || "0"), Number.parseInt(match?.[2] || "0")]
}

function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

export function useWeatherMood(description: string): MoodProfile {
  const tokens = description
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((t) => t.length > 0)

  // Determine dominant condition
  let dominantCondition = "clouds"
  const scores: Record<string, number> = {
    clear: 0,
    clouds: 0,
    rain: 0,
    storm: 0,
    snow: 0,
    mist: 0,
  }

  tokens.forEach((token) => {
    Object.entries(CONDITION_TOKENS).forEach(([key, weight]) => {
      if (token.includes(key) || key.includes(token)) {
        if (["clear", "sunny"].includes(key) || token.includes("clear") || token.includes("sunny")) {
          scores.clear += weight
        } else if (["clouds", "cloudy", "overcast", "scattered", "partly"].includes(key)) {
          scores.clouds += weight
        } else if (["rain", "rainy", "light"].includes(key)) {
          scores.rain += weight
        } else if (["storm", "thunderstorm", "heavy"].includes(key)) {
          scores.storm += weight
        } else if (["snow", "snowy"].includes(key)) {
          scores.snow += weight
        } else if (["mist", "fog"].includes(key)) {
          scores.mist += weight
        }
      }
    })
  })

  // Find dominant
  dominantCondition = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0]

  const dominantConditions = Object.entries(scores)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([k]) => k)

  // Compute intensity
  const weightSum = Object.values(scores).reduce((a, b) => a + b, 0)
  const intensity = Math.max(-1, Math.min(1, weightSum / Math.max(1, tokens.length)))

  // Blend colors
  const startRgbs: [number, number, number][] = []
  const endRgbs: [number, number, number][] = []
  const weights: number[] = []

  dominantConditions.forEach((cond) => {
    const weight = scores[cond]
    if (weight !== 0) {
      weights.push(Math.abs(weight))
      startRgbs.push(parseRGB(COLOR_MAPPING[cond]?.start || "rgb(255, 255, 255)"))
      endRgbs.push(parseRGB(COLOR_MAPPING[cond]?.end || "rgb(255, 255, 255)"))
    }
  })

  const totalWeight = weights.reduce((a, b) => a + b, 1)
  const blendStart = [0, 1, 2].map((i) =>
    weights.reduce((sum, w, idx) => sum + (startRgbs[idx]?.[i] || 0) * (w / totalWeight), 0),
  ) as [number, number, number]

  const blendEnd = [0, 1, 2].map((i) =>
    weights.reduce((sum, w, idx) => sum + (endRgbs[idx]?.[i] || 0) * (w / totalWeight), 0),
  ) as [number, number, number]

  const moodMap: Record<string, string> = {
    clear: "Sunny",
    clouds: "Overcast",
    rain: "Rainy",
    storm: "Stormy",
    snow: "Snowy",
    mist: "Misty",
  }

  return {
    mood: moodMap[dominantCondition] || "Cloudy",
    intensity: Math.abs(intensity),
    colors: {
      start: rgbToString(...blendStart),
      end: rgbToString(...blendEnd),
    },
    dominantConditions,
    tone: intensity > 0.5 ? "energetic" : "calm",
  }
}
