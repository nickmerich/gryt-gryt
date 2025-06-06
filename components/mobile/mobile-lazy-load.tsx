"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface MobileLazyLoadProps {
  children: ReactNode
  height?: number
  className?: string
  threshold?: number
  once?: boolean
  placeholder?: ReactNode
}

export function MobileLazyLoad({
  children,
  height = 200,
  className = "",
  threshold = 0.1,
  once = true,
  placeholder,
}: MobileLazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasLoaded(true)

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "50px",
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, once])

  const shouldRender = isVisible || hasLoaded

  return (
    <div
      ref={elementRef}
      className={`mobile-lazy-load ${className}`}
      style={{
        minHeight: shouldRender ? "auto" : height,
        contentVisibility: shouldRender ? "visible" : "auto",
        containIntrinsicSize: shouldRender ? "none" : `auto ${height}px`,
      }}
    >
      {shouldRender ? (
        <div className="animate-in fade-in duration-300">{children}</div>
      ) : (
        placeholder || (
          <div className="flex items-center justify-center bg-gryt-gray-50 rounded-lg animate-pulse" style={{ height }}>
            <div className="w-8 h-8 bg-gryt-gray-200 rounded-full animate-pulse" />
          </div>
        )
      )}
    </div>
  )
}

// Auto-apply lazy loading to images
export function MobileLazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  width: number
  height: number
}) {
  return (
    <MobileLazyLoad height={height} className={className}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="mobile-optimized-image"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        {...props}
      />
    </MobileLazyLoad>
  )
}
