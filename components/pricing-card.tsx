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
  highlighted: boolean
}

export default function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonLink,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`
      border-4 border-black rounded-xl overflow-hidden
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
      ${highlighted ? "bg-gradient-to-br from-purple-50 to-blue-50" : "bg-white"}
    `}
    >
      <div className="p-6 border-b-4 border-black">
        <h3 className="text-2xl font-black mb-2">{title}</h3>
        <div className="flex items-end mb-4">
          <span className="text-4xl font-black">{price}</span>
          {period && <span className="text-gray-600 ml-1">{period}</span>}
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={buttonLink}>
          <Button
            className={`w-full font-bold py-6 h-auto text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              highlighted ? "bg-black hover:bg-black/80 text-white" : "bg-white hover:bg-gray-100 text-black"
            }`}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  )
}
