/**
 * Mobile Performance Utilities
 * Optimizes performance for mobile devices with various capabilities
 */

export interface MobilePerformanceConfig {
  enableLazyLoading: boolean
  enableImageOptimization: boolean
  enableCodeSplitting: boolean
  enableTouchOptimizations: boolean
  lowEndThreshold: {
    memory: number // in GB
    cores: number
    connectionSpeed: string[]
  }
  animationSettings: {
    reducedByDefault: boolean
    enableOnHighEnd: boolean
    complexAnimationThreshold: number // in fps
  }
}

export const DEFAULT_MOBILE_CONFIG: MobilePerformanceConfig = {
  enableLazyLoading: true,
  enableImageOptimization: true,
  enableCodeSplitting: true,
  enableTouchOptimizations: true,
  lowEndThreshold: {
    memory: 2, // 2GB or less is considered low-end
    cores: 4, // 4 cores or less is considered low-end
    connectionSpeed: ["slow-2g", "2g", "3g"],
  },
  animationSettings: {
    reducedByDefault: true,
    enableOnHighEnd: true,
    complexAnimationThreshold: 45, // fps
  },
}

export interface DeviceCapabilities {
  memory: number
  cores: number
  connection: string
  isLowEnd: boolean
  isMobile: boolean
  supportsWebP: boolean
  supportsAvif: boolean
  devicePixelRatio: number
  screenWidth: number
  screenHeight: number
  orientation: "portrait" | "landscape"
  touchPoints: number
  batteryLevel?: number
  batteryCharging?: boolean
}

/**
 * Detects device capabilities for performance optimization
 */
export async function detectDeviceCapabilities(): Promise<DeviceCapabilities> {
  if (typeof window === "undefined") {
    // Default values for SSR
    return {
      memory: 4,
      cores: 4,
      connection: "unknown",
      isLowEnd: false,
      isMobile: false,
      supportsWebP: true,
      supportsAvif: false,
      devicePixelRatio: 1,
      screenWidth: 1920,
      screenHeight: 1080,
      orientation: "landscape",
      touchPoints: 0,
    }
  }

  // Memory detection
  const memory = (navigator as any).deviceMemory || 4

  // CPU cores detection
  const cores = navigator.hardwareConcurrency || 4

  // Network connection detection
  const connection = (navigator as any).connection
  const connectionType = connection?.effectiveType || "unknown"

  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Image format support detection
  const supportsWebP = await checkImageSupport("webp")
  const supportsAvif = await checkImageSupport("avif")

  // Screen properties
  const devicePixelRatio = window.devicePixelRatio || 1
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const orientation = screenHeight > screenWidth ? "portrait" : "landscape"

  // Touch capabilities
  const touchPoints = navigator.maxTouchPoints || 0

  // Battery status (if available)
  let batteryLevel: number | undefined
  let batteryCharging: boolean | undefined

  try {
    if ("getBattery" in navigator) {
      const battery = await (navigator as any).getBattery()
      batteryLevel = battery.level
      batteryCharging = battery.charging
    }
  } catch (e) {
    console.log("Battery status not available")
  }

  // Low-end device classification
  const isLowEnd =
    memory <= DEFAULT_MOBILE_CONFIG.lowEndThreshold.memory ||
    cores <= DEFAULT_MOBILE_CONFIG.lowEndThreshold.cores ||
    DEFAULT_MOBILE_CONFIG.lowEndThreshold.connectionSpeed.includes(connectionType)

  return {
    memory,
    cores,
    connection: connectionType,
    isLowEnd,
    isMobile,
    supportsWebP,
    supportsAvif,
    devicePixelRatio,
    screenWidth,
    screenHeight,
    orientation,
    touchPoints,
    batteryLevel,
    batteryCharging,
  }
}

/**
 * Checks if the browser supports a specific image format
 */
function checkImageSupport(format: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = `data:image/${format};base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA`
  })
}

/**
 * Applies performance optimizations based on device capabilities
 */
export function applyMobileOptimizations(
  capabilities: DeviceCapabilities,
  config: MobilePerformanceConfig = DEFAULT_MOBILE_CONFIG,
): void {
  if (typeof document === "undefined") return

  // Add capability classes to document
  document.documentElement.classList.toggle("mobile-device", capabilities.isMobile)
  document.documentElement.classList.toggle("low-end-device", capabilities.isLowEnd)
  document.documentElement.classList.toggle("high-dpi", capabilities.devicePixelRatio > 1)
  document.documentElement.classList.toggle("supports-webp", capabilities.supportsWebP)
  document.documentElement.classList.toggle("supports-avif", capabilities.supportsAvif)
  document.documentElement.classList.toggle("touch-device", capabilities.touchPoints > 0)
  document.documentElement.classList.toggle("portrait", capabilities.orientation === "portrait")
  document.documentElement.classList.toggle("landscape", capabilities.orientation === "landscape")
  document.documentElement.classList.toggle(
    "slow-connection",
    ["slow-2g", "2g", "3g"].includes(capabilities.connection),
  )

  // Set CSS variables for performance flags
  document.documentElement.style.setProperty("--device-pixel-ratio", capabilities.devicePixelRatio.toString())
  document.documentElement.style.setProperty("--screen-width", capabilities.screenWidth.toString())
  document.documentElement.style.setProperty("--screen-height", capabilities.screenHeight.toString())

  // Apply performance optimizations based on device capabilities
  if (capabilities.isLowEnd) {
    // Reduce animations and effects for low-end devices
    document.documentElement.style.setProperty("--enable-animations", "0")
    document.documentElement.style.setProperty("--enable-shadows", "0")
    document.documentElement.style.setProperty("--enable-transforms", "0")
    document.documentElement.style.setProperty("--enable-complex-effects", "0")
  } else if (config.animationSettings.enableOnHighEnd) {
    // Enable animations for high-end devices
    document.documentElement.style.setProperty("--enable-animations", "1")
    document.documentElement.style.setProperty("--enable-shadows", "1")
    document.documentElement.style.setProperty("--enable-transforms", "1")
    document.documentElement.style.setProperty("--enable-complex-effects", "1")
  }

  // Apply touch optimizations
  if (capabilities.touchPoints > 0 && config.enableTouchOptimizations) {
    document.documentElement.style.setProperty("--touch-target-size", "44px")
    document.documentElement.style.setProperty("--enable-touch-optimizations", "1")
  }

  // Apply battery optimizations
  if (capabilities.batteryLevel !== undefined && capabilities.batteryLevel < 0.2 && !capabilities.batteryCharging) {
    document.documentElement.classList.add("battery-saving")
    document.documentElement.style.setProperty("--enable-animations", "0")
    document.documentElement.style.setProperty("--enable-complex-effects", "0")
  }

  // Apply connection-based optimizations
  if (["slow-2g", "2g"].includes(capabilities.connection)) {
    document.documentElement.classList.add("data-saving")
  }
}

/**
 * Monitors FPS and applies optimizations if performance drops
 */
export function monitorPerformance(fpsThreshold = 30, sampleDuration = 1000): () => void {
  if (typeof window === "undefined") return () => {}

  let frameCount = 0
  let lastTime = performance.now()
  let animationFrameId: number
  let isMonitoring = true

  const checkFPS = () => {
    frameCount++
    const now = performance.now()
    const elapsed = now - lastTime

    if (elapsed >= sampleDuration) {
      const fps = Math.round((frameCount * 1000) / elapsed)

      if (fps < fpsThreshold) {
        // Performance is poor, apply optimizations
        document.documentElement.classList.add("performance-mode")
        document.documentElement.style.setProperty("--enable-animations", "0")
        document.documentElement.style.setProperty("--enable-complex-effects", "0")
      } else if (document.documentElement.classList.contains("performance-mode")) {
        // Performance has improved, remove optimizations if not a low-end device
        if (!document.documentElement.classList.contains("low-end-device")) {
          document.documentElement.classList.remove("performance-mode")
          document.documentElement.style.setProperty("--enable-animations", "1")
          document.documentElement.style.setProperty("--enable-complex-effects", "1")
        }
      }

      frameCount = 0
      lastTime = now
    }

    if (isMonitoring) {
      animationFrameId = requestAnimationFrame(checkFPS)
    }
  }

  animationFrameId = requestAnimationFrame(checkFPS)

  // Return cleanup function
  return () => {
    isMonitoring = false
    cancelAnimationFrame(animationFrameId)
  }
}

/**
 * Optimizes touch interactions for mobile devices
 */
export function optimizeTouchInteractions(): void {
  if (typeof document === "undefined") return

  // Add passive event listeners for common touch events to improve scrolling performance
  document.addEventListener("touchstart", () => {}, { passive: true })
  document.addEventListener("touchmove", () => {}, { passive: true })

  // Add touch feedback class
  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.target instanceof HTMLElement) {
        const element = e.target.closest("[data-touch-feedback]") as HTMLElement
        if (element) {
          element.classList.add("touch-active")
        }
      }
    },
    { passive: true },
  )

  document.addEventListener(
    "touchend",
    (e) => {
      if (e.target instanceof HTMLElement) {
        const element = e.target.closest("[data-touch-feedback]") as HTMLElement
        if (element) {
          element.classList.remove("touch-active")
        }
      }
    },
    { passive: true },
  )

  // Improve tap delay
  const meta = document.createElement("meta")
  meta.name = "viewport"
  meta.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
  document.head.appendChild(meta)
}

/**
 * Optimizes images for mobile devices
 */
export function getOptimizedImageSrc(src: string, width: number, height?: number, format?: string): string {
  if (!src) return src

  // Skip optimization for data URLs
  if (src.startsWith("data:")) return src

  const capabilities = window.__deviceCapabilities
  if (!capabilities) return src

  // Determine optimal format
  let imageFormat = format
  if (!imageFormat) {
    if (capabilities.supportsAvif) {
      imageFormat = "avif"
    } else if (capabilities.supportsWebP) {
      imageFormat = "webp"
    } else {
      imageFormat = "auto"
    }
  }

  // Adjust quality based on connection and device
  let quality = 80
  if (capabilities.isLowEnd || ["slow-2g", "2g"].includes(capabilities.connection)) {
    quality = 60
  } else if (capabilities.devicePixelRatio > 1) {
    quality = 75
  }

  // Calculate optimal dimensions
  const dpr = capabilities.devicePixelRatio || 1
  const optimalWidth = Math.round(width * dpr)
  const optimalHeight = height ? Math.round(height * dpr) : undefined

  // If using a CDN like Cloudinary or similar, construct optimized URL
  if (src.includes("cloudinary.com")) {
    const params = new URLSearchParams({
      f: imageFormat,
      q: quality.toString(),
      w: optimalWidth.toString(),
      ...(optimalHeight && { h: optimalHeight.toString() }),
    })
    return `${src}?${params.toString()}`
  }

  // For placeholder images
  if (src.includes("/placeholder.svg")) {
    return `${src}&format=${imageFormat}&quality=${quality}`
  }

  // For other images, add simple parameters
  const separator = src.includes("?") ? "&" : "?"
  return `${src}${separator}w=${optimalWidth}&format=${imageFormat}&q=${quality}`
}

// Declare global type for device capabilities
declare global {
  interface Window {
    __deviceCapabilities?: DeviceCapabilities
  }
}
