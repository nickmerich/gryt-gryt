"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface MobileOptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  loading?: "lazy" | "eager"
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function MobileOptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  loading = "lazy",
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: MobileOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Detect if we're on a mobile device with limited bandwidth
  const shouldOptimize = useEffect(() => {
    const connection = (navigator as any).connection
    const isSlowConnection =
      connection &&
      (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g" || connection.effectiveType === "3g")

    if (isSlowConnection) {
      // Further reduce quality for slow connections
      quality = Math.min(quality, 50)
    }
  }, [])

  // Generate responsive image sizes based on device
  const sizes = `
    (max-width: 640px) ${Math.min(width, 640)}px,
    (max-width: 768px) ${Math.min(width, 768)}px,
    (max-width: 1024px) ${Math.min(width, 1024)}px,
    ${width}px
  `

  const handleLoad = () => {
    setIsLoaded(true)
    if (imgRef.current) {
      imgRef.current.classList.add("animate-in")
    }
  }

  const handleError = () => {
    setHasError(true)
    console.warn(`Failed to load image: ${src}`)
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gryt-gray-100 border-2 border-gryt-black rounded-lg ${className}`}
        style={{ width, height }}
      >
        <span className="text-gryt-gray-500 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imgRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          mobile-optimized-image
          transition-opacity duration-300
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${priority ? "critical-performance" : ""}
        `}
        style={{
          willChange: isLoaded ? "auto" : "opacity",
          contentVisibility: priority ? "visible" : "auto",
        }}
      />

      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gryt-gray-100 animate-pulse"
          style={{
            background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
    </div>
  )
}

// Shimmer animation for loading state
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`

// Inject shimmer animation if not already present
if (typeof document !== "undefined" && !document.getElementById("shimmer-animation")) {
  const style = document.createElement("style")
  style.id = "shimmer-animation"
  style.textContent = shimmerKeyframes
  document.head.appendChild(style)
}
