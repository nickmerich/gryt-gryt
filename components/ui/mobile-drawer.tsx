"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MobileTouchFeedback } from "@/components/mobile/mobile-touch-feedback"

interface MobileDrawerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  position?: "bottom" | "left" | "right"
  height?: string
  width?: string
  className?: string
  overlayClassName?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

export function MobileDrawer({
  children,
  isOpen,
  onClose,
  position = "bottom",
  height = "50%",
  width = "100%",
  className,
  overlayClassName,
  showCloseButton = true,
  closeOnOverlayClick = true,
}: MobileDrawerProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const drawerRef = React.useRef<HTMLDivElement>(null)
  const startY = React.useRef<number>(0)
  const currentY = React.useRef<number>(0)
  const isDragging = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      document.body.style.overflow = ""
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (position !== "bottom") return
    startY.current = e.touches[0].clientY
    currentY.current = e.touches[0].clientY
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || position !== "bottom") return
    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    if (deltaY < 0) return // Prevent dragging up

    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging.current || position !== "bottom") return

    const deltaY = currentY.current - startY.current
    isDragging.current = false

    if (deltaY > 100) {
      onClose()
    } else if (drawerRef.current) {
      drawerRef.current.style.transform = ""
    }
  }

  const positionStyles = {
    bottom: {
      drawer: "bottom-0 left-0 right-0 rounded-t-3xl",
      animation: isOpen ? "translate-y-0" : "translate-y-full",
      dimensions: { height, width: "100%" },
    },
    left: {
      drawer: "top-0 left-0 bottom-0",
      animation: isOpen ? "translate-x-0" : "-translate-x-full",
      dimensions: { height: "100%", width },
    },
    right: {
      drawer: "top-0 right-0 bottom-0",
      animation: isOpen ? "translate-x-0" : "translate-x-full",
      dimensions: { height: "100%", width },
    },
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
          overlayClassName,
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed bg-white shadow-lg transition-transform duration-300 ease-in-out",
          positionStyles[position].drawer,
          positionStyles[position].animation,
          className,
        )}
        style={positionStyles[position].dimensions}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {position === "bottom" && (
          <div className="w-full flex justify-center p-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
        )}

        {showCloseButton && (
          <MobileTouchFeedback onTap={onClose} className="absolute top-4 right-4 z-10">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" aria-label="Close drawer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </MobileTouchFeedback>
        )}

        <div className="h-full overflow-auto">{children}</div>
      </div>
    </div>
  )
}
