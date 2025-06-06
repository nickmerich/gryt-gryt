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
    const iconClass = "h-8 w-8"
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

  // Determine if this should be a green card based on the color prop
  const isGreenCard = color.includes("green")

  return (
    <div className="group gpu-layer will-change-transform">
      {/* Main Card Container */}
      <div
        className={`
          relative overflow-hidden border-4 border-gryt-black rounded-xl
          transition-all duration-300 ease-out
          ${
            isGreenCard
              ? "bg-gryt-green shadow-white-lg hover:shadow-white-xl"
              : "bg-gryt-white shadow-brutal hover:shadow-brutal-lg"
          }
          hover:translate-y-[-4px] hover:translate-x-[-2px]
          active:translate-y-0 active:translate-x-0
          ${isGreenCard ? "hover:shadow-[0_0_0_4px_#ffffff,8px_8px_0px_4px_#000000]" : ""}
        `}
      >
        {/* Icon Header Section */}
        <div
          className={`
            relative p-8 border-b-4 border-gryt-black
            ${isGreenCard ? "bg-gryt-black" : "bg-gryt-green"}
          `}
        >
          {/* Icon Container */}
          <div
            className={`
              inline-flex items-center justify-center p-4 rounded-xl border-4 border-gryt-black
              ${isGreenCard ? "bg-gryt-green" : "bg-gryt-white"}
              shadow-brutal mb-6
              group-hover:shadow-brutal-lg group-hover:translate-y-[-2px]
              transition-all duration-300
            `}
          >
            <div className={isGreenCard ? "text-gryt-white" : "text-gryt-black"}>{getIcon()}</div>
          </div>

          {/* Title */}
          <h3
            className={`
              text-2xl font-black leading-tight tracking-tight
              ${isGreenCard ? "text-gryt-white" : "text-gryt-white"}
            `}
          >
            {title}
          </h3>

          {/* Decorative Corner Element */}
          <div
            className={`
              absolute top-4 right-4 w-6 h-6 border-4 border-gryt-black rounded-full
              ${isGreenCard ? "bg-gryt-white" : "bg-gryt-black"}
            `}
          />
        </div>

        {/* Content Section */}
        <div
          className={`
            p-8 relative
            ${isGreenCard ? "bg-gryt-green" : "bg-gryt-white"}
          `}
        >
          <p
            className={`
              text-lg leading-relaxed font-medium
              ${isGreenCard ? "text-gryt-white" : "text-gryt-black"}
            `}
          >
            {description}
          </p>

          {/* Bottom Accent Line */}
          <div
            className={`
              absolute bottom-0 left-8 right-8 h-1 rounded-full
              ${isGreenCard ? "bg-gryt-white" : "bg-gryt-green"}
            `}
          />
        </div>

        {/* Hover Glow Effect for Green Cards */}
        {isGreenCard && (
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent" />
        )}
      </div>
    </div>
  )
}
