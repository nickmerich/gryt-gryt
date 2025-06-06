"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface MobileOptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  isActive?: boolean
}

export function MobileOptimizedCard({
  children,
  className,
  variant = "default",
  isActive = false,
  ...props
}: MobileOptimizedCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-200",
        variant === "default" && "bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        variant === "outline" && "bg-transparent border-3 border-black",
        variant === "ghost" && "bg-transparent border-0",
        isActive && "transform scale-[0.98] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MobileOptimizedCardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-b-2 border-black font-bold", className)} {...props}>
      {children}
    </div>
  )
}

export function MobileOptimizedCardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  )
}

export function MobileOptimizedCardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border-t-2 border-black", className)} {...props}>
      {children}
    </div>
  )
}
