"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MobileOptimizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  clearable?: boolean
  onClear?: () => void
}

const MobileOptimizedInput = React.forwardRef<HTMLInputElement, MobileOptimizedInputProps>(
  (
    { className, type, label, error, icon, iconPosition = "left", clearable, onClear, value, onChange, ...props },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState(value || "")
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      setInputValue(value || "")
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (onChange) onChange(e)
    }

    const handleClear = () => {
      setInputValue("")
      if (onClear) onClear()
      if (inputRef.current) {
        inputRef.current.focus()

        // Create a synthetic event
        const event = Object.create(new Event("input", { bubbles: true }))
        Object.defineProperty(event, "target", { value: { value: "" } })
        if (onChange) onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const mergedRef = useMergedRef(ref, inputRef)

    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-bold text-black block">{label}</label>}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-14 w-full rounded-2xl border-3 border-black bg-white px-4 py-3 text-base font-medium text-black placeholder:text-gray-500 focus:border-gryt-green focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] transition-all duration-200",
              icon && iconPosition === "left" && "pl-12",
              icon && iconPosition === "right" && "pr-12",
              clearable && inputValue && "pr-12",
              error && "border-red-500 bg-red-50",
              className,
            )}
            ref={mergedRef}
            value={inputValue}
            onChange={handleChange}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          {clearable && inputValue && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
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
MobileOptimizedInput.displayName = "MobileOptimizedInput"

// Helper function to merge refs
function useMergedRef<T>(...refs: React.Ref<T>[]) {
  return React.useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return

        if (typeof ref === "function") {
          ref(element)
        } else {
          ;(ref as React.MutableRefObject<T>).current = element
        }
      })
    },
    [refs],
  )
}

export { MobileOptimizedInput }
