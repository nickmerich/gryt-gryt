"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]",
        primary:
          "bg-gryt-green text-white hover:bg-green-600 border-3 border-green-700 shadow-[3px_3px_0px_0px_rgba(34,197,94,0.3)]",
        outline: "bg-white text-black hover:bg-gray-100 border-3 border-black",
        ghost: "bg-transparent hover:bg-gray-100 text-black",
        link: "bg-transparent underline-offset-4 hover:underline text-black p-0 h-auto min-h-0",
      },
      size: {
        default: "h-12 px-5 py-2",
        sm: "h-10 px-3 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface MobileOptimizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function MobileOptimizedButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: MobileOptimizedButtonProps) {
  const Comp = "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
