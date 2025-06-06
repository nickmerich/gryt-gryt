import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContractLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 p-4 sm:p-0">
      <div className="space-y-6 sm:space-y-8 pb-8">
        {/* Header Skeleton */}
        <Card className="border-3 sm:border-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 bg-white/90 border-black">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-6 w-full mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </Card>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className="border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden bg-white/95 border-black">
              <div className="bg-gradient-to-r from-green-500 via-green-600 to-black p-4 sm:p-6">
                <Skeleton className="h-6 w-48 bg-white/20" />
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden bg-white/95 border-black">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <Skeleton className="h-6 w-32 bg-white/20" />
              </div>
              <div className="p-4 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
