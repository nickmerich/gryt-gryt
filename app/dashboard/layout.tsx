import type { ReactNode } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import MobileHeader from "@/components/dashboard/mobile-header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="flex h-screen">
        {/* Sidebar - Desktop only */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <MobileHeader />

          {/* Content area */}
          <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
