import {
  Layers,
  Sparkles,
  BarChart,
  Book,
  Users,
  Library,
  Target,
  Calendar,
  Clock,
  Brain,
  Zap,
  LineChart,
} from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  color: string
}

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "layers":
        return <Layers className="h-8 w-8" />
      case "sparkles":
        return <Sparkles className="h-8 w-8" />
      case "bar-chart":
        return <BarChart className="h-8 w-8" />
      case "book":
        return <Book className="h-8 w-8" />
      case "users":
        return <Users className="h-8 w-8" />
      case "library":
        return <Library className="h-8 w-8" />
      case "target":
        return <Target className="h-8 w-8" />
      case "calendar":
        return <Calendar className="h-8 w-8" />
      case "clock":
        return <Clock className="h-8 w-8" />
      case "brain":
        return <Brain className="h-8 w-8" />
      case "zap":
        return <Zap className="h-8 w-8" />
      case "line-chart":
        return <LineChart className="h-8 w-8" />
      default:
        return <Sparkles className="h-8 w-8" />
    }
  }

  return (
    <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className={`p-6 text-white ${color}`}>
        {getIcon()}
        <h3 className="text-xl font-bold mt-4">{title}</h3>
      </div>
      <div className="p-6 bg-white">
        <p>{description}</p>
      </div>
    </div>
  )
}
