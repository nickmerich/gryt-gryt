"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Plus, Activity, Book, Utensils, Clock, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Integration {
  id: string
  type: string
  provider: string
  hasValidToken: boolean
  isActive: boolean
  lastSyncedAt?: string
  error?: string
}

interface IntegrationStatusProps {
  isDarkMode?: boolean
}

export default function IntegrationStatus({ isDarkMode = false }: IntegrationStatusProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/integrations")

      if (!response.ok) {
        throw new Error("Failed to fetch integrations")
      }

      const data = await response.json()
      setIntegrations(data.integrations || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async (id: string) => {
    try {
      setSyncing((prev) => ({ ...prev, [id]: true }))

      const response = await fetch("/api/integrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action: "sync" }),
      })

      if (!response.ok) {
        throw new Error("Failed to sync integration")
      }

      // Refresh integrations
      await fetchIntegrations()
    } catch (err) {
      console.error(err)
    } finally {
      setSyncing((prev) => ({ ...prev, [id]: false }))
    }
  }

  const getIcon = (provider: string) => {
    const iconClass = isDarkMode ? "h-4 w-4 text-gray-300" : "h-4 w-4 text-gray-700"
    switch (provider) {
      case "strava":
      case "fitbit":
      case "apple_health":
      case "google_fit":
        return <Activity className={iconClass} />
      case "kindle":
      case "goodreads":
      case "audible":
      case "libby":
        return <Book className={iconClass} />
      case "myfitnesspal":
      case "loseit":
      case "cronometer":
        return <Utensils className={iconClass} />
      case "rescuetime":
      case "screen_time":
      case "forest":
        return <Clock className={iconClass} />
      default:
        return <Activity className={iconClass} />
    }
  }

  const formatProviderName = (provider: string): string => {
    switch (provider) {
      case "twitter":
        return "Twitter"
      case "facebook":
        return "Facebook"
      case "instagram":
        return "Instagram"
      case "strava":
        return "Strava"
      case "fitbit":
        return "Fitbit"
      case "apple_health":
        return "Apple Health"
      case "google_fit":
        return "Google Fit"
      case "myfitnesspal":
        return "MyFitnessPal"
      case "loseit":
        return "LoseIt!"
      case "cronometer":
        return "Cronometer"
      case "rescuetime":
        return "RescueTime"
      case "screen_time":
        return "Screen Time"
      case "forest":
        return "Forest"
      case "kindle":
        return "Kindle"
      case "goodreads":
        return "Goodreads"
      case "audible":
        return "Audible"
      case "libby":
        return "Libby"
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1)
    }
  }

  // Show only active integrations with valid tokens
  const activeIntegrations = integrations.filter((i) => i.isActive && i.hasValidToken).slice(0, 4)

  return (
    <>
      <div className={`bg-gradient-to-r from-black to-green-600 p-4 text-white`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Integrations</h2>
          <Link href="/dashboard/integrations">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              View All
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : activeIntegrations.length === 0 ? (
          <div className="text-center py-4">
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>No active integrations found.</p>
            <Link href="/dashboard/integrations">
              <Button
                variant="outline"
                className={`mt-2 rounded-xl border-2 font-bold min-h-[44px] text-sm transition-all ${
                  isDarkMode
                    ? "border-green-600 text-green-400 hover:bg-green-950/50 bg-black/50"
                    : "border-black text-black hover:bg-green-50"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Connect Apps
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activeIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={`flex items-center justify-between p-3 sm:p-4 border-2 rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gradient-to-r from-black/50 to-gray-900/50 border-green-600 hover:shadow-[3px_3px_0px_0px_rgba(34,197,94,0.2)] sm:hover:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.2)]"
                    : "bg-gradient-to-r from-white to-gray-50 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border flex-shrink-0 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-green-600"
                        : "bg-gradient-to-br from-gray-100 to-gray-200 border-black"
                    }`}
                  >
                    {getIcon(integration.provider)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm truncate ${isDarkMode ? "text-white" : "text-black"}`}>
                      {formatProviderName(integration.provider)}
                    </h3>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)}
                    </p>
                    {integration.lastSyncedAt && (
                      <p className={`text-xs font-medium ${isDarkMode ? "text-green-400" : "text-green-700"}`}>
                        Last sync:{" "}
                        {new Date(integration.lastSyncedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSync(integration.id)}
                    disabled={syncing[integration.id]}
                    className={`p-1 h-8 w-8 rounded-full ${
                      isDarkMode
                        ? "text-green-400 hover:text-green-300 hover:bg-green-950/50"
                        : "text-green-600 hover:text-green-700 hover:bg-green-50"
                    }`}
                  >
                    <RefreshCw className={`h-4 w-4 ${syncing[integration.id] ? "animate-spin" : ""}`} />
                  </Button>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span
                      className={`text-xs font-bold hidden sm:inline ${isDarkMode ? "text-green-400" : "text-green-700"}`}
                    >
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/dashboard/integrations">
              <Button
                variant="outline"
                className={`w-full mt-2 rounded-xl border-2 font-bold min-h-[44px] text-sm transition-all ${
                  isDarkMode
                    ? "border-green-600 text-green-400 hover:bg-green-950/50 bg-black/50"
                    : "border-black text-black hover:bg-green-50"
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
