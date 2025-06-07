"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import Link from "next/link"

export default function MobileHeader() {
  const [notifications] = useState(3)

  return (
    <header className="bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Left side - Logo */}
        <Link href="/dashboard" className="flex items-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-xl">
            <span className="text-white font-black text-lg">GRYT</span>
          </div>
        </Link>

        {/* Center - Search (hidden on small screens) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search habits, goals..."
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Search button for mobile */}
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden rounded-xl border-2 border-black min-w-[44px] min-h-[44px]"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Link href="/dashboard/notifications">
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-xl border-2 border-black min-w-[44px] min-h-[44px]"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile */}
          <Link href="/dashboard/profile">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-2 border-black min-w-[44px] min-h-[44px]"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
