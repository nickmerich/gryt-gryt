export interface MobilePerformanceConfig {
  enableTouchOptimizations: boolean
  enableAnimations: boolean
  enableComplexShadows: boolean
  touchTargetSize: number
  devicePixelRatio: number
  batteryLevel?: number
  connectionType?: string
}

export class MobilePerformanceManager {
  private config: MobilePerformanceConfig
  private performanceObserver?: PerformanceObserver

  constructor() {
    // Only initialize if we're in the browser
    if (typeof window !== "undefined") {
      this.config = this.detectOptimalSettings()
      this.initPerformanceMonitoring()
    } else {
      // Server-side fallback
      this.config = {
        enableTouchOptimizations: false,
        enableAnimations: true,
        enableComplexShadows: true,
        touchTargetSize: 44,
        devicePixelRatio: 1,
      }
    }
  }

  private detectOptimalSettings(): MobilePerformanceConfig {
    // Only run in browser
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return {
        enableTouchOptimizations: false,
        enableAnimations: true,
        enableComplexShadows: true,
        touchTargetSize: 44,
        devicePixelRatio: 1,
      }
    }

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency <= 2
    const hasSlowConnection = this.getConnectionSpeed() === "slow"

    return {
      enableTouchOptimizations: isMobile,
      enableAnimations: !isLowEnd && !hasSlowConnection,
      enableComplexShadows: !isLowEnd,
      touchTargetSize: isMobile ? 48 : 44,
      devicePixelRatio: window.devicePixelRatio || 1,
    }
  }

  private getConnectionSpeed(): "fast" | "slow" | "unknown" {
    if (typeof navigator === "undefined") return "unknown"

    const connection = (navigator as any).connection
    if (!connection) return "unknown"

    if (connection.effectiveType === "4g" || connection.downlink > 10) {
      return "fast"
    }
    return "slow"
  }

  private initPerformanceMonitoring(): void {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return

    this.performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === "measure" && entry.duration > 16) {
          console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`)
        }
      })
    })

    this.performanceObserver.observe({ entryTypes: ["measure", "navigation"] })
  }

  public optimizeForDevice(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const root = document.documentElement

    // Set CSS custom properties based on device capabilities
    root.style.setProperty("--enable-touch-optimizations", this.config.enableTouchOptimizations ? "1" : "0")
    root.style.setProperty("--enable-animations", this.config.enableAnimations ? "1" : "0")
    root.style.setProperty("--enable-complex-effects", this.config.enableComplexShadows ? "1" : "0")
    root.style.setProperty("--touch-target-size", `${this.config.touchTargetSize}px`)
    root.style.setProperty("--device-pixel-ratio", this.config.devicePixelRatio.toString())

    // Apply performance classes
    if (!this.config.enableAnimations) {
      document.body.classList.add("performance-mode")
    }

    if (this.getConnectionSpeed() === "slow") {
      document.body.classList.add("data-saving")
    }

    // Monitor battery level if available
    this.monitorBattery()
  }

  private async monitorBattery(): Promise<void> {
    if (typeof navigator === "undefined" || !("getBattery" in navigator)) return

    try {
      const battery = await (navigator as any).getBattery()

      const updateBatteryMode = () => {
        if (typeof document === "undefined") return

        if (battery.level < 0.2 || !battery.charging) {
          document.body.classList.add("battery-saving")
        } else {
          document.body.classList.remove("battery-saving")
        }
      }

      battery.addEventListener("levelchange", updateBatteryMode)
      battery.addEventListener("chargingchange", updateBatteryMode)
      updateBatteryMode()
    } catch (error) {
      console.log("Battery API not available")
    }
  }

  public measurePerformance(name: string, fn: () => void): void {
    if (typeof performance === "undefined") {
      fn()
      return
    }

    performance.mark(`${name}-start`)
    fn()
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
  }

  public preloadCriticalResources(): void {
    if (typeof document === "undefined") return

    // Preload critical fonts
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "font"
    link.type = "font/woff2"
    link.crossOrigin = "anonymous"
    link.href = "/fonts/inter-var.woff2"
    document.head.appendChild(link)

    // Preload critical images
    const criticalImages = ["/images/gryt-logo.png"]

    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  public enableIntersectionObserver(): IntersectionObserver | null {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return null
    }

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    )
  }

  public destroy(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect()
    }
  }
}

// Create a function to get the manager instance safely
export function getMobilePerformanceManager(): MobilePerformanceManager {
  // Always return a valid instance, even on server
  return new MobilePerformanceManager()
}

// For backward compatibility - but don't use this directly
// as it might be null during initialization
let mobilePerformanceManager: MobilePerformanceManager | null = null

// Initialize only on client side
if (typeof window !== "undefined") {
  // Create immediately but don't run optimizations yet
  mobilePerformanceManager = new MobilePerformanceManager()

  // Wait for load to run optimizations
  window.addEventListener("load", () => {
    if (mobilePerformanceManager) {
      mobilePerformanceManager.optimizeForDevice()
      mobilePerformanceManager.preloadCriticalResources()
    }
  })
}

export { mobilePerformanceManager }
