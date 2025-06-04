"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  LayoutDashboard,
  Target,
  Calendar,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Users,
  Bell,
} from "lucide-react"
// import Logo from "@/components/logo" // Removed Logo import

export default function MobileHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", href: "/dashboard/habits", icon: Target },
    { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Community", href: "/dashboard/community", icon: Users },
  ]

  const isActive = (path: string) => pathname === path

  const getPageTitle = () => {
    const item = navItems.find((item) => item.href === pathname)
    return item ? item.name : "Dashboard"
  }

  return (
    <div className="md:hidden border-b-4 border-black bg-white p-4">
      <div className="flex justify-between items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-xl border-2 border-black">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-r-4 border-black p-0 w-[280px]">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b-4 border-black flex justify-center">
                <Link href="/" className="text-xl font-black">
                  GRYT
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className={`w-full justify-start gap-2 rounded-xl font-bold ${
                          isActive(item.href) ? "bg-black hover:bg-black/80 text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t-4 border-black">
                <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive("/dashboard/settings") ? "default" : "ghost"}
                    className={`w-full justify-start gap-2 rounded-xl font-bold mb-2 ${
                      isActive("/dashboard/settings") ? "bg-black hover:bg-black/80 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 rounded-xl font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold">{getPageTitle()}</h1>

        <Button variant="outline" size="icon" className="rounded-xl border-2 border-black">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
