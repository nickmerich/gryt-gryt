"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileOptimizedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
}

const MobileOptimizedForm = React.forwardRef<HTMLFormElement, MobileOptimizedFormProps>(
  ({ className, children, onSubmit, loading = false, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      if (loading) {
        e.preventDefault()
        return
      }

      if (onSubmit) {
        onSubmit(e)
      }
    }

    return (
      <form ref={ref} className={cn("space-y-4", className)} onSubmit={handleSubmit} {...props}>
        {loading ? (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-gryt-green border-t-transparent rounded-full"></div>
          </div>
        ) : null}
        {children}
      </form>
    )
  },
)
MobileOptimizedForm.displayName = "MobileOptimizedForm"

interface MobileOptimizedFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  required?: boolean
  helpText?: string
}

const MobileOptimizedFormField = React.forwardRef<HTMLDivElement, MobileOptimizedFormFieldProps>(
  ({ className, children, label, error, required, helpText, ...props }, ref) => {
    const id = React.useId()

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement, {
              id,
              "aria-invalid": error ? "true" : undefined,
              "aria-describedby": error ? `${id}-error` : helpText ? `${id}-description` : undefined,
            })
          : children}
        {helpText && !error && (
          <p className="text-xs text-gray-500" id={`${id}-description`}>
            {helpText}
          </p>
        )}
        {error && (
          <p className="text-xs text-red-500" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  },
)
MobileOptimizedFormField.displayName = "MobileOptimizedFormField"

export { MobileOptimizedForm, MobileOptimizedFormField }
