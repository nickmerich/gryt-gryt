"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MobilePageProps {
  children: ReactNode
  className?: string
  isLoading?: boolean
}

interface MobilePageSectionProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function MobilePage({ children, className, isLoading = false }: MobilePageProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-gray-50 p-4 pb-20", className)}>
      <div className="max-w-md mx-auto space-y-6">{children}</div>
    </div>
  )
}

export function MobilePageSection({ title, subtitle, children, className }: MobilePageSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {subtitle && <span className="text-sm text-gray-600">{subtitle}</span>}
      </div>
      {children}
    </div>
  )
}
