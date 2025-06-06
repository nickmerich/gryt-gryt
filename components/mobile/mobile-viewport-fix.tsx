"use client"

import { useEffect } from "react"

export function MobileViewportFix() {
  useEffect(() => {
    // Fix for mobile viewport height issues
    const setAppHeight = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`)
    }

    // Set initial height
    setAppHeight()

    // Update on resize and orientation change
    window.addEventListener("resize", setAppHeight)
    window.addEventListener("orientationchange", setAppHeight)

    return () => {
      window.removeEventListener("resize", setAppHeight)
      window.removeEventListener("orientationchange", setAppHeight)
    }
  }, [])

  return null
}
