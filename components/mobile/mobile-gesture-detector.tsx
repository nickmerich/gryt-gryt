"use client"

import { useState, useRef, useEffect, type ReactNode, type TouchEvent } from "react"
import { cn } from "@/lib/utils"

interface MobileGestureDetectorProps {
  children: ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  swipeThreshold?: number
  longPressDelay?: number
  doubleTapDelay?: number
  disabled?: boolean
}

export default function MobileGestureDetector({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  onLongPress,
  swipeThreshold = 50,
  longPressDelay = 500,
  doubleTapDelay = 300,
  disabled = false,
}: MobileGestureDetectorProps) {
  const [isTouching, setIsTouching] = useState(false)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastTapTimeRef = useRef(0)
  const preventScrollRef = useRef(false)

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (disabled) return

    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }

    setIsTouching(true)

    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress()
        preventScrollRef.current = true
      }, longPressDelay)
    }
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (disabled || !isTouching) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    // If significant movement, cancel long press
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }

    // Prevent default if we're handling horizontal swipes to prevent page scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) && (onSwipeLeft || onSwipeRight)) {
      preventScrollRef.current = true
    }
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (disabled) return

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    setIsTouching(false)

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    // Handle swipes
    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
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
    } else if (deltaTime < 300) {
      // Handle tap and double tap
      const now = Date.now()
      const timeSinceLastTap = now - lastTapTimeRef.current

      if (onDoubleTap && timeSinceLastTap < doubleTapDelay) {
        onDoubleTap()
        lastTapTimeRef.current = 0 // Reset to prevent triple tap counting as another double tap
      } else {
        if (onTap) {
          onTap()
        }
        lastTapTimeRef.current = now
      }
    }

    // Reset scroll prevention
    preventScrollRef.current = false
  }

  return (
    <div
      className={cn("touch-manipulation", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current)
        }
        setIsTouching(false)
      }}
      style={{ touchAction: preventScrollRef.current ? "none" : "manipulation" }}
    >
      {children}
    </div>
  )
}
