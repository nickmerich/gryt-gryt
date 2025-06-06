"use client"

import type React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="flex items-center space-x-2 font-bold text-lg">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-[0_0_0_2px_#ffffff,_2px_2px_0px_2px_#000000] hover:shadow-[0_0_0_2px_#ffffff,_4px_4px_0px_2px_#000000] transition-all duration-200">
          <span className="text-white font-black text-sm">G</span>
        </div>
        <span className="text-green-600 font-black tracking-tight">GRYT</span>
      </Link>
    </nav>
  )
}
