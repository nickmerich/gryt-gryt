"use client"

import { BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function IntegrationsPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black">App Integrations</h1>
          <p className="text-gray-600 mt-1">Connect your favorite apps to automatically sync your data</p>
        </div>
        <Button
          onClick={() => (window.location.href = "/dashboard/integrations/charts")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-400 rounded-xl"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          View Charts
        </Button>
      </div>

      {/* Rest of the page content */}
      <div className="mt-8">
        <p>This is where the integrations content will go.</p>
      </div>
    </div>
  )
}
