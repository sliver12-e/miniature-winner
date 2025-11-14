// Skeleton loading components
export function WeatherCardSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl space-y-4 animate-pulse">
      <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
      <div className="h-4 bg-white/10 rounded-lg w-full"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-white/10 rounded-lg"></div>
        <div className="h-12 bg-white/10 rounded-lg"></div>
      </div>
    </div>
  )
}

export function ActivityCardSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl space-y-3 animate-pulse">
      <div className="h-6 bg-white/10 rounded-lg w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded-lg"></div>
        <div className="h-4 bg-white/10 rounded-lg w-5/6"></div>
      </div>
    </div>
  )
}

export function ThreeCardSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
    </div>
  )
}
