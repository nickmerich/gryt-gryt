"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, BarChart3, CheckCircle2, AlertCircle, Target } from "lucide-react"
import { format, parseISO, isWithinInterval, subDays, subMonths } from "date-fns"
import {
  mockHabitSubmissions,
  calculateHabitStats,
  getCategoryInfo,
  getImpactLevelInfo,
  type HabitSubmission,
  type HabitCategory,
} from "@/lib/habit-submissions"
import HabitSubmissionForm from "./habit-submission-form"

interface HabitSubmissionsDashboardProps {
  isDarkMode?: boolean
}

export default function HabitSubmissionsDashboard({ isDarkMode = false }: HabitSubmissionsDashboardProps) {
  const [submissions, setSubmissions] = useState<HabitSubmission[]>(mockHabitSubmissions)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<HabitCategory | "all">("all")
  const [filterImpact, setFilterImpact] = useState<"all" | "positive" | "negative">("all")
  const [filterPeriod, setFilterPeriod] = useState<"all" | "week" | "month" | "3months">("all")

  // Filter submissions based on search and filters
  const filteredSubmissions = useMemo(() => {
    let filtered = submissions

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.habitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.impactDescription.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((submission) => submission.category === filterCategory)
    }

    // Impact filter
    if (filterImpact !== "all") {
      filtered = filtered.filter((submission) => submission.impact === filterImpact)
    }

    // Period filter
    if (filterPeriod !== "all") {
      const now = new Date()
      let startDate: Date

      switch (filterPeriod) {
        case "week":
          startDate = subDays(now, 7)
          break
        case "month":
          startDate = subMonths(now, 1)
          break
        case "3months":
          startDate = subMonths(now, 3)
          break
        default:
          startDate = new Date(0)
      }

      filtered = filtered.filter((submission) =>
        isWithinInterval(parseISO(submission.date), { start: startDate, end: now }),
      )
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [submissions, searchTerm, filterCategory, filterImpact, filterPeriod])

  const stats = useMemo(() => calculateHabitStats(filteredSubmissions), [filteredSubmissions])

  const handleSubmitHabit = (habitData: Omit<HabitSubmission, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const newSubmission: HabitSubmission = {
      ...habitData,
      id: Date.now().toString(),
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setSubmissions((prev) => [newSubmission, ...prev])
    setShowForm(false)
  }

  if (showForm) {
    return (
      <HabitSubmissionForm onSubmit={handleSubmitHabit} onCancel={() => setShowForm(false)} isDarkMode={isDarkMode} />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Habit Impact Tracker</h1>
          <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Document and analyze how your habits affect your goals
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log New Habit
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className={`border-3 rounded-xl p-4 ${
            isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-xl">
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{stats.total}</p>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Habits</p>
            </div>
          </div>
        </Card>

        <Card
          className={`border-3 rounded-xl p-4 ${
            isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-xl">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                {stats.positivePercentage}%
              </p>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Positive Impact</p>
            </div>
          </div>
        </Card>

        <Card
          className={`border-3 rounded-xl p-4 ${
            isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                {stats.negativePercentage}%
              </p>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Negative Impact</p>
            </div>
          </div>
        </Card>

        <Card
          className={`border-3 rounded-xl p-4 ${
            isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-xl">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{stats.averageImpact}</p>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Avg. Impact</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card
        className={`border-3 rounded-xl p-4 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 rounded-xl border-2 font-medium ${
                  isDarkMode ? "border-green-600 bg-black/50" : "border-black"
                }`}
              />
            </div>
          </div>

          <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as HabitCategory | "all")}>
            <SelectTrigger
              className={`w-full lg:w-48 rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getCategoryInfo("productive") && (
                <>
                  <SelectItem value="productive">⚡ Productive</SelectItem>
                  <SelectItem value="distracting">📱 Distracting</SelectItem>
                  <SelectItem value="helpful">🤝 Helpful</SelectItem>
                  <SelectItem value="detrimental">⚠️ Detrimental</SelectItem>
                  <SelectItem value="health">💪 Health</SelectItem>
                  <SelectItem value="social">👥 Social</SelectItem>
                  <SelectItem value="financial">💰 Financial</SelectItem>
                  <SelectItem value="learning">📚 Learning</SelectItem>
                  <SelectItem value="creative">🎨 Creative</SelectItem>
                  <SelectItem value="spiritual">🙏 Spiritual</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

          <Select
            value={filterImpact}
            onValueChange={(value) => setFilterImpact(value as "all" | "positive" | "negative")}
          >
            <SelectTrigger
              className={`w-full lg:w-48 rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
            >
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impact</SelectItem>
              <SelectItem value="positive">✅ Positive</SelectItem>
              <SelectItem value="negative">❌ Negative</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterPeriod}
            onValueChange={(value) => setFilterPeriod(value as "all" | "week" | "month" | "3months")}
          >
            <SelectTrigger
              className={`w-full lg:w-48 rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
            >
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card
            className={`border-3 rounded-xl p-8 text-center ${
              isDarkMode
                ? "bg-black/90 border-green-600"
                : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <Target className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>No habits found</h3>
                <p className={`text-gray-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {searchTerm || filterCategory !== "all" || filterImpact !== "all" || filterPeriod !== "all"
                    ? "Try adjusting your filters or search terms"
                    : "Start logging your habits to see them here"}
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Your First Habit
              </Button>
            </div>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => {
            const categoryInfo = getCategoryInfo(submission.category)
            const impactInfo = getImpactLevelInfo(submission.intensity)

            return (
              <Card
                key={submission.id}
                className={`border-3 rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-black/90 border-green-600"
                    : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${
                            submission.impact === "positive" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {submission.impact === "positive" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                            {submission.habitName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${categoryInfo.color} border font-medium`}>
                              {categoryInfo.icon} {categoryInfo.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`font-medium ${
                                isDarkMode ? "border-green-600 text-green-400" : "border-black"
                              }`}
                            >
                              {impactInfo.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {format(parseISO(submission.date), "MMM d, yyyy")}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {submission.description}
                      </p>

                      <div className="space-y-1">
                        <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          Impact on Goals:
                        </p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {submission.impactDescription}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          Goal Relation:
                        </p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {submission.goalRelation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col items-center lg:items-end gap-2">
                    <div
                      className={`text-center p-3 rounded-xl border-2 ${
                        submission.impact === "positive"
                          ? isDarkMode
                            ? "bg-green-950/20 border-green-600"
                            : "bg-green-50 border-green-200"
                          : isDarkMode
                            ? "bg-red-950/20 border-red-600"
                            : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div
                        className={`text-2xl font-bold ${
                          submission.impact === "positive"
                            ? isDarkMode
                              ? "text-green-400"
                              : "text-green-700"
                            : isDarkMode
                              ? "text-red-400"
                              : "text-red-700"
                        }`}
                      >
                        {submission.impact === "positive" ? "+" : "-"}
                        {submission.intensity}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          submission.impact === "positive"
                            ? isDarkMode
                              ? "text-green-400"
                              : "text-green-700"
                            : isDarkMode
                              ? "text-red-400"
                              : "text-red-700"
                        }`}
                      >
                        Impact
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {/* Load More Button (if needed) */}
      {filteredSubmissions.length > 0 && (
        <div className="text-center pt-4">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Showing {filteredSubmissions.length} of {submissions.length} habit submissions
          </p>
        </div>
      )}
    </div>
  )
}
