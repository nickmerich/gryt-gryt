"use client"

import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface OptimizedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: "default" | "interactive" | "feature"
  padding?: "small" | "default" | "large"
}

const OptimizedCard = forwardRef<HTMLDivElement, OptimizedCardProps>(
  ({ className, variant = "default", padding = "default", children, ...props }, ref) => {
    const baseClasses = [
      // Performance optimizations
      "gpu-layer",
      "contain-layout",

      // Base styling
      "bg-gryt-white",
      "border-4",
      "border-gryt-black",
      "rounded-xl",
      "shadow-brutal",
    ]

    const variantClasses = {
      default: [],
      interactive: [
        "will-change-transform",
        "transition-brutal",
        "cursor-pointer",
        "hover:shadow-brutal-lg",
        "hover:-translate-y-0.5", // Use standard Tailwind class
        "active:translate-y-0",
        "active:shadow-brutal",
      ],
      feature: [
        "will-change-transform",
        "transition-brutal-slow",
        "hover:shadow-brutal-lg",
        "hover:-translate-y-0.5", // Use standard Tailwind class
      ],
    }

    const paddingClasses = {
      small: ["p-4"],
      default: ["p-6"],
      large: ["p-8"],
    }

    const classes = cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  },
)

OptimizedCard.displayName = "OptimizedCard"

export default OptimizedCard
