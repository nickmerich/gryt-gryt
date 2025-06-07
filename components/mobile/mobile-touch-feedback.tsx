"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"

interface MobileTouchFeedbackProps {
  children: ReactNode
  onTap?: () => void
  className?: string
  disabled?: boolean
  hapticFeedback?: boolean
}

export function MobileTouchFeedback({
  children,
  onTap,
  className = "",
  disabled = false,
  hapticFeedback = true,
}: MobileTouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false)
  const touchStartTime = useRef<number>(0)
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const triggerHaptic = () => {
    if (hapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(10) // Very light haptic feedback
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return

    const touch = e.touches[0]
    touchStartTime.current = Date.now()
    touchStartPos.current = { x: touch.clientX, y: touch.clientY }
    setIsPressed(true)
    triggerHaptic()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return

    const touchEndTime = Date.now()
    const touchDuration = touchEndTime - touchStartTime.current

    // Only trigger if it was a quick tap (not a long press or drag)
    if (touchDuration < 500) {
      const touch = e.changedTouches[0]
      const deltaX = Math.abs(touch.clientX - touchStartPos.current.x)
      const deltaY = Math.abs(touch.clientY - touchStartPos.current.y)

      // Only trigger if finger didn't move much (not a swipe)
      if (deltaX < 10 && deltaY < 10) {
        onTap?.()
      }
    }

    setIsPressed(false)
  }

  const handleTouchCancel = () => {
    setIsPressed(false)
  }

  const handleMouseDown = () => {
    if (disabled) return
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    if (disabled) return
    setIsPressed(false)
    onTap?.()
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
  }

  return (
    <div
      className={`
        ${className}
        ${isPressed ? "transform scale-95 opacity-80" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        transition-all duration-150 ease-out
        select-none
        touch-manipulation
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  )
}

export default MobileTouchFeedback
