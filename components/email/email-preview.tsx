"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Send, Code, Smartphone, Monitor } from "lucide-react"
import { emailTemplates } from "@/lib/email-service"

interface EmailPreviewProps {
  isDarkMode?: boolean
}

export default function EmailPreview({ isDarkMode = false }: EmailPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("habit_reminder")
  const [viewMode, setViewMode] = useState<"html" | "text">("html")
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop")
  const [isSending, setIsSending] = useState(false)

  const template = emailTemplates[selectedTemplate]

  const sampleVariables = {
    userName: "Alex",
    streakCount: "7",
    todayDate: new Date().toLocaleDateString(),
    weekStart: "Dec 1",
    weekEnd: "Dec 7",
    totalHabits: "23",
    positiveHabits: "18",
    topCategory: "Health",
    achievementName: "Week Warrior",
    achievementDescription: "Complete habit logging for 7 consecutive days",
    rewardPoints: "50",
    unsubscribeToken: "sample_token",
  }

  const renderPreview = () => {
    if (!template) return null

    let content = viewMode === "html" ? template.htmlContent : template.textContent

    // Replace variables with sample data
    Object.entries(sampleVariables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      content = content.replace(new RegExp(placeholder, "g"), value)
    })

    // Add common URLs
    const commonVars = {
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://gryt.app"}/dashboard`,
      analyticsUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://gryt.app"}/dashboard/analytics`,
      unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://gryt.app"}/unsubscribe?token=sample_token`,
      preferencesUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://gryt.app"}/dashboard/notifications`,
    }

    Object.entries(commonVars).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      content = content.replace(new RegExp(placeholder, "g"), value)
    })

    return content
  }

  const handleSendTest = async () => {
    setIsSending(true)

    // Simulate sending test email
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSending(false)
    alert("Test email sent successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Email Preview</h3>
        <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Preview and test email templates
        </p>
      </div>

      {/* Controls */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Template Selection */}
          <div>
            <label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(emailTemplates).map(([key, template]) => (
                  <SelectItem key={key} value={key}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Mode */}
          <div>
            <label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>View Mode</label>
            <Select value={viewMode} onValueChange={(value: "html" | "text") => setViewMode(value)}>
              <SelectTrigger className="rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html">
                  <Eye className="h-4 w-4 inline mr-2" />
                  HTML Preview
                </SelectItem>
                <SelectItem value="text">
                  <Code className="h-4 w-4 inline mr-2" />
                  Text Version
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Device View */}
          <div>
            <label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>Device View</label>
            <Select value={deviceView} onValueChange={(value: "desktop" | "mobile") => setDeviceView(value)}>
              <SelectTrigger className="rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">
                  <Monitor className="h-4 w-4 inline mr-2" />
                  Desktop
                </SelectItem>
                <SelectItem value="mobile">
                  <Smartphone className="h-4 w-4 inline mr-2" />
                  Mobile
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Send Test */}
          <div>
            <label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>Test Email</label>
            <Button
              onClick={handleSendTest}
              disabled={isSending}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl border-2 border-black font-bold"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Template Info */}
      {template && (
        <Card
          className={`border-3 rounded-xl p-6 ${
            isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className={`font-bold text-xl ${isDarkMode ? "text-white" : "text-black"}`}>{template.name}</h4>
              <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Subject: {template.subject}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-600">
              {template.variables.length} Variables
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {template.variables.map((variable) => (
              <Badge key={variable} variant="outline" className="font-mono text-xs">
                {`{{${variable}}}`}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Preview */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-200">
          <h4 className="font-bold text-lg text-black">Email Preview</h4>
        </div>

        <div className={`p-6 ${deviceView === "mobile" ? "max-w-sm mx-auto" : ""}`}>
          {viewMode === "html" ? (
            <div
              className="email-preview"
              dangerouslySetInnerHTML={{ __html: renderPreview() || "" }}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            />
          ) : (
            <pre className={`whitespace-pre-wrap font-mono text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {renderPreview()}
            </pre>
          )}
        </div>
      </Card>
    </div>
  )
}
