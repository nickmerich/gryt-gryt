"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import components to avoid SSR issues
const MobileHeader = dynamic(() => import("@/components/dashboard/mobile-header"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b-4 border-black" />,
})

const MobileBottomNav = dynamic(() => import("@/components/dashboard/mobile-bottom-nav"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-t-4 border-black" />,
})

const MobilePerformanceMonitor = dynamic(() => import("@/components/mobile/mobile-performance-monitor"), {
  ssr: false,
})

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
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        document.documentElement.classList.toggle("is-mobile", mobile)
      }
    }

    checkMobile()

    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile)
    }

    setIsLoaded(true)

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile)
      }
    }
  }, [])

  // Skip mobile layout for certain pages
  const skipMobileLayout = ["/login", "/signup", "/onboarding"].some((path) => pathname.startsWith(path))

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-50" />
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
