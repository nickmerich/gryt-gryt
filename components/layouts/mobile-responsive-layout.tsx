"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MobileHeader from "@/components/dashboard/mobile-header"
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav"
import { MobilePerformanceMonitor } from "@/components/mobile/mobile-performance-monitor"
import { mobilePerformanceManager } from "@/lib/mobile-performance"

interface MobileResponsiveLayoutProps {
  children: React.ReactNode
}

export default function MobileResponsiveLayout({ children }: MobileResponsiveLayoutProps) {
  const pathname = usePathname()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      document.documentElement.classList.toggle("is-mobile", mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Initialize mobile performance optimizations
    if (typeof window !== "undefined") {
      mobilePerformanceManager.optimizeForDevice()
      mobilePerformanceManager.preloadCriticalResources()
    }

    setIsLoaded(true)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Skip mobile layout for certain pages
  const skipMobileLayout = ["/login", "/signup", "/onboarding"].some((path) => pathname.startsWith(path))

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-50"></div>
  }

  if (skipMobileLayout) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MobileHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <MobileBottomNav />
      {process.env.NODE_ENV === "development" && <MobilePerformanceMonitor />}
    </div>
  )
}
