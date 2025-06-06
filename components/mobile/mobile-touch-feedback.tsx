"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileTouchFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  withHaptic?: boolean
  withRipple?: boolean
  withScale?: boolean
}

export function MobileTouchFeedback({
  children,
  className,
  withHaptic = true,
  withRipple = true,
  withScale = true,
  ...props
}: MobileTouchFeedbackProps) {
  const [isActive, setIsActive] = React.useState(false)
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])
  const rippleCount = React.useRef(0)

  const triggerHaptic = React.useCallback(() => {
    if (withHaptic && navigator.vibrate) {
      navigator.vibrate(10)
    }
  }, [withHaptic])

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setIsActive(true)
      triggerHaptic()

      if (withRipple) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        const id = rippleCount.current++

        setRipples((prev) => [...prev, { id, x, y }])

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
        }, 600)
      }
    },
    [triggerHaptic, withRipple],
  )

  const handleTouchEnd = React.useCallback(() => {
    setIsActive(false)
  }, [])

  return (
    <div
      className={cn(
        "relative overflow-hidden touch-manipulation",
        withScale && "transition-transform duration-200",
        isActive && withScale && "transform scale-[0.97]",
        className,
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      {children}
      {withRipple &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-black/10 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              width: "200%",
              paddingBottom: "200%",
            }}
          />
        ))}
    </div>
  )
}
