"use client"

import { useRef, useCallback, useEffect, type ReactNode } from "react"

interface GestureDetectorProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onDoubleTap?: () => void
  className?: string
  threshold?: number
  disabled?: boolean
}

export function MobileGestureDetector({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onDoubleTap,
  className = "",
  threshold = 50,
  disabled = false,
}: GestureDetectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gestureRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    lastTap: 0,
    initialDistance: 0,
    isMultiTouch: false,
  })

  const getTouchDistance = useCallback((touches: TouchList): number => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2))
  }, [])

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (disabled) return

      const touch = event.touches[0]
      const gesture = gestureRef.current

      gesture.startX = touch.clientX
      gesture.startY = touch.clientY
      gesture.startTime = Date.now()
      gesture.isMultiTouch = event.touches.length > 1

      if (gesture.isMultiTouch) {
        gesture.initialDistance = getTouchDistance(event.touches)
      }

      // Double tap detection
      if (onDoubleTap) {
        const now = Date.now()
        if (now - gesture.lastTap < 300) {
          onDoubleTap()
          gesture.lastTap = 0
        } else {
          gesture.lastTap = now
        }
      }
    },
    [disabled, getTouchDistance, onDoubleTap],
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (disabled) return

      const gesture = gestureRef.current

      if (gesture.isMultiTouch && onPinch) {
        const currentDistance = getTouchDistance(event.touches)
        if (gesture.initialDistance > 0) {
          const scale = currentDistance / gesture.initialDistance
          onPinch(scale)
        }
      }
    },
    [disabled, getTouchDistance, onPinch],
  )

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (disabled) return

      const gesture = gestureRef.current

      if (gesture.isMultiTouch) {
        gesture.isMultiTouch = false
        return
      }

      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - gesture.startX
      const deltaY = touch.clientY - gesture.startY
      const deltaTime = Date.now() - gesture.startTime

      // Only consider it a swipe if it's fast enough and long enough
      if (deltaTime < 500 && (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold)) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight()
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft()
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown()
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp()
          }
        }
      }
    },
    [disabled, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Passive listeners for better performance
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: true })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div
      ref={containerRef}
      className={`mobile-gesture-container ${className}`}
      style={{
        touchAction: disabled ? "none" : "pan-y pan-x",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  )
}
