import { Activity, Utensils, Clock, Book, Calendar, Zap, Brain, Music, Heart, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IntegrationCardProps {
  name: string
  description: string
  apps: string[]
  icon: string
  color: string
}

export default function IntegrationCard({ name, description, apps, icon, color }: IntegrationCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "activity":
        return <Activity className="h-6 w-6" />
      case "utensils":
        return <Utensils className="h-6 w-6" />
      case "clock":
        return <Clock className="h-6 w-6" />
      case "book":
        return <Book className="h-6 w-6" />
      case "calendar":
        return <Calendar className="h-6 w-6" />
      case "zap":
        return <Zap className="h-6 w-6" />
      case "brain":
        return <Brain className="h-6 w-6" />
      case "music":
        return <Music className="h-6 w-6" />
      case "heart":
        return <Heart className="h-6 w-6" />
      case "laptop":
        return <Laptop className="h-6 w-6" />
      default:
        return <Activity className="h-6 w-6" />
    }
  }

  return (
    <div className="border-2 border-black rounded-xl overflow-hidden">
      <div className={`p-4 text-white ${color}`}>
        <div className="flex justify-between items-center">
          {getIcon()}
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">Integration</span>
        </div>
        <h3 className="text-lg font-bold mt-2">{name}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
      <div className="p-4 bg-white">
        <div className="mb-3">
          <h4 className="text-sm font-bold mb-1">Available Apps:</h4>
          <div className="flex flex-wrap gap-1">
            {apps.map((app, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {app}
              </span>
            ))}
          </div>
        </div>
        <Button className="w-full bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold">
          Connect
        </Button>
      </div>
    </div>
  )
}
