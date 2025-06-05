"use client"

import { useState, useRef, type ReactNode, type TouchEvent } from "react"
import { cn } from "@/lib/utils"

interface MobileTouchFeedbackProps {
  children: ReactNode
  className?: string
  activeClassName?: string
  disabled?: boolean
  ripple?: boolean
  rippleColor?: string
  rippleDuration?: number
  onTap?: () => void
}

interface RippleState {
  x: number
  y: number
  size: number
  id: number
}

export default function MobileTouchFeedback({
  children,
  className,
  activeClassName = "touch-active",
  disabled = false,
  ripple = true,
  rippleColor = "rgba(34, 197, 94, 0.3)", // Green ripple with opacity
  rippleDuration = 600,
  onTap,
}: MobileTouchFeedbackProps) {
  const [isActive, setIsActive] = useState(false)
  const [ripples, setRipples] = useState<RippleState[]>([])
  const rippleCounter = useRef(0)
  const elementRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (disabled) return

    setIsActive(true)

    if (ripple && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      // Calculate ripple size based on element dimensions
      const size = Math.max(rect.width, rect.height) * 2

      const newRipple: RippleState = {
        x,
        y,
        size,
        id: rippleCounter.current,
      }

      rippleCounter.current += 1
      setRipples((prev) => [...prev, newRipple])
    }
  }

  const handleTouchEnd = () => {
    if (disabled) return

    setIsActive(false)

    if (onTap) {
      onTap()
    }

    // Clean up ripples after animation completes
    setTimeout(() => {
      setRipples((prev) => {
        if (prev.length === 0) return prev
        return prev.slice(1)
      })
    }, rippleDuration)
  }

  return (
    <div
      ref={elementRef}
      className={cn("relative overflow-hidden touch-manipulation", className, isActive && activeClassName)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      data-touch-feedback
    >
      {children}

      {/* Ripple effects */}
      {ripple &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
              transform: "scale(0)",
              opacity: 0.5,
              animation: `ripple ${rippleDuration}ms ease-out forwards`,
            }}
          />
        ))}
    </div>
  )
}
