"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const mobileButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-3 min-h-[56px] px-6 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default:
          "bg-red-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        destructive:
          "bg-red-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        outline:
          "border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-50 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        secondary:
          "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:bg-gray-800 active:shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]",
        ghost: "border-transparent shadow-none hover:bg-red-50 hover:text-red-600 active:bg-red-100",
        link: "text-red-600 underline-offset-4 hover:underline border-transparent shadow-none min-h-auto px-0",
      },
      size: {
        default: "min-h-[56px] px-6",
        sm: "min-h-[48px] px-4 text-sm",
        lg: "min-h-[64px] px-8 text-lg",
        icon: "min-h-[56px] min-w-[56px] px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface MobileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileButtonVariants> {
  asChild?: boolean
  loading?: boolean
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(mobileButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
MobileButton.displayName = "MobileButton"

export { MobileButton, mobileButtonVariants }
