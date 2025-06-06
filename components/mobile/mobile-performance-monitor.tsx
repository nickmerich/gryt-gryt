"use client"

import { useState, useEffect } from "react"

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  loadTime: number
  networkType: string
  batteryLevel: number | null
}

export function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    networkType: "unknown",
    batteryLevel: null,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    // FPS monitoring
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setMetrics((prev) => ({ ...prev, fps }))
        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Memory monitoring
    const measureMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        setMetrics((prev) => ({ ...prev, memoryUsage }))
      }
    }

    // Network monitoring
    const measureNetwork = () => {
      const connection = (navigator as any).connection
      if (connection) {
        setMetrics((prev) => ({
          ...prev,
          networkType: connection.effectiveType || "unknown",
        }))
      }
    }

    // Battery monitoring
    const measureBattery = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          setMetrics((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
          }))
        } catch (error) {
          console.log("Battery API not available")
        }
      }
    }

    // Load time
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    if (navigation) {
      const loadTime = Math.round(navigation.loadEventEnd - navigation.loadEventStart)
      setMetrics((prev) => ({ ...prev, loadTime }))
    }

    // Start monitoring
    measureFPS()
    measureMemory()
    measureNetwork()
    measureBattery()

    // Update metrics periodically
    const interval = setInterval(() => {
      measureMemory()
      measureNetwork()
      measureBattery()
    }, 2000)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(interval)
    }
  }, [])

  // Show/hide based on debug mode or performance issues
  useEffect(() => {
    const shouldShow = process.env.NODE_ENV === "development" || metrics.fps < 30 || metrics.memoryUsage > 100

    setIsVisible(shouldShow)
  }, [metrics])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gryt-black text-gryt-white p-3 rounded-lg text-xs font-mono max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gryt-green">Performance</span>
        <button onClick={() => setIsVisible(false)} className="text-gryt-white hover:text-gryt-green">
          ×
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? "text-red-400" : "text-gryt-green"}>{metrics.fps}</span>
        </div>

        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={metrics.memoryUsage > 100 ? "text-red-400" : "text-gryt-green"}>
            {metrics.memoryUsage}MB
          </span>
        </div>

        <div className="flex justify-between">
          <span>Load:</span>
          <span className={metrics.loadTime > 3000 ? "text-red-400" : "text-gryt-green"}>{metrics.loadTime}ms</span>
        </div>

        <div className="flex justify-between">
          <span>Network:</span>
          <span className="text-gryt-green">{metrics.networkType}</span>
        </div>

        {metrics.batteryLevel !== null && (
          <div className="flex justify-between">
            <span>Battery:</span>
            <span className={metrics.batteryLevel < 20 ? "text-red-400" : "text-gryt-green"}>
              {metrics.batteryLevel}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
