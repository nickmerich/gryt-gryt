"use client"

import { useState } from "react"
import IntegrationCharts from "@/components/integrations/integration-charts"

export default function IntegrationChartsPage() {
  const [isDarkMode] = useState(false)

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black">Integration Charts</h1>
          <p className="text-gray-600 mt-1">Visualize data from your connected apps and services</p>
        </div>
      </div>

      <IntegrationCharts isDarkMode={isDarkMode} />
    </div>
  )
}
