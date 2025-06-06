import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-12 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-3 rounded-xl p-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Skeleton className="h-16 w-full" />
          </Card>
        ))}
      </div>

      <Card className="border-3 rounded-xl p-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Skeleton className="h-12 w-full" />
      </Card>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-3 rounded-xl p-6 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Skeleton className="h-32 w-full" />
          </Card>
        ))}
      </div>
    </div>
  )
}
