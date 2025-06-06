"use client"

import type React from "react"

import { useRef, useCallback, type ReactNode } from "react"

interface TouchFeedbackProps {
  children: ReactNode
  className?: string
  onTap?: () => void
  disabled?: boolean
  rippleColor?: string
  hapticFeedback?: boolean
}

export function MobileTouchFeedback({
  children,
  className = "",
  onTap,
  disabled = false,
  rippleColor = "rgba(34, 197, 94, 0.3)",
  hapticFeedback = true,
}: TouchFeedbackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rippleTimeoutRef = useRef<NodeJS.Timeout>()

  const createRipple = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (disabled || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = ("touches" in event ? event.touches[0].clientX : event.clientX) - rect.left - size / 2
      const y = ("touches" in event ? event.touches[0].clientY : event.clientY) - rect.top - size / 2

      const ripple = document.createElement("span")
      ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${rippleColor};
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
    `

      containerRef.current.appendChild(ripple)

      // Clean up ripple after animation
      rippleTimeoutRef.current = setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 600)
    },
    [disabled, rippleColor],
  )

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (disabled) return

      createRipple(event)

      // Add active state
      if (containerRef.current) {
        containerRef.current.classList.add("touch-active")
      }

      // Haptic feedback on supported devices
      if (hapticFeedback && "vibrate" in navigator) {
        navigator.vibrate(10) // Very short vibration
      }
    },
    [createRipple, disabled, hapticFeedback],
  )

  const handleTouchEnd = useCallback(() => {
    if (disabled) return

    // Remove active state
    if (containerRef.current) {
      containerRef.current.classList.remove("touch-active")
    }

    // Execute tap callback
    if (onTap) {
      onTap()
    }
  }, [disabled, onTap])

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return
      createRipple(event)

      if (containerRef.current) {
        containerRef.current.classList.add("touch-active")
      }
    },
    [createRipple, disabled],
  )

  const handleMouseUp = useCallback(() => {
    if (disabled) return

    if (containerRef.current) {
      containerRef.current.classList.remove("touch-active")
    }

    if (onTap) {
      onTap()
    }
  }, [disabled, onTap])

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-hidden mobile-no-select
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: disabled ? "none" : "manipulation",
      }}
    >
      {children}
    </div>
  )
}

// CSS for ripple animation (injected if not present)
const rippleAnimation = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`

if (typeof document !== "undefined" && !document.getElementById("ripple-animation")) {
  const style = document.createElement("style")
  style.id = "ripple-animation"
  style.textContent = rippleAnimation
  document.head.appendChild(style)
}
