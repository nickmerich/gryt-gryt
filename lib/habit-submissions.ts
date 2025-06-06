export interface HabitSubmission {
  id: string
  userId: string
  habitName: string
  description: string
  date: string
  impact: "positive" | "negative"
  category: HabitCategory
  impactDescription: string
  goalRelation: string
  intensity: 1 | 2 | 3 | 4 | 5 // 1 = minimal, 5 = major impact
  createdAt: string
  updatedAt: string
}

export type HabitCategory =
  | "productive"
  | "distracting"
  | "helpful"
  | "detrimental"
  | "health"
  | "social"
  | "financial"
  | "learning"
  | "creative"
  | "spiritual"

export const habitCategories: { value: HabitCategory; label: string; color: string; icon: string }[] = [
  { value: "productive", label: "Productive", color: "bg-green-100 text-green-800 border-green-300", icon: "⚡" },
  { value: "distracting", label: "Distracting", color: "bg-red-100 text-red-800 border-red-300", icon: "📱" },
  { value: "helpful", label: "Helpful", color: "bg-blue-100 text-blue-800 border-blue-300", icon: "🤝" },
  { value: "detrimental", label: "Detrimental", color: "bg-orange-100 text-orange-800 border-orange-300", icon: "⚠️" },
  { value: "health", label: "Health", color: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: "💪" },
  { value: "social", label: "Social", color: "bg-purple-100 text-purple-800 border-purple-300", icon: "👥" },
  { value: "financial", label: "Financial", color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: "💰" },
  { value: "learning", label: "Learning", color: "bg-indigo-100 text-indigo-800 border-indigo-300", icon: "📚" },
  { value: "creative", label: "Creative", color: "bg-pink-100 text-pink-800 border-pink-300", icon: "🎨" },
  { value: "spiritual", label: "Spiritual", color: "bg-violet-100 text-violet-800 border-violet-300", icon: "🙏" },
]

export const impactLevels = [
  { value: 1, label: "Minimal Impact", description: "Barely noticeable effect" },
  { value: 2, label: "Low Impact", description: "Small but noticeable effect" },
  { value: 3, label: "Moderate Impact", description: "Clear effect on progress" },
  { value: 4, label: "High Impact", description: "Significant effect on goals" },
  { value: 5, label: "Major Impact", description: "Dramatic effect on progress" },
] as const

// Mock data for development
export const mockHabitSubmissions: HabitSubmission[] = [
  {
    id: "1",
    userId: "user1",
    habitName: "Morning Meditation",
    description: "Completed 20-minute meditation session",
    date: "2024-01-15",
    impact: "positive",
    category: "spiritual",
    impactDescription: "Helped me stay focused and calm throughout the day",
    goalRelation: "Directly supports my mental wellness goal",
    intensity: 4,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    habitName: "Social Media Scrolling",
    description: "Spent 2 hours mindlessly scrolling social media",
    date: "2024-01-14",
    impact: "negative",
    category: "distracting",
    impactDescription: "Wasted time that could have been spent on productive activities",
    goalRelation: "Hindered progress on my learning goals",
    intensity: 3,
    createdAt: "2024-01-14T20:00:00Z",
    updatedAt: "2024-01-14T20:00:00Z",
  },
  {
    id: "3",
    userId: "user1",
    habitName: "Reading Technical Books",
    description: "Read 30 pages of programming book",
    date: "2024-01-13",
    impact: "positive",
    category: "learning",
    impactDescription: "Gained new knowledge that I can apply to my projects",
    goalRelation: "Directly advances my career development goal",
    intensity: 4,
    createdAt: "2024-01-13T19:00:00Z",
    updatedAt: "2024-01-13T19:00:00Z",
  },
]

export function getCategoryInfo(category: HabitCategory) {
  return habitCategories.find((cat) => cat.value === category) || habitCategories[0]
}

export function getImpactLevelInfo(intensity: number) {
  return impactLevels.find((level) => level.value === intensity) || impactLevels[0]
}

export function calculateHabitStats(submissions: HabitSubmission[]) {
  const total = submissions.length
  const positive = submissions.filter((s) => s.impact === "positive").length
  const negative = submissions.filter((s) => s.impact === "negative").length

  const categoryStats = habitCategories.map((category) => ({
    ...category,
    count: submissions.filter((s) => s.category === category.value).length,
    positiveCount: submissions.filter((s) => s.category === category.value && s.impact === "positive").length,
    negativeCount: submissions.filter((s) => s.category === category.value && s.impact === "negative").length,
  }))

  const averageImpact = total > 0 ? submissions.reduce((sum, s) => sum + s.intensity, 0) / total : 0

  const recentTrend = submissions
    .slice(-7) // Last 7 submissions
    .reduce((sum, s) => sum + (s.impact === "positive" ? s.intensity : -s.intensity), 0)

  return {
    total,
    positive,
    negative,
    positivePercentage: total > 0 ? Math.round((positive / total) * 100) : 0,
    negativePercentage: total > 0 ? Math.round((negative / total) * 100) : 0,
    categoryStats,
    averageImpact: Math.round(averageImpact * 10) / 10,
    recentTrend,
  }
}
