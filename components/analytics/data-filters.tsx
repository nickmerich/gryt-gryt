"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Clock, Tag } from "lucide-react"

interface DataFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
  isDarkMode: boolean
  isLoading: boolean
}

export default function DataFilters({ filters, onFilterChange, isDarkMode, isLoading }: DataFiltersProps) {
  const dateRangeOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
    { value: "all", label: "All time" },
  ]

  const timeframeOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]

  const habitCategories = [
    { value: "all", label: "All Habits" },
    { value: "health", label: "Health & Fitness" },
    { value: "mindfulness", label: "Mindfulness" },
    { value: "productivity", label: "Productivity" },
    { value: "learning", label: "Learning" },
    { value: "social", label: "Social" },
  ]

  const achievementTypes = [
    { value: "all", label: "All Achievements" },
    { value: "common", label: "Common" },
    { value: "rare", label: "Rare" },
    { value: "epic", label: "Epic" },
    { value: "legendary", label: "Legendary" },
  ]

  return (
    <Card
      className={`border-3 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
        isDarkMode
          ? "bg-black/90 border-green-600 shadow-[0_0_0_2px_#ffffff,4px_4px_0px_2px_rgba(34,197,94,0.3)]"
          : "bg-white/95 border-black shadow-[0_0_0_2px_#ffffff,4px_4px_0px_2px_rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white shadow-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Data Filters
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Date Range */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4" />
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Date Range</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dateRangeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => onFilterChange({ dateRange: option.value })}
                disabled={isLoading}
                variant={filters.dateRange === option.value ? "default" : "outline"}
                className={`rounded-xl border-2 font-bold min-h-[36px] px-3 text-sm transition-all duration-300 ease-in-out ${
                  filters.dateRange === option.value
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-400 shadow-white"
                    : isDarkMode
                      ? "border-green-600 hover:bg-green-950/50 text-green-400 bg-black/50"
                      : "border-black hover:bg-green-50 text-black"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeframe */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4" />
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Timeframe</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeframeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => onFilterChange({ timeframe: option.value })}
                disabled={isLoading}
                variant={filters.timeframe === option.value ? "default" : "outline"}
                className={`rounded-xl border-2 font-bold min-h-[36px] px-3 text-sm transition-all duration-300 ease-in-out ${
                  filters.timeframe === option.value
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-400 shadow-white"
                    : isDarkMode
                      ? "border-green-600 hover:bg-green-950/50 text-green-400 bg-black/50"
                      : "border-black hover:bg-green-50 text-black"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Habit Categories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4" />
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Habit Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {habitCategories.map((category) => (
              <Button
                key={category.value}
                onClick={() => onFilterChange({ habitCategory: category.value })}
                disabled={isLoading}
                variant={filters.habitCategory === category.value ? "default" : "outline"}
                className={`rounded-xl border-2 font-bold min-h-[36px] px-3 text-sm transition-all duration-300 ease-in-out ${
                  filters.habitCategory === category.value
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-400 shadow-white"
                    : isDarkMode
                      ? "border-green-600 hover:bg-green-950/50 text-green-400 bg-black/50"
                      : "border-black hover:bg-green-50 text-black"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievement Types */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4" />
            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Achievement Types</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {achievementTypes.map((type) => (
              <Button
                key={type.value}
                onClick={() => onFilterChange({ achievementType: type.value })}
                disabled={isLoading}
                variant={filters.achievementType === type.value ? "default" : "outline"}
                className={`rounded-xl border-2 font-bold min-h-[36px] px-3 text-sm transition-all duration-300 ease-in-out ${
                  filters.achievementType === type.value
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-400 shadow-white"
                    : isDarkMode
                      ? "border-green-600 hover:bg-green-950/50 text-green-400 bg-black/50"
                      : "border-black hover:bg-green-50 text-black"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        <div>
          <span className={`font-semibold mb-3 block ${isDarkMode ? "text-white" : "text-black"}`}>Active Filters</span>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 font-bold shadow-white">
              {dateRangeOptions.find((d) => d.value === filters.dateRange)?.label}
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 font-bold shadow-white">
              {timeframeOptions.find((t) => t.value === filters.timeframe)?.label}
            </Badge>
            {filters.habitCategory !== "all" && (
              <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 font-bold shadow-white">
                {habitCategories.find((h) => h.value === filters.habitCategory)?.label}
              </Badge>
            )}
            {filters.achievementType !== "all" && (
              <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 font-bold shadow-white">
                {achievementTypes.find((a) => a.value === filters.achievementType)?.label}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
