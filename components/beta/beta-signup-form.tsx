"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface BetaSignupFormProps {
  inviteCode: string
  email?: string
}

export default function BetaSignupForm({ inviteCode, email }: BetaSignupFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
    confirmPassword: "",
    username: "",
    acceptTerms: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!formData.email || !formData.password || !formData.username) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/beta-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          inviteCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Redirect to onboarding
      router.push("/onboarding?beta=true")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border-2 border-red-500 p-3 text-red-700 text-sm">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-1 text-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!!email}
          required
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-bold mb-1 text-black">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-1 text-black">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-bold mb-1 text-black">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="mt-1 h-4 w-4 border-2 border-black"
          required
        />
        <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
          I accept the <span className="text-green-600 font-bold">Terms of Service</span> and{" "}
          <span className="text-green-600 font-bold">Privacy Policy</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white py-3 px-4 border-4 border-black font-bold shadow-brutal hover:bg-green-600 transition-colors disabled:opacity-70"
      >
        {loading ? "Creating Account..." : "Join the Beta"}
      </button>
    </form>
  )
}
