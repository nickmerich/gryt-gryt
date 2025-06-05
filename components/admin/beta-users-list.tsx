import { sql } from "@/lib/database"

export default async function BetaUsersList() {
  // Get beta users with activity data
  const betaUsers = await sql`
    SELECT 
      b.invite_code,
      b.email,
      b.name,
      b.registered_at,
      b.last_active_at,
      u.username,
      u.level,
      u.total_gp,
      (SELECT COUNT(*) FROM habits WHERE user_id = u.id) as habit_count,
      (SELECT COUNT(*) FROM habit_logs WHERE user_id = u.id) as completion_count
    FROM beta_users b
    LEFT JOIN users u ON b.user_id = u.id
    ORDER BY b.registered_at DESC
  `

  return (
    <div className="bg-white border-4 border-black overflow-hidden shadow-brutal">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Registered</th>
              <th className="px-4 py-2 text-left">Last Active</th>
              <th className="px-4 py-2 text-left">Level</th>
              <th className="px-4 py-2 text-left">Habits</th>
              <th className="px-4 py-2 text-left">Completions</th>
            </tr>
          </thead>
          <tbody>
            {betaUsers.length > 0 ? (
              betaUsers.map((user: any, index: number) => (
                <tr key={user.invite_code} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <div>
                      <div className="font-bold text-black">{user.username || "Not registered"}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {user.registered_at ? new Date(user.registered_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {user.last_active_at ? new Date(user.last_active_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">{user.level || "—"}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{user.habit_count || 0}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{user.completion_count || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No beta users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
