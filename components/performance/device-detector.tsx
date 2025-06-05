"use client"

import { useEffect, useState } from "react"

interface DeviceCapabilities {
  memory: number
  cores: number
  connection: string
  isLowEnd: boolean
  isMobile: boolean
  supportsWebP: boolean
  supportsAvif: boolean
}

interface DeviceDetectorProps {
  onCapabilitiesDetected?: (capabilities: DeviceCapabilities) => void
  onLowEndDevice?: () => void
  onSlowNetwork?: () => void
}

export default function DeviceDetector({ onCapabilitiesDetected, onLowEndDevice, onSlowNetwork }: DeviceDetectorProps) {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null)

  useEffect(() => {
    const detectCapabilities = async (): Promise<DeviceCapabilities> => {
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

      // Low-end device classification
      const isLowEnd = memory <= 2 || cores <= 2 || connectionType === "slow-2g" || connectionType === "2g"

      return {
        memory,
        cores,
        connection: connectionType,
        isLowEnd,
        isMobile,
        supportsWebP,
        supportsAvif,
      }
    }

    const checkImageSupport = (format: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = `data:image/${format};base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA`
      })
    }

    detectCapabilities().then((caps) => {
      setCapabilities(caps)
      onCapabilitiesDetected?.(caps)

      // Apply performance optimizations based on capabilities
      if (caps.isLowEnd) {
        document.documentElement.classList.add("low-end-device")
        document.documentElement.style.setProperty("--enable-shadows", "0")
        document.documentElement.style.setProperty("--enable-transforms", "0")
        document.documentElement.style.setProperty("--enable-animations", "0")
        onLowEndDevice?.()
      }

      if (caps.connection === "slow-2g" || caps.connection === "2g") {
        document.documentElement.classList.add("slow-network")
        onSlowNetwork?.()
      }

      // Set image format preferences
      if (caps.supportsAvif) {
        document.documentElement.classList.add("supports-avif")
      } else if (caps.supportsWebP) {
        document.documentElement.classList.add("supports-webp")
      }

      // Mobile-specific optimizations
      if (caps.isMobile) {
        document.documentElement.classList.add("mobile-device")
        document.documentElement.style.setProperty("--mobile-optimization", "1")
      }
    })
  }, [onCapabilitiesDetected, onLowEndDevice, onSlowNetwork])

  return null // This component doesn't render anything
}
