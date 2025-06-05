"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/dashboard"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking")

  // Check authentication status on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("[LOGIN PAGE] Checking authentication status...")
        const response = await fetch("/api/auth/verify-session")

        if (response.ok) {
          const data = await response.json()
          console.log("[LOGIN PAGE] User already authenticated:", data.user)
          setAuthStatus("authenticated")

          // Redirect authenticated users
          setTimeout(() => {
            console.log(`[LOGIN PAGE] Redirecting authenticated user to: ${redirectTo}`)
            window.location.href = redirectTo
          }, 1000)
        } else {
          console.log("[LOGIN PAGE] User not authenticated")
          setAuthStatus("unauthenticated")
        }
      } catch (error) {
        console.log("[LOGIN PAGE] Authentication check failed:", error)
        setAuthStatus("unauthenticated")
      }
    }

    checkAuth()
  }, [redirectTo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo(null)

    const timestamp = new Date().toISOString()
    console.log(`\n[LOGIN PAGE ${timestamp}] === CLIENT LOGIN ATTEMPT ===`)
    console.log("[LOGIN PAGE] Form data:", { email: formData.email, rememberMe: formData.rememberMe })

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("[LOGIN PAGE] Login response status:", response.status)

      const data = await response.json()
      console.log("[LOGIN PAGE] Login response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      if (data.success) {
        console.log("[LOGIN PAGE] Login successful, setting debug info...")
        setDebugInfo(data)

        // Wait longer to ensure cookie is properly set
        console.log(`[LOGIN PAGE] Waiting 2 seconds before redirect to: ${redirectTo}`)
        setTimeout(() => {
          console.log("[LOGIN PAGE] Executing redirect...")
          window.location.href = redirectTo // Force full page navigation
        }, 2000)
      }
    } catch (error) {
      console.error("[LOGIN PAGE] Login error:", error)
      setError(error instanceof Error ? error.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (authStatus === "checking") {
    return (
      <div className="min-h-screen bg-gryt-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show redirect message for authenticated users
  if (authStatus === "authenticated") {
    return (
      <div className="min-h-screen bg-gryt-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Already logged in. Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gryt-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="outline"
          className="mb-6 rounded-xl border-2 border-black hover:bg-green-50"
          onClick={() => router.push("/")}
          disabled={isLoading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Button>

        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-black">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Log in to continue building habits that change everything</p>
            {redirectTo !== "/dashboard" && (
              <p className="text-sm text-green-600 mt-1">You'll be redirected to: {redirectTo}</p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {debugInfo && (
            <div className="mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-700 text-sm font-medium">Login successful!</p>
                  <p className="text-green-600 text-xs mt-1">
                    Session: {debugInfo.sessionInfo?.tokenPreview} | Redirecting in 2 seconds...
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-bold text-black">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-black rounded-xl mt-1 focus:border-green-500"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="password" className="font-bold text-black">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="border-2 border-black rounded-xl mt-1 pr-10 focus:border-green-500"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
                Remember me for 30 days
              </Label>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl border-2 border-green-400 font-bold py-6 h-auto shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-600 font-bold hover:text-green-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
