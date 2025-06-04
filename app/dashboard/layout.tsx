import type { ReactNode } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import MobileHeader from "@/components/dashboard/mobile-header"
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar - Desktop only */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <MobileHeader />

          {/* Content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {/* Desktop padding */}
            <div className="hidden md:block p-4">
              <div className="max-w-6xl mx-auto">{children}</div>
            </div>

            {/* Mobile optimized content */}
            <div className="md:hidden">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
