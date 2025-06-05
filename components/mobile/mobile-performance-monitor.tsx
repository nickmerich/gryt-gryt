"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  detectDeviceCapabilities,
  applyMobileOptimizations,
  monitorPerformance,
  optimizeTouchInteractions,
} from "@/lib/mobile-performance"

interface MobilePerformanceMonitorProps {
  enableFPSMonitoring?: boolean
  fpsThreshold?: number
  enableTouchOptimizations?: boolean
  children?: React.ReactNode
  onCapabilitiesDetected?: (capabilities: any) => void
}

export default function MobilePerformanceMonitor({
  enableFPSMonitoring = true,
  fpsThreshold = 30,
  enableTouchOptimizations = true,
  children,
  onCapabilitiesDetected,
}: MobilePerformanceMonitorProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [capabilities, setCapabilities] = useState<any>(null)

  useEffect(() => {
    // Initialize performance optimizations
    const initPerformance = async () => {
      try {
        // Detect device capabilities
        const deviceCapabilities = await detectDeviceCapabilities()

        // Store capabilities globally for other components to use
        if (typeof window !== "undefined") {
          window.__deviceCapabilities = deviceCapabilities
        }

        // Apply optimizations based on capabilities
        applyMobileOptimizations(deviceCapabilities)

        // Enable touch optimizations if requested
        if (enableTouchOptimizations) {
          optimizeTouchInteractions()
        }

        // Store capabilities in state
        setCapabilities(deviceCapabilities)

        // Notify parent component if callback provided
        if (onCapabilitiesDetected) {
          onCapabilitiesDetected(deviceCapabilities)
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error initializing performance monitor:", error)
      }
    }

    initPerformance()
  }, [enableTouchOptimizations, onCapabilitiesDetected])

  // Start FPS monitoring if enabled
  useEffect(() => {
    if (!isInitialized || !enableFPSMonitoring) return

    const stopMonitoring = monitorPerformance(fpsThreshold)

    return () => {
      stopMonitoring()
    }
  }, [isInitialized, enableFPSMonitoring, fpsThreshold])

  // Add performance monitoring classes to body
  useEffect(() => {
    if (!isInitialized) return

    document.body.classList.add("performance-monitoring-active")

    return () => {
      document.body.classList.remove("performance-monitoring-active")
    }
  }, [isInitialized])

  return children || null
}
