import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link href="/dashboard" className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gryt-green border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1),6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <span className="text-sm font-black text-white">G</span>
        </div>
        <span className="text-lg font-black text-black">GRYT</span>
      </Link>
    </div>
  )
}
