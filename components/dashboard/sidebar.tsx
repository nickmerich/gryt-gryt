"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShoppingBag,
  User,
  Users,
  Menu,
  X,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"
import { Separator } from "@/components/ui/separator"
import { type SidebarNavItem, SidebarNav } from "@/components/sidebar-nav"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isMobile?: boolean
}

export function Sidebar({ className, isMobile = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigationItems: SidebarNavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Habits",
      href: "/dashboard/habits",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      name: "Journal",
      href: "/dashboard/journal",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Achievements",
      href: "/dashboard/achievements",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: <ListChecks className="h-5 w-5" />,
    },
    {
      name: "Personal Contract",
      href: "/dashboard/contract",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ]

  const componentsItems: SidebarNavItem[] = [
    {
      name: "Integrations",
      href: "/dashboard/integrations",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Integration Charts",
      href: "/dashboard/integrations/charts",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
  ]

  const profileItems: SidebarNavItem[] = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const handleNavigation = () => {
    setIsOpen(false)
  }

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden rounded-xl border-3 border-black min-w-[48px] min-h-[48px] bg-white hover:bg-green-50 active:bg-green-100 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Menu className="h-6 w-6 text-black" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] p-0 border-r-4 border-black bg-white">
        <div className="h-full flex flex-col">
          {/* Header */}
          <SheetHeader className="p-6 border-b-4 border-black bg-gradient-to-r from-gryt-green to-green-600 text-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-black text-white">GRYT</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-xl min-w-[44px] min-h-[44px]"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-green-100 text-sm font-medium">Your Personal Growth Tracker</p>
          </SheetHeader>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              <SidebarNav items={navigationItems} onNavigate={handleNavigation} />
              <Separator className="my-4" />

              <Accordion type="single" collapsible>
                <AccordionItem value="components" className="border-none">
                  <AccordionTrigger className="text-lg font-bold text-black hover:no-underline py-3">
                    Tools & Features
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarNav items={componentsItems} onNavigate={handleNavigation} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-4" />
              <SidebarNav items={profileItems} onNavigate={handleNavigation} />
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 p-4 border-2 border-black rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <h3 className="font-bold text-black mb-3 text-lg">Today's Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Habits Completed</span>
                  <span className="text-lg font-bold text-gryt-green">3/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Current Streak</span>
                  <span className="text-lg font-bold text-gryt-green">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">GP Earned</span>
                  <span className="text-lg font-bold text-gryt-green">+45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t-4 border-black bg-gray-50">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl font-bold text-red-600 hover:bg-red-50 hover:text-red-700 min-h-[52px] border-2 border-transparent hover:border-red-200 transition-all duration-200"
              onClick={handleNavigation}
            >
              <ShoppingBag className="h-5 w-5" />
              Log Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden md:flex h-full w-64 flex-col bg-white border-r-4 border-black shadow-brutal">
      <div className="flex h-full max-w-xs flex-col space-y-6 py-6">
        <div className="px-3 py-2 flex items-center justify-between">
          <MainNav className="flex flex-col gap-4" />
        </div>
        <div className="flex-1 space-y-2 px-3">
          <SidebarNav items={navigationItems} />
          <Separator />
          <Accordion type="single" collapsible>
            <AccordionItem value="components">
              <AccordionTrigger>Tools & Features</AccordionTrigger>
              <AccordionContent>
                <SidebarNav items={componentsItems} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
          <SidebarNav items={profileItems} />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  )
}
