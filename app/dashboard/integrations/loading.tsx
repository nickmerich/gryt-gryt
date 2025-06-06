import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function IntegrationsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden border-2 border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 mt-2" />
                  <Skeleton className="h-4 w-full mt-2" />
                </div>
                <div className="p-4 border-t">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </Card>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden border-2 border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 mt-2" />
                  <Skeleton className="h-4 w-full mt-2" />
                </div>
                <div className="p-4 border-t">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
