"use client"

import { Home, Calendar, Settings, Bell, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const MobileBottomNav = () => {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      current: pathname === "/dashboard/calendar",
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      current: pathname === "/dashboard/notifications",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={cn("p-2 rounded-md hover:bg-gray-100", item.current ? "text-primary" : "text-gray-500")}
            href={item.href}
            asChild
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.name}</span>
          </Button>
        ))}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[300px]">
            <div className="grid gap-4 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
              <div className="grid gap-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/habits">Habits</a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/journal">Journal</a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/analytics">Analytics</a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/achievements">Achievements</a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/contract">Personal Contract</a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/dashboard/leaderboard">Leaderboard</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileBottomNav
