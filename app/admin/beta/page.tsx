"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BetaAdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          if (data.user && data.user.id === 1) {
            setUser(data.user)
          } else {
            router.push("/dashboard")
          }
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-3 rounded-xl p-4">
              <Skeleton className="h-16 w-full" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-black">Beta Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-3 border-black rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-black text-black">0</div>
            <div className="text-sm text-gray-600">Beta Users</div>
          </div>
        </Card>

        <Card className="border-3 border-black rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-black text-black">0</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </Card>

        <Card className="border-3 border-black rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-black text-black">0</div>
            <div className="text-sm text-gray-600">Feedback Items</div>
          </div>
        </Card>
      </div>

      <Card className="border-3 border-black rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <p className="text-gray-600">Beta admin functionality will be available here.</p>
      </Card>
    </div>
  )
}
