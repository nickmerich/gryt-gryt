"use client"

import { useState, useEffect } from "react"

interface PerformanceMetrics {
  fps: number
  memory: number
  loadTime: number
  batteryLevel: number
}

export function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    batteryLevel: 100,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

        setMetrics((prev) => ({
          ...prev,
          fps,
          memory: (performance as any).memory?.usedJSHeapSize
            ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
            : 0,
          loadTime: Math.round(performance.now()),
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Get battery info if available
    if ("getBattery" in navigator) {
      ;(navigator as any)
        .getBattery()
        .then((battery: any) => {
          setMetrics((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
          }))
        })
        .catch(() => {
          // Battery API not available
        })
    }

    measureFPS()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-4 bg-black text-white p-2 rounded-full text-xs font-bold z-50"
      >
        📊
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 bg-black text-white p-3 rounded-xl text-xs font-mono z-50 min-w-[120px]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Performance</span>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
      <div className="space-y-1">
        <div>FPS: {metrics.fps}</div>
        <div>Memory: {metrics.memory}MB</div>
        <div>Load: {metrics.loadTime}ms</div>
        <div>Battery: {metrics.batteryLevel}%</div>
      </div>
    </div>
  )
}

export default MobilePerformanceMonitor
