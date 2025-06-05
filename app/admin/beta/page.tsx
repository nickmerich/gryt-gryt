import { getBetaMetrics } from "@/lib/beta-utils"
import { sql } from "@/lib/database"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import BetaUsersList from "@/components/admin/beta-users-list"
import BetaMetricsCard from "@/components/admin/beta-metrics-card"
import BetaFeedbackList from "@/components/admin/beta-feedback-list"

export default async function BetaAdminPage() {
  const user = await getCurrentUser()

  // Only allow admin users
  if (!user || user.id !== 1) {
    redirect("/dashboard")
  }

  const metrics = await getBetaMetrics()

  // Get recent feedback
  const recentFeedback = await sql`
    SELECT f.id, f.feedback_type, f.content, f.created_at, u.username
    FROM user_feedback f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
    LIMIT 10
  `

  // Get active habits
  const habitStats = await sql`
    SELECT 
      COUNT(*) as total_habits,
      COUNT(DISTINCT user_id) as users_with_habits,
      AVG(CAST((SELECT COUNT(*) FROM habit_logs WHERE habit_id = h.id) AS FLOAT)) as avg_completions_per_habit
    FROM habits h
  `

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-black">Beta Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BetaMetricsCard title="Users" value={metrics.registrations} total={metrics.totalInvites} label="registered" />

        <BetaMetricsCard
          title="Active Users"
          value={metrics.activeUsers}
          total={metrics.registrations}
          label="in last 7 days"
        />

        <BetaMetricsCard
          title="Habits"
          value={habitStats[0]?.total_habits || 0}
          total={habitStats[0]?.users_with_habits || 0}
          label="habits created"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Beta Users</h2>
          <BetaUsersList />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Recent Feedback</h2>
          <BetaFeedbackList feedback={recentFeedback} />
        </div>
      </div>
    </div>
  )
}
