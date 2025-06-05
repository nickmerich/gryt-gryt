"use client"

import { useState } from "react"
import { X, MessageSquare } from "lucide-react"

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-black text-white p-2 text-center relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Close beta banner"
      >
        <X size={16} />
      </button>

      <div className="flex items-center justify-center">
        <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-sm mr-2">BETA</span>
        <span>Welcome to the GRYT private beta! Your feedback helps us improve.</span>
        <button
          onClick={() => {
            // Trigger feedback widget
            const event = new CustomEvent("open-feedback")
            window.dispatchEvent(event)
          }}
          className="ml-2 underline flex items-center text-green-400 hover:text-green-300"
        >
          <MessageSquare size={14} className="mr-1" />
          Give Feedback
        </button>
      </div>
    </div>
  )
}
