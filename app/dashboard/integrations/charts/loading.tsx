import { Card } from "@/components/ui/card"

export default function IntegrationChartsLoading() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 rounded-lg w-64 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-3 rounded-xl p-6 animate-pulse bg-white/50 border-black/50">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-48"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, statIndex) => (
                  <div key={statIndex} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
