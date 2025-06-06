"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { MobileOptimizedCard } from "@/components/ui/mobile-optimized-card"
import { MobileViewportFix } from "@/components/mobile/mobile-viewport-fix"
import { cn } from "@/lib/utils"

interface MobilePageProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  fullHeight?: boolean
  withPadding?: boolean
  withScroll?: boolean
  isLoading?: boolean
}

export function MobilePage({
  children,
  title,
  subtitle,
  className,
  fullHeight = false,
  withPadding = true,
  withScroll = true,
  isLoading = false,
}: MobilePageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <MobileViewportFix />
      <div
        className={cn(
          "w-full bg-gray-50",
          fullHeight && "mobile-full-height",
          withPadding && "p-4",
          withScroll && "overflow-auto mobile-smooth-scroll",
          className,
        )}
      >
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h1 className="text-2xl font-bold text-black">{title}</h1>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-gryt-green border-t-transparent rounded-full"></div>
          </div>
        ) : (
          mounted && children
        )}
      </div>
    </>
  )
}

export function MobilePageSection({
  children,
  title,
  subtitle,
  className,
  cardProps = {},
}: {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  cardProps?: React.ComponentProps<typeof MobileOptimizedCard>
}) {
  return (
    <div className={cn("mb-6", className)}>
      {(title || subtitle) && (
        <div className="mb-3 px-1">
          {title && <h2 className="text-lg font-bold text-black">{title}</h2>}
          {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <MobileOptimizedCard {...cardProps}>{children}</MobileOptimizedCard>
    </div>
  )
}
