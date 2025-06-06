import type React from "react"
import MobileResponsiveLayout from "@/components/layouts/mobile-responsive-layout"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MobileResponsiveLayout>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </MobileResponsiveLayout>
  )
}
