"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, ImageIcon, BarChart3, CheckCircle } from "lucide-react"

interface ExportDataProps {
  filters: any
  isDarkMode: boolean
}

export default function ExportData({ filters, isDarkMode }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const exportOptions = [
    {
      type: "csv",
      label: "CSV Data",
      icon: <FileText className="h-4 w-4" />,
      description: "Raw data in CSV format",
    },
    {
      type: "pdf",
      label: "PDF Report",
      icon: <FileText className="h-4 w-4" />,
      description: "Formatted analytics report",
    },
    {
      type: "png",
      label: "Chart Images",
      icon: <ImageIcon className="h-4 w-4" />,
      description: "Export charts as images",
    },
    {
      type: "json",
      label: "JSON Data",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Structured data format",
    },
  ]

  const handleExport = async (type: string) => {
    setIsExporting(true)
    setShowExportMenu(false)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock data based on type
    const generateMockData = () => {
      switch (type) {
        case "csv":
          return "Date,Habits Completed,GP Earned,Session Duration\n2024-01-01,5,120,15m\n2024-01-02,7,168,18m"
        case "json":
          return JSON.stringify(
            {
              period: filters.dateRange,
              totalSessions: 156,
              avgSessionDuration: "12m 34s",
              habitCompletionRate: 87,
              totalGP: 2450,
            },
            null,
            2,
          )
        default:
          return `Analytics Export - ${type.toUpperCase()}`
      }
    }

    const data = generateMockData()
    const blob = new Blob([data], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-export-${Date.now()}.${type}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)
    setExportComplete(true)
    setTimeout(() => setExportComplete(false), 3000)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowExportMenu(!showExportMenu)}
        disabled={isExporting}
        className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-xl border-2 border-black font-bold min-h-[44px] px-4 transition-all duration-300 ease-in-out ${
          exportComplete ? "bg-green-500 hover:bg-green-600" : ""
        }`}
      >
        {isExporting ? (
          <div className="animate-spin h-4 w-4 mr-2 border-2 border-black border-t-transparent rounded-full" />
        ) : exportComplete ? (
          <CheckCircle className="h-4 w-4 mr-2" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        {isExporting ? "Exporting..." : exportComplete ? "Exported!" : "Export"}
      </Button>

      {showExportMenu && (
        <Card
          className={`absolute top-full right-0 mt-2 w-64 z-50 border-3 rounded-xl overflow-hidden shadow-lg ${
            isDarkMode ? "bg-black/95 border-yellow-600" : "bg-white/95 border-black"
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 text-black">
            <h3 className="font-bold text-sm">Export Options</h3>
          </div>
          <div className="p-3 space-y-2">
            {exportOptions.map((option) => (
              <Button
                key={option.type}
                onClick={() => handleExport(option.type)}
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-lg font-bold min-h-[40px] text-sm ${
                  isDarkMode ? "hover:bg-yellow-950/50 text-yellow-400" : "hover:bg-yellow-50 text-black"
                }`}
              >
                {option.icon}
                <div className="text-left">
                  <div className="font-bold">{option.label}</div>
                  <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {option.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
