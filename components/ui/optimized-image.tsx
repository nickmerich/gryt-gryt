"use client"

import { useState, useEffect, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [imageSrc, setImageSrc] = useState<string>("")
  const [hasError, setHasError] = useState(false)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "50px" },
    )

    const imageElement = document.querySelector(`[data-src="${src}"]`)
    if (imageElement) {
      observer.observe(imageElement)
    }

    return () => observer.disconnect()
  }, [src, priority])

  // Generate optimized image URL based on device capabilities
  useEffect(() => {
    if (!isInView) return

    const generateOptimizedSrc = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const isRetina = devicePixelRatio > 1
      const isLowEnd = document.documentElement.classList.contains("low-end-device")
      const supportsAvif = document.documentElement.classList.contains("supports-avif")
      const supportsWebP = document.documentElement.classList.contains("supports-webp")

      let optimizedSrc = src
      let format = "auto"
      let adjustedQuality = quality

      // Adjust quality based on device capabilities
      if (isLowEnd) {
        adjustedQuality = Math.min(quality, 60)
      } else if (isRetina) {
        adjustedQuality = Math.min(quality + 10, 90)
      }

      // Choose optimal format
      if (supportsAvif) {
        format = "avif"
      } else if (supportsWebP) {
        format = "webp"
      }

      // If using a CDN like Cloudinary or similar, construct optimized URL
      if (src.includes("cloudinary.com") || src.includes("imagekit.io")) {
        // Example for image optimization services
        const params = new URLSearchParams({
          f: format,
          q: adjustedQuality.toString(),
          ...(width && { w: (width * devicePixelRatio).toString() }),
          ...(height && { h: (height * devicePixelRatio).toString() }),
        })
        optimizedSrc = `${src}?${params.toString()}`
      }

      return optimizedSrc
    }

    setImageSrc(generateOptimizedSrc())
  }, [isInView, src, width, height, quality])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  if (!isInView) {
    return (
      <div data-src={src} className={cn("bg-gray-200 animate-pulse", className)} style={{ width, height }} {...props} />
    )
  }

  if (hasError) {
    return (
      <div
        className={cn("bg-gray-200 flex items-center justify-center text-gray-500", className)}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {placeholder === "blur" && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL || "/placeholder.svg"}
          alt=""
          className={cn("absolute inset-0 w-full h-full object-cover filter blur-sm scale-110", className)}
        />
      )}

      <img
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...props}
      />
    </div>
  )
}
