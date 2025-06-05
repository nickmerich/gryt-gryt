"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MobileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "green" | "outline"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-white border-3 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    elevated: "bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    green:
      "bg-gradient-to-br from-green-50 to-green-100 border-3 border-gryt-green rounded-2xl shadow-[3px_3px_0px_0px_rgba(34,197,94,0.5)]",
    outline: "bg-transparent border-3 border-gryt-green rounded-2xl",
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-200 mobile-touch-target", variants[variant], className)}
      {...props}
    />
  )
})
MobileCard.displayName = "MobileCard"

const MobileCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4 pb-2", className)} {...props} />
  ),
)
MobileCardHeader.displayName = "MobileCardHeader"

const MobileCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold leading-none tracking-tight text-gryt-black mobile-heading-green", className)}
      {...props}
    />
  ),
)
MobileCardTitle.displayName = "MobileCardTitle"

const MobileCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gryt-gray-600 mobile-body-green", className)} {...props} />
  ),
)
MobileCardDescription.displayName = "MobileCardDescription"

const MobileCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />,
)
MobileCardContent.displayName = "MobileCardContent"

const MobileCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-4 pt-0", className)} {...props} />
  ),
)
MobileCardFooter.displayName = "MobileCardFooter"

export { MobileCard, MobileCardHeader, MobileCardFooter, MobileCardTitle, MobileCardDescription, MobileCardContent }
