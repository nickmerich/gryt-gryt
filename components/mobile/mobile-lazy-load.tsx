"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MobileLazyLoadProps {
  children: ReactNode
  className?: string
  placeholder?: ReactNode
  threshold?: number
  rootMargin?: string
  height?: number | string
  width?: number | string
  onVisible?: () => void
  fallbackInView?: boolean
}

export default function MobileLazyLoad({
  children,
  className,
  placeholder,
  threshold = 0.1,
  rootMargin = "200px 0px",
  height,
  width,
  onVisible,
  fallbackInView = false,
}: MobileLazyLoadProps) {
  const [isVisible, setIsVisible] = useState(fallbackInView)
  const [hasRendered, setHasRendered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip if SSR or already visible
    if (typeof window === "undefined" || isVisible) return

    const currentElement = containerRef.current
    if (!currentElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasRendered(true)

          if (onVisible) {
            onVisible()
          }

          // Disconnect after becoming visible
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(currentElement)

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [isVisible, threshold, rootMargin, onVisible])

  return (
    <div
      ref={containerRef}
      className={cn("mobile-lazy-load", className)}
      style={{
        height: !isVisible && height ? height : undefined,
        width: !isVisible && width ? width : undefined,
        minHeight: !isVisible && height ? height : undefined,
      }}
    >
      {isVisible ? children : placeholder || <div className="w-full h-full bg-gray-100 animate-pulse rounded-md" />}
    </div>
  )
}
