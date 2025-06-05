import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
  isDark?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
  isDark = false,
}: PricingCardProps) {
  return (
    <div
      className={`border-4 rounded-xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
        highlighted
          ? "border-green-600 bg-black text-white shadow-[8px_8px_0px_0px_rgba(22,163,74,1)] hover:shadow-[12px_12px_0px_0px_rgba(22,163,74,1)]"
          : "border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      {highlighted && (
        <div className="bg-green-600 text-white text-center py-2 px-4 rounded-lg mb-6 font-bold">Most Popular</div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? "text-white" : "text-black"}`}>{title}</h3>
        <div className="mb-4">
          <span className={`text-5xl font-black ${highlighted ? "text-white" : "text-black"}`}>{price}</span>
          {period && <span className={`text-lg ${highlighted ? "text-gray-300" : "text-gray-600"}`}>{period}</span>}
        </div>
        <p className={`${highlighted ? "text-gray-300" : "text-gray-600"} text-lg`}>{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${highlighted ? "text-green-400" : "text-green-600"}`} />
            <span className={`${highlighted ? "text-gray-200" : "text-gray-700"} leading-relaxed`}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={buttonLink}>
        <Button
          className={`w-full rounded-xl border-2 font-bold text-lg py-6 h-auto transition-all duration-300 ${
            highlighted
              ? "bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)]"
              : "bg-black hover:bg-gray-800 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}
