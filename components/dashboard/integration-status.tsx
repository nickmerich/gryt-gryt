"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Plus, Activity, Book, Utensils, Clock } from "lucide-react"

interface Integration {
  id: number
  name: string
  category: string
  connected: boolean
  icon: string
  lastSync?: string
}

interface IntegrationStatusProps {
  isDarkMode?: boolean
}

export default function IntegrationStatus({ isDarkMode = false }: IntegrationStatusProps) {
  const integrations: Integration[] = [
    { id: 1, name: "Apple Health", category: "Fitness", connected: true, icon: "activity", lastSync: "2 min ago" },
    { id: 2, name: "Kindle", category: "Reading", connected: true, icon: "book", lastSync: "1 hour ago" },
    { id: 3, name: "MyFitnessPal", category: "Nutrition", connected: false, icon: "utensils" },
    { id: 4, name: "RescueTime", category: "Productivity", connected: false, icon: "clock" },
  ]

  const getIcon = (iconName: string) => {
    const iconClass = isDarkMode ? "h-4 w-4 text-slate-300" : "h-4 w-4 text-slate-700"
    switch (iconName) {
      case "activity":
        return <Activity className={iconClass} />
      case "book":
        return <Book className={iconClass} />
      case "utensils":
        return <Utensils className={iconClass} />
      case "clock":
        return <Clock className={iconClass} />
      default:
        return <Activity className={iconClass} />
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-4 text-white">
        <h2 className="text-lg font-bold">Integrations</h2>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`flex items-center justify-between p-3 sm:p-4 border-2 rounded-xl transition-all ${
                isDarkMode
                  ? "bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600 hover:shadow-[3px_3px_0px_0px_rgba(71,85,105,0.2)] sm:hover:shadow-[4px_4px_0px_0px_rgba(71,85,105,0.2)]"
                  : "bg-gradient-to-r from-white to-slate-50 border-slate-900 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,0.1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border flex-shrink-0 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500"
                      : "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300"
                  }`}
                >
                  {getIcon(integration.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                    {integration.name}
                  </h3>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {integration.category}
                  </p>
                  {integration.connected && integration.lastSync && (
                    <p className={`text-xs font-medium ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                      Last sync: {integration.lastSync}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {integration.connected ? (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span
                      className={`text-xs font-bold hidden sm:inline ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-700"
                      }`}
                    >
                      Connected
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <XCircle className="h-5 w-5 text-rose-500" />
                    <span
                      className={`text-xs font-bold hidden sm:inline ${isDarkMode ? "text-rose-400" : "text-rose-700"}`}
                    >
                      Disconnected
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className={`w-full mt-4 rounded-xl border-2 font-bold min-h-[44px] text-sm transition-all ${
            isDarkMode
              ? "border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-slate-800/50"
              : "border-slate-900 text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>
    </>
  )
}
