"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface SidebarNavItem {
  name: string
  href: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "border-2 border-black",
              isActive
                ? "bg-green-500 text-white shadow-[0_0_0_2px_#ffffff,_4px_4px_0px_2px_#000000]"
                : "bg-white text-gray-900 shadow-[2px_2px_0px_2px_#000000] hover:bg-green-50 hover:text-green-700 hover:shadow-[0_0_0_2px_#ffffff,_4px_4px_0px_2px_#000000]",
              item.disabled && "pointer-events-none opacity-60",
            )}
          >
            {item.icon && (
              <span
                className={cn(
                  "transition-colors",
                  isActive ? "text-white" : "text-gray-600 group-hover:text-green-600",
                )}
              >
                {item.icon}
              </span>
            )}
            <span className="font-bold">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
