// Performance utility functions

export interface PerformanceBudget {
  maxBundleSize: number // in KB
  maxImageSize: number // in KB
  maxFCP: number // in ms
  maxLCP: number // in ms
  maxCLS: number
  maxFID: number // in ms
}

export const PERFORMANCE_BUDGETS: Record<string, PerformanceBudget> = {
  mobile: {
    maxBundleSize: 500,
    maxImageSize: 100,
    maxFCP: 1500,
    maxLCP: 2500,
    maxCLS: 0.1,
    maxFID: 100,
  },
  desktop: {
    maxBundleSize: 1000,
    maxImageSize: 300,
    maxFCP: 1000,
    maxLCP: 2000,
    maxCLS: 0.1,
    maxFID: 50,
  },
}

export function getDeviceType(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop"
  return window.innerWidth < 768 ? "mobile" : "desktop"
}

export function getCurrentBudget(): PerformanceBudget {
  return PERFORMANCE_BUDGETS[getDeviceType()]
}

export function measurePerformance() {
  if (typeof window === "undefined") return null

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

  return {
    ttfb: navigation.responseStart - navigation.requestStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
    loadComplete: navigation.loadEventEnd - navigation.navigationStart,
    firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime || 0,
    firstContentfulPaint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
  }
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function preloadCriticalResources() {
  // Preload critical fonts
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.href = "/fonts/inter-var.woff2"
  fontLink.as = "font"
  fontLink.type = "font/woff2"
  fontLink.crossOrigin = "anonymous"
  document.head.appendChild(fontLink)

  // Preload critical images
  const heroImage = new Image()
  heroImage.src = "/images/hero-background.webp"
}

export function enablePerformanceMode() {
  document.documentElement.classList.add("performance-mode")
  document.documentElement.style.setProperty("--enable-animations", "0")
  document.documentElement.style.setProperty("--enable-shadows", "0")
  document.documentElement.style.setProperty("--enable-transforms", "0")
}

export function disablePerformanceMode() {
  document.documentElement.classList.remove("performance-mode")
  document.documentElement.style.setProperty("--enable-animations", "1")
  document.documentElement.style.setProperty("--enable-shadows", "1")
  document.documentElement.style.setProperty("--enable-transforms", "1")
}
