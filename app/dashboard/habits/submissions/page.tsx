"use client"

import { Suspense } from "react"
import HabitSubmissionsDashboard from "@/components/habits/habit-submissions-dashboard"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-12 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-3 rounded-xl p-4">
            <Skeleton className="h-16 w-full" />
          </Card>
        ))}
      </div>

      <Card className="border-3 rounded-xl p-4">
        <Skeleton className="h-12 w-full" />
      </Card>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-3 rounded-xl p-6">
            <Skeleton className="h-32 w-full" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function HabitSubmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <HabitSubmissionsDashboard />
      </Suspense>
    </div>
  )
}
