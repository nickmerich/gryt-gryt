export interface MobileTestResult {
  category: string
  test: string
  status: "pass" | "fail" | "warning"
  message: string
  value?: number
  threshold?: number
}

export class MobileTester {
  private results: MobileTestResult[] = []

  async runAllTests(): Promise<MobileTestResult[]> {
    this.results = []

    await this.testViewport()
    await this.testTouchTargets()
    await this.testPerformance()
    await this.testAccessibility()
    await this.testResponsiveness()
    await this.testNetworkOptimization()

    return this.results
  }

  private async testViewport(): Promise<void> {
    // Test viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    this.addResult({
      category: "Viewport",
      test: "Meta Tag Present",
      status: viewportMeta ? "pass" : "fail",
      message: viewportMeta ? "Viewport meta tag found" : "Missing viewport meta tag",
    })

    // Test viewport content
    if (viewportMeta) {
      const content = viewportMeta.getAttribute("content") || ""
      const hasWidth = content.includes("width=device-width")
      const hasInitialScale = content.includes("initial-scale=1")

      this.addResult({
        category: "Viewport",
        test: "Proper Configuration",
        status: hasWidth && hasInitialScale ? "pass" : "warning",
        message: `Width: ${hasWidth}, Initial Scale: ${hasInitialScale}`,
      })
    }
  }

  private async testTouchTargets(): Promise<void> {
    const interactiveElements = document.querySelectorAll(
      "button, a, input, select, textarea, [role='button'], [tabindex]",
    )

    let smallTargets = 0
    let totalTargets = 0

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        totalTargets++
        if (rect.width < 44 || rect.height < 44) {
          smallTargets++
        }
      }
    })

    const percentage = totalTargets > 0 ? (smallTargets / totalTargets) * 100 : 0

    this.addResult({
      category: "Touch Targets",
      test: "Minimum Size (44px)",
      status: percentage === 0 ? "pass" : percentage < 20 ? "warning" : "fail",
      message: `${smallTargets}/${totalTargets} targets are too small (${percentage.toFixed(1)}%)`,
      value: percentage,
      threshold: 20,
    })
  }

  private async testPerformance(): Promise<void> {
    // Test page load time
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart

      this.addResult({
        category: "Performance",
        test: "Page Load Time",
        status: loadTime < 3000 ? "pass" : loadTime < 5000 ? "warning" : "fail",
        message: `Page loaded in ${Math.round(loadTime)}ms`,
        value: loadTime,
        threshold: 3000,
      })

      // Test First Contentful Paint
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0]
      if (fcpEntry) {
        const fcp = fcpEntry.startTime

        this.addResult({
          category: "Performance",
          test: "First Contentful Paint",
          status: fcp < 1800 ? "pass" : fcp < 3000 ? "warning" : "fail",
          message: `FCP: ${Math.round(fcp)}ms`,
          value: fcp,
          threshold: 1800,
        })
      }
    }

    // Test memory usage
    if ("memory" in performance) {
      const memory = (performance as any).memory
      const memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB

      this.addResult({
        category: "Performance",
        test: "Memory Usage",
        status: memoryUsage < 50 ? "pass" : memoryUsage < 100 ? "warning" : "fail",
        message: `Using ${memoryUsage.toFixed(1)}MB of memory`,
        value: memoryUsage,
        threshold: 50,
      })
    }
  }

  private async testAccessibility(): Promise<void> {
    // Test for alt text on images
    const images = document.querySelectorAll("img")
    let imagesWithoutAlt = 0

    images.forEach((img) => {
      if (!img.alt && !img.getAttribute("aria-label")) {
        imagesWithoutAlt++
      }
    })

    this.addResult({
      category: "Accessibility",
      test: "Image Alt Text",
      status: imagesWithoutAlt === 0 ? "pass" : imagesWithoutAlt < 3 ? "warning" : "fail",
      message: `${imagesWithoutAlt}/${images.length} images missing alt text`,
    })

    // Test for proper heading hierarchy
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const hasH1 = document.querySelector("h1") !== null

    this.addResult({
      category: "Accessibility",
      test: "Heading Structure",
      status: hasH1 ? "pass" : "warning",
      message: hasH1 ? `Found ${headings.length} headings with proper H1` : "No H1 heading found",
    })

    // Test for focus indicators
    const focusableElements = document.querySelectorAll(
      "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])",
    )

    this.addResult({
      category: "Accessibility",
      test: "Focusable Elements",
      status: focusableElements.length > 0 ? "pass" : "warning",
      message: `Found ${focusableElements.length} focusable elements`,
    })
  }

  private async testResponsiveness(): Promise<void> {
    // Test for horizontal scrolling
    const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth

    this.addResult({
      category: "Responsiveness",
      test: "Horizontal Scrolling",
      status: hasHorizontalScroll ? "fail" : "pass",
      message: hasHorizontalScroll ? "Page has horizontal scrolling" : "No horizontal scrolling",
    })

    // Test for responsive images
    const images = document.querySelectorAll("img")
    let responsiveImages = 0

    images.forEach((img) => {
      if (img.srcset || img.sizes || img.style.maxWidth === "100%") {
        responsiveImages++
      }
    })

    const responsivePercentage = images.length > 0 ? (responsiveImages / images.length) * 100 : 100

    this.addResult({
      category: "Responsiveness",
      test: "Responsive Images",
      status: responsivePercentage > 80 ? "pass" : responsivePercentage > 50 ? "warning" : "fail",
      message: `${responsiveImages}/${images.length} images are responsive (${responsivePercentage.toFixed(1)}%)`,
      value: responsivePercentage,
      threshold: 80,
    })
  }

  private async testNetworkOptimization(): Promise<void> {
    // Test connection type
    const connection = (navigator as any).connection
    if (connection) {
      const effectiveType = connection.effectiveType
      const isSlowConnection = effectiveType === "slow-2g" || effectiveType === "2g"

      this.addResult({
        category: "Network",
        test: "Connection Type",
        status: isSlowConnection ? "warning" : "pass",
        message: `Connection: ${effectiveType}`,
      })

      // Test data saver
      const saveData = connection.saveData
      this.addResult({
        category: "Network",
        test: "Data Saver Mode",
        status: "pass",
        message: saveData ? "Data saver is enabled" : "Data saver not enabled",
      })
    }

    // Test for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]')
    const totalImages = document.querySelectorAll("img").length

    this.addResult({
      category: "Network",
      test: "Lazy Loading",
      status: lazyImages.length > totalImages * 0.5 ? "pass" : "warning",
      message: `${lazyImages.length}/${totalImages} images use lazy loading`,
    })
  }

  private addResult(result: MobileTestResult): void {
    this.results.push(result)
  }

  getResultsByCategory(category: string): MobileTestResult[] {
    return this.results.filter((result) => result.category === category)
  }

  getOverallScore(): number {
    const totalTests = this.results.length
    const passedTests = this.results.filter((result) => result.status === "pass").length
    const warningTests = this.results.filter((result) => result.status === "warning").length

    // Pass = 1 point, Warning = 0.5 points, Fail = 0 points
    const score = (passedTests + warningTests * 0.5) / totalTests
    return Math.round(score * 100)
  }
}

export const mobileTester = new MobileTester()
