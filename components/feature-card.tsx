import { Layers, Sparkles, BarChart3, BookOpen, Users, Library } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  color: string
  isDark?: boolean
}

export default function FeatureCard({ title, description, icon, color, isDark = false }: FeatureCardProps) {
  const getIcon = () => {
    const iconClass = "h-8 w-8 text-white"
    switch (icon) {
      case "layers":
        return <Layers className={iconClass} />
      case "sparkles":
        return <Sparkles className={iconClass} />
      case "bar-chart":
        return <BarChart3 className={iconClass} />
      case "book":
        return <BookOpen className={iconClass} />
      case "users":
        return <Users className={iconClass} />
      case "library":
        return <Library className={iconClass} />
      default:
        return <Sparkles className={iconClass} />
    }
  }

  return (
    <div
      className={`border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div className={`p-6 text-white ${color}`}>
        {getIcon()}
        <h3 className="text-xl font-bold mt-4">{title}</h3>
      </div>
      <div className={`p-6 ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
        <p className="text-base leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
