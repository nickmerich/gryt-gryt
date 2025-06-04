"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MobileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "outlined" | "filled"
    interactive?: boolean
  }
>(({ className, variant = "default", interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border-3 border-black text-card-foreground transition-all duration-200",
      {
        "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]": variant === "default",
        "bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]":
          variant === "elevated",
        "bg-white border-2": variant === "outlined",
        "bg-gradient-to-br from-red-50 to-red-100 border-red-400 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]":
          variant === "filled",
      },
      interactive &&
        "active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer",
      className,
    )}
    {...props}
  />
))
MobileCard.displayName = "MobileCard"

const MobileCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 p-6 pb-4", className)} {...props} />
  ),
)
MobileCardHeader.displayName = "MobileCardHeader"

const MobileCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-bold leading-tight tracking-tight text-black", className)} {...props} />
  ),
)
MobileCardTitle.displayName = "MobileCardTitle"

const MobileCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-base text-gray-600 leading-relaxed", className)} {...props} />
  ),
)
MobileCardDescription.displayName = "MobileCardDescription"

const MobileCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
MobileCardContent.displayName = "MobileCardContent"

const MobileCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
MobileCardFooter.displayName = "MobileCardFooter"

export { MobileCard, MobileCardHeader, MobileCardFooter, MobileCardTitle, MobileCardDescription, MobileCardContent }
