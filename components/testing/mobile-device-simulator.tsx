"use client"

import { useState } from "react"
import { Smartphone, Tablet, Monitor, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DevicePreset {
  name: string
  width: number
  height: number
  pixelRatio: number
  userAgent: string
  category: "phone" | "tablet" | "desktop"
}

const devicePresets: DevicePreset[] = [
  // Phones
  {
    name: "iPhone 14 Pro",
    width: 393,
    height: 852,
    pixelRatio: 3,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    category: "phone",
  },
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    pixelRatio: 2,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
    category: "phone",
  },
  {
    name: "Samsung Galaxy S23",
    width: 360,
    height: 780,
    pixelRatio: 3,
    userAgent: "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36",
    category: "phone",
  },
  {
    name: "Google Pixel 7",
    width: 412,
    height: 915,
    pixelRatio: 2.625,
    userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36",
    category: "phone",
  },
  // Tablets
  {
    name: "iPad Pro 12.9",
    width: 1024,
    height: 1366,
    pixelRatio: 2,
    userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    category: "tablet",
  },
  {
    name: "iPad Mini",
    width: 768,
    height: 1024,
    pixelRatio: 2,
    userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    category: "tablet",
  },
  {
    name: "Samsung Galaxy Tab",
    width: 800,
    height: 1280,
    pixelRatio: 2,
    userAgent: "Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36",
    category: "tablet",
  },
  // Desktop
  {
    name: "Desktop 1920x1080",
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    category: "desktop",
  },
]

export function MobileDeviceSimulator() {
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(devicePresets[0])
  const [isLandscape, setIsLandscape] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ device: string; issues: string[] }>>([])
  const [isRunningTests, setIsRunningTests] = useState(false)

  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height

  const runDeviceTests = async (device: DevicePreset) => {
    const issues: string[] = []

    // Simulate device testing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check touch target sizes
    if (device.category === "phone") {
      const buttons = document.querySelectorAll("button")
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect()
        if (rect.width < 44 || rect.height < 44) {
          issues.push(`Touch target too small: ${rect.width}x${rect.height}px`)
        }
      })
    }

    // Check text readability
    if (device.width < 400) {
      const smallText = document.querySelectorAll('[class*="text-xs"], [class*="text-sm"]')
      if (smallText.length > 10) {
        issues.push("Too much small text for narrow screens")
      }
    }

    // Check horizontal scrolling
    const body = document.body
    if (body.scrollWidth > device.width) {
      issues.push("Horizontal scrolling detected")
    }

    // Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (!viewportMeta) {
      issues.push("Missing viewport meta tag")
    }

    return issues
  }

  const runAllTests = async () => {
    setIsRunningTests(true)
    const results: Array<{ device: string; issues: string[] }> = []

    for (const device of devicePresets) {
      const issues = await runDeviceTests(device)
      results.push({ device: device.name, issues })
    }

    setTestResults(results)
    setIsRunningTests(false)
  }

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case "phone":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      default:
        return <Smartphone className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Device Testing Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Device Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Select Device</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {devicePresets.map((device) => (
                  <Button
                    key={device.name}
                    variant={selectedDevice.name === device.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDevice(device)}
                    className="justify-start"
                  >
                    {getDeviceIcon(device.category)}
                    <span className="ml-2 truncate">{device.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Orientation Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLandscape(!isLandscape)}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {isLandscape ? "Portrait" : "Landscape"}
              </Button>
              <span className="text-sm text-gray-600">
                {currentWidth} × {currentHeight}px (DPR: {selectedDevice.pixelRatio})
              </span>
            </div>

            {/* Test Controls */}
            <div className="flex gap-2">
              <Button onClick={runAllTests} disabled={isRunningTests}>
                {isRunningTests ? "Running Tests..." : "Run All Device Tests"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Preview */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDevice.name} Preview {isLandscape ? "(Landscape)" : "(Portrait)"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-4 border-gray-800 rounded-3xl p-4 bg-gray-900 inline-block">
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
              style={{
                width: `${Math.min(currentWidth, 800)}px`,
                height: `${Math.min(currentHeight, 600)}px`,
                transform: currentWidth > 800 ? `scale(${800 / currentWidth})` : "none",
                transformOrigin: "top left",
              }}
            >
              <iframe src="/dashboard" className="w-full h-full border-0" title={`${selectedDevice.name} Preview`} />
            </div>
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
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium flex items-center gap-2">
                    {getDeviceIcon(devicePresets.find((d) => d.name === result.device)?.category || "phone")}
                    {result.device}
                    <span
                      className={`ml-auto text-sm px-2 py-1 rounded ${
                        result.issues.length === 0
                          ? "bg-green-100 text-green-800"
                          : result.issues.length < 3
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.issues.length === 0 ? "✓ Passed" : `${result.issues.length} Issues`}
                    </span>
                  </h4>
                  {result.issues.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {result.issues.map((issue, issueIndex) => (
                        <li key={issueIndex} className="text-sm text-red-600 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
