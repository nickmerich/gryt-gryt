"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mobileTester, type MobileTestResult } from "@/lib/mobile-testing-utils"
import { Activity } from "lucide-react"

export function RealTimeMobileTest() {
  const [testResults, setTestResults] = useState<MobileTestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [deviceMetrics, setDeviceMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    networkSpeed: "unknown",
    batteryLevel: null as number | null,
  })

  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationId = useRef<number>()

  // Monitor FPS
  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()

      if (currentTime >= lastTime.current + 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
        setDeviceMetrics((prev) => ({ ...prev, fps }))
        frameCount.current = 0
        lastTime.current = currentTime
      }

      animationId.current = requestAnimationFrame(measureFPS)
    }

    measureFPS()

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  // Monitor other metrics
  useEffect(() => {
    const updateMetrics = () => {
      // Memory usage
      if ("memory" in performance) {
        const memory = (performance as any).memory
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        setDeviceMetrics((prev) => ({ ...prev, memoryUsage }))
      }

      // Network speed
      const connection = (navigator as any).connection
      if (connection) {
        setDeviceMetrics((prev) => ({ ...prev, networkSpeed: connection.effectiveType }))
      }

      // Battery level
      if ("getBattery" in navigator) {
        ;(navigator as any).getBattery().then((battery: any) => {
          setDeviceMetrics((prev) => ({ ...prev, batteryLevel: Math.round(battery.level * 100) }))
        })
      }
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 2000)

    return () => clearInterval(interval)
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    try {
      const results = await mobileTester.runAllTests()
      setTestResults(results)
      setOverallScore(mobileTester.getOverallScore())
    } catch (error) {
      console.error("Error running mobile tests:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800"
      case "fail":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const categories = ["Viewport", "Touch Targets", "Performance", "Accessibility", "Responsiveness", "Network"]

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time Device Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{deviceMetrics.fps}</div>
              <div className="text-sm text-gray-600">FPS</div>
              <div className={`text-xs ${deviceMetrics.fps >= 30 ? "text-green-600" : "text-red-600"}`}>
                {deviceMetrics.fps >= 30 ? "Good" : "Poor"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deviceMetrics.memoryUsage}</div>
              <div className="text-sm text-gray-600">MB Memory</div>
              <div className={`text-xs ${deviceMetrics.memoryUsage < 100 ? "text-green-600" : "text-red-600"}`}>
                {deviceMetrics.memoryUsage < 100 ? "Good" : "High"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deviceMetrics.networkSpeed}</div>
              <div className="text-sm text-gray-600">Network</div>
              <div className={`text-xs ${deviceMetrics.networkSpeed === "4g" ? "text-green-600" : "text-yellow-600"}`}>
                {deviceMetrics.networkSpeed === "4g" ? "Fast" : "Slow"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deviceMetrics.batteryLevel || "N/A"}</div>
              <div className="text-sm text-gray-600">Battery %</div>
              <div
                className={`text-xs ${
                  deviceMetrics.batteryLevel && deviceMetrics.batteryLevel > 20 ? "text-green-600" : "text-red-600"
                }`}
              >
                {deviceMetrics.batteryLevel && deviceMetrics.batteryLevel > 20 ? "Good" : "Low"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Controls and Score */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Compatibility Test</CardTitle>
          </CardHeader>
          <CardContent>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="w-full bg-black text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50"
            >
              {isRunning ? "Running Tests..." : "Run Mobile Tests"}
            </button>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}/100</div>
                <Progress value={overallScore} className="mt-2" />
                <div className="text-sm text-gray-600 mt-2">
                  {overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : "Needs Improvement"}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Test Results by Category */}
      {testResults.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryResults = mobileTester.getResultsByCategory(category)
            if (categoryResults.length === 0) return null

            const passed = categoryResults.filter((r) => r.status === "pass").length
            const total = categoryResults.length

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <div className="text-sm text-gray-600">
                    {passed}/{total} tests passed
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categoryResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{result.test}</div>
                          <div className="text-xs text-gray-600">{result.message}</div>
                        </div>
                        <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
