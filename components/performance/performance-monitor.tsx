"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
  fps: number | null
}

interface PerformanceThresholds {
  fcp: number
  lcp: number
  cls: number
  fid: number
  ttfb: number
  fps: number
}

interface PerformanceMonitorProps {
  thresholds?: Partial<PerformanceThresholds>
  onThresholdExceeded?: (metric: string, value: number, threshold: number) => void
  enableFPSMonitoring?: boolean
}

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  fcp: 1500, // First Contentful Paint
  lcp: 2500, // Largest Contentful Paint
  cls: 0.1, // Cumulative Layout Shift
  fid: 100, // First Input Delay
  ttfb: 600, // Time to First Byte
  fps: 55, // Frames per second
}

export default function PerformanceMonitor({
  thresholds = {},
  onThresholdExceeded,
  enableFPSMonitoring = true,
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    fps: null,
  })

  const finalThresholds = { ...DEFAULT_THRESHOLDS, ...thresholds }

  useEffect(() => {
    let fpsFrameCount = 0
    let fpsStartTime = performance.now()
    let animationFrameId: number

    // FPS Monitoring
    const measureFPS = () => {
      fpsFrameCount++
      const currentTime = performance.now()

      if (currentTime - fpsStartTime >= 1000) {
        const fps = Math.round((fpsFrameCount * 1000) / (currentTime - fpsStartTime))

        setMetrics((prev) => ({ ...prev, fps }))

        if (fps < finalThresholds.fps) {
          onThresholdExceeded?.("fps", fps, finalThresholds.fps)
          // Automatically reduce performance load
          document.documentElement.style.setProperty("--enable-animations", "0")
          document.documentElement.classList.add("performance-mode")
        }

        fpsFrameCount = 0
        fpsStartTime = currentTime
      }

      if (enableFPSMonitoring) {
        animationFrameId = requestAnimationFrame(measureFPS)
      }
    }

    // Web Vitals Monitoring
    const observePerformance = () => {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            const fcp = entry.startTime
            setMetrics((prev) => ({ ...prev, fcp }))

            if (fcp > finalThresholds.fcp) {
              onThresholdExceeded?.("fcp", fcp, finalThresholds.fcp)
            }
          }
        }
      }).observe({ entryTypes: ["paint"] })

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime

        setMetrics((prev) => ({ ...prev, lcp }))

        if (lcp > finalThresholds.lcp) {
          onThresholdExceeded?.("lcp", lcp, finalThresholds.lcp)
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] })

      // Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }

        setMetrics((prev) => ({ ...prev, cls: clsValue }))

        if (clsValue > finalThresholds.cls) {
          onThresholdExceeded?.("cls", clsValue, finalThresholds.cls)
        }
      }).observe({ entryTypes: ["layout-shift"] })

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime
          setMetrics((prev) => ({ ...prev, fid }))

          if (fid > finalThresholds.fid) {
            onThresholdExceeded?.("fid", fid, finalThresholds.fid)
          }
        }
      }).observe({ entryTypes: ["first-input"] })

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
        setMetrics((prev) => ({ ...prev, ttfb }))

        if (ttfb > finalThresholds.ttfb) {
          onThresholdExceeded?.("ttfb", ttfb, finalThresholds.ttfb)
        }
      }
    }

    // Start monitoring
    observePerformance()
    if (enableFPSMonitoring) {
      measureFPS()
    }

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [onThresholdExceeded, enableFPSMonitoring])

  // Development mode: show metrics in console
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && metrics.fcp) {
      console.table(metrics)
    }
  }, [metrics])

  return null
}
