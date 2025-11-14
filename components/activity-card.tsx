"use client"

import { Activity } from "lucide-react"
import type { WeatherData } from "@/lib/mockWeather"
import { useWeatherMood } from "@/lib/weatherMood"
import { activityMessages } from "@/lib/messages"

interface ActivityCardProps {
  weather: WeatherData
}

export function ActivityCard({ weather }: ActivityCardProps) {
  const mood = useWeatherMood(weather.weather[0].description)
  const activities = activityMessages[mood.dominantConditions[0] || "clouds"] || activityMessages.clouds
<<<<<<< HEAD
  const activity = activities[Math.floor(Math.random() * activities.length)]
=======

  // Pick 3 unique random activities
  const shuffled = [...activities].sort(() => 0.5 - Math.random())
  const selectedActivities = shuffled.slice(0, 3)
>>>>>>> 7b9415a (clean update)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity size={24} className="text-accent" />
<<<<<<< HEAD
        <h3 className="text-lg font-semibold">Activity Suggestion</h3>
      </div>
      <p className="text-foreground/90 leading-relaxed">{activity}</p>
=======
        <h3 className="text-lg font-semibold">Activity Suggestions</h3>
      </div>
      <ul className="text-foreground/90 leading-relaxed list-disc list-inside space-y-1">
        {selectedActivities.map((activity, idx) => (
          <li key={idx}>{activity}</li>
        ))}
      </ul>
>>>>>>> 7b9415a (clean update)
    </div>
  )
}
