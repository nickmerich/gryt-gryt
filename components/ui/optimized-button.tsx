"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface OptimizedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "red" | "white"
  size?: "small" | "default" | "large"
  children: ReactNode
  isLoading?: boolean
}

const OptimizedButton = forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({ className, variant = "default", size = "default", children, isLoading, ...props }, ref) => {
    const baseClasses = [
      // Performance optimizations
      "gpu-layer",
      "will-change-transform",
      "contain-layout",
      "critical-performance",

      // Base styling
      "inline-flex",
      "items-center",
      "justify-center",
      "font-bold",
      "rounded-xl",
      "border-4",
      "transition-brutal",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
      "disabled:opacity-50",

      // Touch optimization
      "touch-manipulation",
      "select-none",

      // Accessibility
      "focus-visible:ring-gryt-red",
    ]

    const variantClasses = {
      default: [
        "bg-gryt-black",
        "text-gryt-white",
        "border-gryt-black",
        "shadow-brutal",
        "hover:shadow-brutal-xl",
        "hover:-translate-y-0.5", // Use standard Tailwind class
        "active:translate-y-0",
        "active:shadow-brutal",
      ],
      outline: [
        "bg-transparent",
        "text-gryt-black",
        "border-gryt-black",
        "shadow-brutal",
        "hover:bg-gryt-black",
        "hover:text-gryt-white",
        "hover:shadow-brutal-xl",
        "hover:-translate-y-0.5", // Use standard Tailwind class
        "active:translate-y-0",
        "active:shadow-brutal",
      ],
      red: [
        "bg-gryt-red",
        "text-gryt-white",
        "border-gryt-black",
        "shadow-brutal",
        "hover:shadow-brutal-xl",
        "hover:-translate-y-0.5", // Use standard Tailwind class
        "active:translate-y-0",
        "active:shadow-brutal",
      ],
      white: [
        "bg-gryt-white",
        "text-gryt-black",
        "border-gryt-black",
        "shadow-brutal",
        "hover:shadow-brutal-xl",
        "hover:-translate-y-0.5", // Use standard Tailwind class
        "active:translate-y-0",
        "active:shadow-brutal",
      ],
    }

    const sizeClasses = {
      small: ["text-sm", "px-4", "py-2", "min-h-[36px]"],
      default: ["text-base", "px-6", "py-3", "min-h-[44px]"],
      large: ["text-lg", "px-10", "py-4", "min-h-[52px]"],
    }

    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    return (
      <button ref={ref} className={classes} disabled={isLoading} {...props}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

OptimizedButton.displayName = "OptimizedButton"

export default OptimizedButton
