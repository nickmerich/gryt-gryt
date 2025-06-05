"use client"

import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react"
import { getOptimizedImageSrc } from "@/lib/mobile-performance"
import { cn } from "@/lib/utils"

interface MobileOptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty" | "color"
  blurDataURL?: string
  placeholderColor?: string
  lazyBoundary?: string
  loadingStrategy?: "lazy" | "eager" | "progressive"
  onLoad?: () => void
  onError?: () => void
}

export default function MobileOptimizedImage({
  src,
  alt,
  width = 0,
  height,
  priority = false,
  quality,
  placeholder = "empty",
  blurDataURL,
  placeholderColor = "#f3f4f6",
  lazyBoundary = "200px",
  loadingStrategy = "lazy",
  className,
  onLoad,
  onError,
  ...props
}: MobileOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [imageSrc, setImageSrc] = useState<string>("")
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Progressive loading strategy
  const [lowQualitySrc, setLowQualitySrc] = useState<string>("")
  const [highQualitySrc, setHighQualitySrc] = useState<string>("")
  const [showLowQuality, setShowLowQuality] = useState(loadingStrategy === "progressive")
  const [showHighQuality, setShowHighQuality] = useState(false)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: lazyBoundary },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority, lazyBoundary])

  // Generate optimized image URL based on device capabilities
  useEffect(() => {
    if (!isInView) return

    if (loadingStrategy === "progressive") {
      // For progressive loading, generate both low and high quality versions
      const lowQuality = getOptimizedImageSrc(src, width, height, undefined, 20) // Low quality version
      const highQuality = getOptimizedImageSrc(src, width, height, undefined, quality)

      setLowQualitySrc(lowQuality)
      setHighQualitySrc(highQuality)
    } else {
      // Standard loading
      const optimizedSrc = getOptimizedImageSrc(src, width, height, undefined, quality)
      setImageSrc(optimizedSrc)
    }
  }, [isInView, src, width, height, quality, loadingStrategy])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()

    if (loadingStrategy === "progressive" && !showHighQuality) {
      // After low quality image loads, load high quality
      setShowHighQuality(true)
    }
  }

  const handleHighQualityLoad = () => {
    setShowLowQuality(false)
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Calculate aspect ratio for placeholder
  const aspectRatio = height && width ? height / width : undefined

  if (!isInView) {
    return (
      <div
        ref={containerRef}
        className={cn("bg-gray-100", className)}
        style={{
          width: width || undefined,
          height: height || undefined,
          aspectRatio: aspectRatio ? `${width} / ${height}` : undefined,
        }}
        {...props}
      />
    )
  }

  if (hasError) {
    return (
      <div
        className={cn("bg-gray-100 flex items-center justify-center text-gray-400", className)}
        style={{ width: width || undefined, height: height || undefined }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    )
  }

  if (loadingStrategy === "progressive") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: width || undefined,
          height: height || undefined,
          aspectRatio: aspectRatio ? `${width} / ${height}` : undefined,
        }}
      >
        {/* Placeholder */}
        {placeholder === "color" && !isLoaded && (
          <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: placeholderColor }} />
        )}

        {/* Blur placeholder */}
        {placeholder === "blur" && blurDataURL && !isLoaded && (
          <img
            src={blurDataURL || "/placeholder.svg"}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
            aria-hidden="true"
          />
        )}

        {/* Low quality image */}
        {showLowQuality && (
          <img
            src={lowQualitySrc || "/placeholder.svg"}
            alt={alt}
            width={width || undefined}
            height={height || undefined}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-300 absolute inset-0 w-full h-full object-cover",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}

        {/* High quality image */}
        {showHighQuality && (
          <img
            ref={imageRef}
            src={highQualitySrc || "/placeholder.svg"}
            alt={alt}
            width={width || undefined}
            height={height || undefined}
            onLoad={handleHighQualityLoad}
            className={cn(
              "transition-opacity duration-500 w-full h-full object-cover",
              !showLowQuality ? "opacity-100" : "opacity-0",
            )}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...props}
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder */}
      {placeholder === "color" && !isLoaded && (
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: placeholderColor }} />
      )}

      {/* Blur placeholder */}
      {placeholder === "blur" && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL || "/placeholder.svg"}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imageRef}
        src={imageSrc || src}
        alt={alt}
        width={width || undefined}
        height={height || undefined}
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
