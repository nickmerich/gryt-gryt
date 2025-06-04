"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, X } from "lucide-react"

interface Insight {
  id: number
  type: "tip" | "warning" | "achievement" | "suggestion"
  title: string
  message: string
  action?: string
}

interface AiGuideProps {
  isDarkMode?: boolean
}

export default function AiGuide({ isDarkMode = false }: AiGuideProps) {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      type: "achievement",
      title: "Great streak!",
      message: "You've maintained your meditation habit for 12 days straight. Keep it up!",
    },
    {
      id: 2,
      type: "suggestion",
      title: "Optimize your routine",
      message: "Consider moving your exercise to the morning for better consistency.",
      action: "Reschedule",
    },
    {
      id: 3,
      type: "warning",
      title: "Hydration reminder",
      message: "You've missed your water intake goal 3 times this week.",
      action: "Set reminder",
    },
  ])

  const dismissInsight = (id: number) => {
    setInsights(insights.filter((insight) => insight.id !== id))
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <TrendingUp className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-red-500" />
      default:
        return <Sparkles className="h-5 w-5 text-red-500" />
    }
  }

  const getInsightColor = (type: string) => {
    if (isDarkMode) {
      switch (type) {
        case "achievement":
          return "border-2 border-red-500/40 bg-gradient-to-br from-red-600/20 to-red-700/20"
        case "warning":
          return "border-2 border-red-600/40 bg-gradient-to-br from-red-700/20 to-red-800/20"
        case "suggestion":
          return "border-2 border-red-400/40 bg-gradient-to-br from-red-500/20 to-red-600/20"
        default:
          return "border-2 border-red-400/40 bg-gradient-to-br from-red-500/20 to-red-600/20"
      }
    } else {
      switch (type) {
        case "achievement":
          return "border-2 border-red-400 bg-gradient-to-br from-red-50 to-red-100"
        case "warning":
          return "border-2 border-red-500 bg-gradient-to-br from-red-100 to-red-200"
        case "suggestion":
          return "border-2 border-red-300 bg-gradient-to-br from-red-25 to-red-75"
        default:
          return "border-2 border-red-400 bg-gradient-to-br from-red-50 to-red-100"
      }
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="text-lg font-bold">AI Guide</h2>
        </div>
      </div>
      <div className="p-4">
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className={`border-2 rounded-xl p-3 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm leading-tight ${isDarkMode ? "text-white" : "text-black"}`}>
                        {insight.title}
                      </h3>
                      <p className={`text-sm mt-1 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                        {insight.message}
                      </p>
                      {insight.action && (
                        <Button
                          size="sm"
                          className={`mt-3 rounded-xl border-2 font-bold text-xs min-h-[36px] px-3 transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-red-500 shadow-[2px_2px_0px_0px_rgba(220,38,38,0.3)]"
                              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-400 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]"
                          }`}
                        >
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto min-w-[36px] min-h-[36px] flex items-center justify-center ml-2"
                    onClick={() => dismissInsight(insight.id)}
                  >
                    <X className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className={`h-12 w-12 mx-auto mb-2 ${isDarkMode ? "text-red-500" : "text-red-400"}`} />
            <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No new insights yet. Keep tracking your habits!
            </p>
          </div>
        )}
      </div>
    </>
  )
}
