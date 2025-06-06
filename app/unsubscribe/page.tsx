"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (token) {
      handleUnsubscribe()
    } else {
      setStatus("error")
      setMessage("Invalid unsubscribe link")
    }
  }, [token])

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch(`/api/email/unsubscribe?token=${token}`)
      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to unsubscribe")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while processing your request")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <div className="p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="text-4xl font-black text-green-600 mb-2">GRYT</div>
            <div className="text-lg font-bold text-gray-700">Email Unsubscribe</div>
          </div>

          {/* Status Content */}
          {status === "loading" && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto"></div>
              <p className="text-gray-600 font-medium">Processing your request...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-xl border-2 border-green-600">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-green-800 mb-2">Successfully Unsubscribed</h2>
                <p className="text-green-700 font-medium">{message}</p>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>You will no longer receive email notifications from GRYT.</p>
                <p>You can update your preferences anytime by logging into your account.</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="bg-red-100 p-4 rounded-xl border-2 border-red-600">
                <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-red-800 mb-2">Unsubscribe Failed</h2>
                <p className="text-red-700 font-medium">{message}</p>
              </div>

              <div className="text-sm text-gray-600">
                <p>If you continue to have issues, please contact our support team.</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            {status === "success" && (
              <Link href="/dashboard/notifications">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Mail className="h-4 w-4 mr-2" />
                  Manage Email Preferences
                </Button>
              </Link>
            )}

            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl border-2 border-black font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to GRYT
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
