"use client"

import { useState, useEffect } from "react"
import { MobileDeviceSimulator } from "@/components/testing/mobile-device-simulator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Smartphone, Eye, Zap, Users } from "lucide-react"

interface TestResult {
  category: string
  test: string
  status: "pass" | "fail" | "warning"
  message: string
  device?: string
}

export default function MobileTestingPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<any>({})

  useEffect(() => {
    // Gather device information
    const info = {
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      touchSupport: "ontouchstart" in window,
      orientation: window.screen.orientation?.type || "unknown",
      connection: (navigator as any).connection?.effectiveType || "unknown",
      memory: (navigator as any).deviceMemory || "unknown",
      cores: navigator.hardwareConcurrency || "unknown",
    }
    setDeviceInfo(info)
  }, [])

  const runMobileTests = async () => {
    setIsRunning(true)
    const results: TestResult[] = []

    // Test 1: Viewport Configuration
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    results.push({
      category: "Viewport",
      test: "Viewport Meta Tag",
      status: viewportMeta ? "pass" : "fail",
      message: viewportMeta
        ? "Viewport meta tag is properly configured"
        : "Missing viewport meta tag - may cause scaling issues",
    })

    // Test 2: Touch Target Sizes
    await new Promise((resolve) => setTimeout(resolve, 500))
    const buttons = document.querySelectorAll("button, a, [role='button']")
    let smallTargets = 0
    buttons.forEach((button) => {
      const rect = button.getBoundingClientRect()
      if (rect.width < 44 || rect.height < 44) {
        smallTargets++
      }
    })

    results.push({
      category: "Touch Targets",
      test: "Minimum Size (44px)",
      status: smallTargets === 0 ? "pass" : smallTargets < 5 ? "warning" : "fail",
      message: `${smallTargets} touch targets are smaller than 44px`,
    })

    // Test 3: Text Readability
    await new Promise((resolve) => setTimeout(resolve, 500))
    const textElements = document.querySelectorAll("p, span, div, h1, h2, h3, h4, h5, h6")
    let smallText = 0
    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element)
      const fontSize = Number.parseFloat(styles.fontSize)
      if (fontSize < 14) {
        smallText++
      }
    })

    results.push({
      category: "Typography",
      test: "Text Readability",
      status: smallText < 10 ? "pass" : smallText < 20 ? "warning" : "fail",
      message: `${smallText} elements have text smaller than 14px`,
    })

    // Test 4: Horizontal Scrolling
    await new Promise((resolve) => setTimeout(resolve, 500))
    const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth
    results.push({
      category: "Layout",
      test: "Horizontal Scrolling",
      status: hasHorizontalScroll ? "fail" : "pass",
      message: hasHorizontalScroll
        ? "Page has horizontal scrolling - content may be too wide"
        : "No horizontal scrolling detected",
    })

    // Test 5: Performance
    await new Promise((resolve) => setTimeout(resolve, 500))
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart
    results.push({
      category: "Performance",
      test: "Page Load Time",
      status: loadTime < 3000 ? "pass" : loadTime < 5000 ? "warning" : "fail",
      message: `Page loaded in ${Math.round(loadTime)}ms`,
    })

    // Test 6: Touch Events
    await new Promise((resolve) => setTimeout(resolve, 500))
    const hasTouchEvents = "ontouchstart" in window
    results.push({
      category: "Touch Support",
      test: "Touch Events",
      status: hasTouchEvents ? "pass" : "warning",
      message: hasTouchEvents ? "Touch events are supported" : "Touch events not detected",
    })

    // Test 7: Safe Area Support
    await new Promise((resolve) => setTimeout(resolve, 500))
    const hasSafeArea = CSS.supports("padding-top", "env(safe-area-inset-top)")
    results.push({
      category: "Safe Areas",
      test: "Safe Area Insets",
      status: hasSafeArea ? "pass" : "warning",
      message: hasSafeArea ? "Safe area insets are supported" : "Safe area insets not supported",
    })

    // Test 8: Responsive Images
    await new Promise((resolve) => setTimeout(resolve, 500))
    const images = document.querySelectorAll("img")
    let responsiveImages = 0
    images.forEach((img) => {
      if (img.srcset || img.sizes) {
        responsiveImages++
      }
    })

    results.push({
      category: "Images",
      test: "Responsive Images",
      status: responsiveImages > images.length * 0.5 ? "pass" : "warning",
      message: `${responsiveImages}/${images.length} images are responsive`,
    })

    setTestResults(results)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: "bg-green-100 text-green-800",
      fail: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
    }
    return variants[status as keyof typeof variants] || variants.warning
  }

  const passedTests = testResults.filter((r) => r.status === "pass").length
  const failedTests = testResults.filter((r) => r.status === "fail").length
  const warningTests = testResults.filter((r) => r.status === "warning").length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Mobile Testing Suite</h1>
        <p className="text-gray-600">Comprehensive testing for mobile devices and responsive design</p>
      </div>

      {/* Device Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Current Device Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Screen:</strong> {deviceInfo.screenWidth}×{deviceInfo.screenHeight}
            </div>
            <div>
              <strong>Viewport:</strong> {deviceInfo.viewportWidth}×{deviceInfo.viewportHeight}
            </div>
            <div>
              <strong>Pixel Ratio:</strong> {deviceInfo.pixelRatio}
            </div>
            <div>
              <strong>Touch:</strong> {deviceInfo.touchSupport ? "Yes" : "No"}
            </div>
            <div>
              <strong>Orientation:</strong> {deviceInfo.orientation}
            </div>
            <div>
              <strong>Connection:</strong> {deviceInfo.connection}
            </div>
            <div>
              <strong>Memory:</strong> {deviceInfo.memory}GB
            </div>
            <div>
              <strong>CPU Cores:</strong> {deviceInfo.cores}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Compatibility Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={runMobileTests} disabled={isRunning} className="w-full md:w-auto">
              {isRunning ? "Running Tests..." : "Run Mobile Tests"}
            </Button>

            {testResults.length > 0 && (
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{passedTests} Passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>{warningTests} Warnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span>{failedTests} Failed</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="font-medium">{result.test}</div>
                      <div className="text-sm text-gray-600">{result.message}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusBadge(result.status)}>
                      {result.category}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadge(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Device Simulator */}
      <MobileDeviceSimulator />

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Mobile Performance Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visual Performance
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Use optimized images with proper sizing</li>
                  <li>• Implement lazy loading for images</li>
                  <li>• Minimize layout shifts (CLS)</li>
                  <li>• Use CSS transforms for animations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Experience
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Ensure touch targets are at least 44px</li>
                  <li>• Provide haptic feedback for interactions</li>
                  <li>• Optimize for one-handed use</li>
                  <li>• Support both portrait and landscape</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
