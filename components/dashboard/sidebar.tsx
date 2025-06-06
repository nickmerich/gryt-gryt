import type React from "react"
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
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Separator } from "@/components/ui/separator"
import { type SidebarNavItem, SidebarNav } from "@/components/sidebar-nav"

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  isMobile: boolean
}

export function DashboardSidebar({ className, isMobile }: DashboardSidebarProps) {
  const navigationItems: SidebarNavItem[] = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Invoices",
      href: "/dashboard/invoices",
      icon: <ListChecks className="h-5 w-5" />,
    },
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

  const componentsItems: SidebarNavItem[] = [
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: <CheckCircle2 className="h-5 w-5" />,
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

  return (
    <div className="flex h-full max-w-xs flex-col space-y-6 py-6">
      <div className="px-3 py-2 flex items-center justify-between">
        <MainNav className="flex flex-col gap-4" />
        {isMobile && (
          <Button variant="outline" size="icon" className="ml-auto">
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only">Store</span>
          </Button>
        )}
      </div>
      <div className="flex-1 space-y-2 px-3">
        <SidebarNav items={navigationItems} />
        <Separator />
        <Accordion type="single" collapsible>
          <AccordionItem value="components">
            <AccordionTrigger>Components</AccordionTrigger>
            <AccordionContent>
              <SidebarNav items={componentsItems} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
        <SidebarNav items={profileItems} />
      </div>
    </div>
  )
}
