import { cn } from "@/lib/utils"
import type React from "react"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: boolean
  centered?: boolean
}

export function ResponsiveContainer({
  children,
  maxWidth = "xl",
  padding = true,
  centered = true,
  className,
  ...props
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  }

  return (
    <div
      className={cn(maxWidthClasses[maxWidth], padding && "px-4 sm:px-6 md:px-8", centered && "mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
}
