"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Target } from "lucide-react"
import AnalyticsOverview from "@/components/analytics/analytics-overview"
import DataFilters from "@/components/analytics/data-filters"
import ExportData from "@/components/analytics/export-data"
import EngagementChart from "@/components/analytics/engagement-chart"
import GrowthMetrics from "@/components/analytics/growth-metrics"
import HabitAnalytics from "@/components/analytics/habit-analytics"
import AchievementProgress from "@/components/analytics/achievement-progress"

export default function AnalyticsPage() {
  const [isDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: "30d",
    timeframe: "daily",
    habitCategory: "all",
    achievementType: "all",
  })

  const handleFilterChange = (newFilters: any) => {
    setIsLoading(true)
    setFilters({ ...filters, ...newFilters })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your habit tracking and progress</p>
        </div>
        <ExportData filters={filters} isDarkMode={isDarkMode} />
      </div>

      {/* Filters */}
      <DataFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        isDarkMode={isDarkMode}
        isLoading={isLoading}
      />

      {/* Analytics Tabs */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b-2 border-black p-4">
            <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-bold"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="engagement"
                className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-bold"
              >
                <Users className="h-4 w-4 mr-2" />
                Engagement
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-bold"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Growth
              </TabsTrigger>
              <TabsTrigger
                value="habits"
                className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-bold"
              >
                <Target className="h-4 w-4 mr-2" />
                Habits
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-black font-bold"
              >
                Achievements
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <AnalyticsOverview filters={filters} isDarkMode={isDarkMode} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="engagement" className="p-6">
            <EngagementChart filters={filters} isDarkMode={isDarkMode} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="growth" className="p-6">
            <GrowthMetrics filters={filters} isDarkMode={isDarkMode} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="habits" className="p-6">
            <HabitAnalytics filters={filters} isDarkMode={isDarkMode} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="achievements" className="p-6">
            <AchievementProgress filters={filters} isDarkMode={isDarkMode} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
