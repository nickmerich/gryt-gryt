"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const mobileButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gryt-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mobile-touch-target",
  {
    variants: {
      variant: {
        default:
          "bg-gryt-green text-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
        destructive:
          "bg-gryt-black text-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
        outline:
          "bg-white text-gryt-black border-[3px] border-gryt-green shadow-[3px_3px_0px_0px_rgba(34,197,94,1)] hover:bg-green-50 hover:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(34,197,94,1)] active:translate-x-[2px] active:translate-y-[2px]",
        secondary:
          "bg-gryt-gray-100 text-gryt-black border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gryt-gray-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
        ghost:
          "text-gryt-green hover:bg-green-50 hover:text-gryt-black border-2 border-transparent hover:border-green-200 rounded-xl",
        link: "text-gryt-green underline-offset-4 hover:underline",
        green:
          "bg-green-600 text-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
        icon: "h-12 w-12",
        "icon-sm": "h-10 w-10",
        "icon-lg": "h-14 w-14",
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
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(mobileButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
MobileButton.displayName = "MobileButton"

export { MobileButton, mobileButtonVariants }
