"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-bold text-black block">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            type={type}
            className={cn(
              "flex h-14 w-full rounded-2xl border-3 border-black bg-white px-4 py-3 text-base font-medium text-black placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transition-all duration-200",
              icon && "pl-12",
              error && "border-red-500 bg-red-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm font-medium text-red-600 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
            {error}
          </p>
        )}
      </div>
    )
  },
)
MobileInput.displayName = "MobileInput"

export { MobileInput }
