"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts"
import {
  Activity,
  Apple,
  Clock,
  BookOpen,
  Share2,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Calendar,
  Target,
} from "lucide-react"
import GoalManager from "@/components/goals/goal-manager"
import { type Goal, GoalService, type GoalProgress } from "@/lib/goal-service"

interface IntegrationChartsProps {
  isDarkMode?: boolean
}

export default function IntegrationCharts({ isDarkMode = false }: IntegrationChartsProps) {
  const [data, setData] = useState<any[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [refreshing, setRefreshing] = useState(false)
  const [showGoalManager, setShowGoalManager] = useState(false)

  useEffect(() => {
    fetchIntegrationData()
    fetchGoals()
  }, [selectedTimeframe])

  useEffect(() => {
    if (data.length > 0 && goals.length > 0) {
      calculateGoalProgress()
    }
  }, [data, goals])

  const fetchIntegrationData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/integrations/data?timeframe=${selectedTimeframe}`)
      const result = await response.json()
      setData(result.data || [])
    } catch (error) {
      console.error("Failed to fetch integration data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals")
      const result = await response.json()
      setGoals(result.goals || [])
    } catch (error) {
      console.error("Failed to fetch goals:", error)
    }
  }

  const calculateGoalProgress = () => {
    const progress: GoalProgress[] = []

    data.forEach((integration) => {
      const relevantGoals = goals.filter(
        (goal) => goal.integrationProvider === integration.provider && goal.integrationType === integration.type,
      )

      relevantGoals.forEach((goal) => {
        const goalProgress = GoalService.calculateGoalProgress(goal, integration.chartData)
        progress.push(goalProgress)
      })
    })

    setGoalProgress(progress)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchIntegrationData()
    await fetchGoals()
    setRefreshing(false)
  }

  const getGoalsForIntegration = (provider: string, type: string) => {
    return goals.filter((goal) => goal.integrationProvider === provider && goal.integrationType === type)
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "strava":
      case "fitbit":
      case "apple_health":
      case "google_fit":
        return <Activity className="h-5 w-5" />
      case "myfitnesspal":
      case "loseit":
      case "cronometer":
        return <Apple className="h-5 w-5" />
      case "rescuetime":
      case "screen_time":
      case "forest":
        return <Clock className="h-5 w-5" />
      case "goodreads":
      case "kindle":
      case "audible":
      case "libby":
        return <BookOpen className="h-5 w-5" />
      case "twitter":
      case "facebook":
      case "instagram":
        return <Share2 className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case "fitness":
        return value.toLocaleString()
      case "nutrition":
        return `${value} cal`
      case "productivity":
        return `${value}h`
      case "reading":
        return `${value} pages`
      case "social":
        return value.toString()
      default:
        return value.toString()
    }
  }

  const getChartColor = (type: string) => {
    switch (type) {
      case "fitness":
        return "#ef4444" // red
      case "nutrition":
        return "#f97316" // orange
      case "productivity":
        return "#3b82f6" // blue
      case "reading":
        return "#8b5cf6" // purple
      case "social":
        return "#06b6d4" // cyan
      default:
        return "#10b981" // green
    }
  }

  const renderGoalLines = (integration: any) => {
    const integrationGoals = getGoalsForIntegration(integration.provider, integration.type)

    return integrationGoals.map((goal) => {
      const progress = goalProgress.find((p) => p.goalId === goal.id)

      return (
        <ReferenceLine
          key={goal.id}
          y={goal.targetValue}
          stroke={goal.color}
          strokeWidth={3}
          strokeDasharray="8 4"
          label={{
            value: `Target: ${goal.targetValue}`,
            position: "insideTopLeft",
            style: { fill: goal.color, fontWeight: "bold", fontSize: "12px" },
          }}
        />
      )
    })
  }

  const renderGoalAreas = (integration: any) => {
    const integrationGoals = getGoalsForIntegration(integration.provider, integration.type)

    return integrationGoals.map((goal) => {
      if (goal.goalType === "minimum") {
        return (
          <ReferenceArea
            key={`${goal.id}-area`}
            y1={goal.targetValue}
            y2={goal.targetValue * 1.2}
            fill={goal.color}
            fillOpacity={0.1}
            stroke="none"
          />
        )
      } else if (goal.goalType === "maximum") {
        return (
          <ReferenceArea
            key={`${goal.id}-area`}
            y1={0}
            y2={goal.targetValue}
            fill={goal.color}
            fillOpacity={0.1}
            stroke="none"
          />
        )
      }
      return null
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl p-6 animate-pulse ${
              isDarkMode ? "bg-black/50 border-green-600/50" : "bg-white/50 border-black/50"
            }`}
          >
            <div className="space-y-4">
              <div className={`h-6 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-64 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Card
        className={`border-3 rounded-xl p-8 text-center ${
          isDarkMode
            ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="space-y-4">
          <div className={`text-6xl ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>📊</div>
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            No Integration Data Available
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Connect your apps in the Integrations section to see your data visualized here.
          </p>
          <Button
            onClick={() => (window.location.href = "/dashboard/integrations")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-400 rounded-xl"
          >
            Connect Apps
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Integration Analytics</h2>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Insights from your connected apps with goal tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowGoalManager(!showGoalManager)}
            variant="outline"
            className={`border-2 font-bold ${
              isDarkMode
                ? "border-green-600 hover:bg-green-950/50 text-green-400"
                : "border-black hover:bg-green-50 text-black"
            }`}
          >
            <Target className="h-4 w-4 mr-2" />
            Goals
          </Button>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className={`px-3 py-2 rounded-lg border-2 font-semibold ${
                isDarkMode ? "bg-black border-green-600 text-white" : "bg-white border-black text-black"
              }`}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className={`border-2 font-bold ${
              isDarkMode
                ? "border-green-600 hover:bg-green-950/50 text-green-400"
                : "border-black hover:bg-green-50 text-black"
            }`}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Goal Manager */}
      {showGoalManager && (
        <Card
          className={`border-3 rounded-xl p-6 ${
            isDarkMode
              ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
              : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          }`}
        >
          <GoalManager onGoalsUpdate={setGoals} isDarkMode={isDarkMode} />
        </Card>
      )}

      {/* Charts Grid */}
      <div className="grid gap-6">
        {data.map((integration, index) => {
          const integrationGoals = getGoalsForIntegration(integration.provider, integration.type)

          return (
            <Card
              key={index}
              className={`border-3 rounded-xl overflow-hidden ${
                isDarkMode
                  ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                  : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
              }`}
            >
              {/* Chart Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getProviderIcon(integration.provider)}
                    <div>
                      <h3 className="text-lg font-bold capitalize">
                        {integration.provider.replace("_", " ")} - {integration.type}
                      </h3>
                      <p className="text-green-100 text-sm">
                        Last updated: {new Date(integration.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(integration.summary.trend)}
                      <span className="font-bold">{integration.summary.change}%</span>
                    </div>
                    <div className="text-sm text-green-100">
                      Avg: {formatValue(integration.summary.average, integration.type)}
                    </div>
                    {integrationGoals.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Target className="h-3 w-3" />
                        <span className="text-xs">{integrationGoals.length} goals</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-6">
                <Tabs defaultValue="line" className="w-full">
                  <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1 mb-6">
                    <TabsTrigger
                      value="line"
                      className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white font-bold"
                    >
                      Line Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="area"
                      className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white font-bold"
                    >
                      Area Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="bar"
                      className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white font-bold"
                    >
                      Bar Chart
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="line">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={integration.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                          }
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: any, name: string) => [formatValue(value, integration.type), name]}
                        />
                        <Legend />

                        {/* Goal Lines */}
                        {renderGoalLines(integration)}
                        {renderGoalAreas(integration)}

                        {Object.keys(integration.chartData[0] || {})
                          .filter((key) => key !== "date")
                          .map((key, keyIndex) => (
                            <Line
                              key={key}
                              type="monotone"
                              dataKey={key}
                              stroke={getChartColor(integration.type)}
                              strokeWidth={3}
                              dot={{ fill: getChartColor(integration.type), strokeWidth: 2, r: 4 }}
                            />
                          ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="area">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={integration.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                          }
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: any, name: string) => [formatValue(value, integration.type), name]}
                        />
                        <Legend />

                        {/* Goal Lines */}
                        {renderGoalLines(integration)}
                        {renderGoalAreas(integration)}

                        {Object.keys(integration.chartData[0] || {})
                          .filter((key) => key !== "date")
                          .map((key, keyIndex) => (
                            <Area
                              key={key}
                              type="monotone"
                              dataKey={key}
                              stackId="1"
                              stroke={getChartColor(integration.type)}
                              fill={getChartColor(integration.type)}
                              fillOpacity={0.6}
                            />
                          ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="bar">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={integration.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                          }
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: any, name: string) => [formatValue(value, integration.type), name]}
                        />
                        <Legend />

                        {/* Goal Lines */}
                        {renderGoalLines(integration)}
                        {renderGoalAreas(integration)}

                        {Object.keys(integration.chartData[0] || {})
                          .filter((key) => key !== "date")
                          .map((key, keyIndex) => (
                            <Bar key={key} dataKey={key} fill={getChartColor(integration.type)} radius={[4, 4, 0, 0]} />
                          ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>

                {/* Goal Progress Summary */}
                {integrationGoals.length > 0 && (
                  <div className="mt-6">
                    <GoalManager
                      integrationProvider={integration.provider}
                      integrationType={integration.type}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                )}

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    className={`p-3 rounded-lg border-2 ${
                      isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      Total
                    </div>
                    <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                      {formatValue(integration.summary.total, integration.type)}
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-2 ${
                      isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      Average
                    </div>
                    <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                      {formatValue(integration.summary.average, integration.type)}
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-2 ${
                      isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      Trend
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(integration.summary.trend)}
                      <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {integration.summary.change}%
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border-2 ${
                      isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                      Goals
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {integrationGoals.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
