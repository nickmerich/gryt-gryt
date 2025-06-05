"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "free"

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    goal: "",
    motivation: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, we would submit the form data to an API
      console.log("Form submitted:", formData)
      router.push("/onboarding")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gryt-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="outline"
          className="mb-6 rounded-xl border-4 border-gryt-black bg-gryt-white text-gryt-black hover:bg-gryt-green hover:text-gryt-white shadow-brutal transition-brutal"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="bg-gryt-white border-4 border-gryt-black rounded-xl p-6 shadow-brutal">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-gryt-black">Join Gryt</h1>
            <p className="text-gryt-gray-600 mt-2">
              {plan === "premium"
                ? "You're signing up for the Premium plan"
                : "Start your personal development journey"}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-gryt-black transition-brutal
                    ${step >= i ? "bg-gryt-green text-gryt-white shadow-brutal-green" : "bg-gryt-white text-gryt-black shadow-brutal"}
                  `}
                  >
                    {i}
                  </div>
                  <span className="text-xs mt-1 text-gryt-black font-medium">
                    {i === 1 ? "Account" : i === 2 ? "Profile" : "Goals"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-bold text-gryt-black">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-4 border-gryt-black rounded-xl mt-1 bg-gryt-white text-gryt-black focus:border-gryt-green focus:ring-gryt-green"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-bold text-gryt-black">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-4 border-gryt-black rounded-xl mt-1 bg-gryt-white text-gryt-black focus:border-gryt-green focus:ring-gryt-green"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="font-bold text-gryt-black">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-4 border-gryt-black rounded-xl mt-1 bg-gryt-white text-gryt-black focus:border-gryt-green focus:ring-gryt-green"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal" className="font-bold text-gryt-black">
                    What goal are you working towards?
                  </Label>
                  <Input
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="border-4 border-gryt-black rounded-xl mt-1 bg-gryt-white text-gryt-black focus:border-gryt-green focus:ring-gryt-green"
                    placeholder="e.g., Run a marathon, Learn a new language"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="motivation" className="font-bold text-gryt-black">
                    Why does achieving this goal matter to you?
                  </Label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    className="w-full border-4 border-gryt-black rounded-xl mt-1 p-3 bg-gryt-white text-gryt-black focus:border-gryt-green focus:ring-gryt-green resize-none"
                    rows={4}
                    placeholder="This will help keep you motivated when things get tough"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2 text-gryt-black">You're almost there!</h2>
                  <p className="text-gryt-gray-600 mb-4">We'll help you set up your habits in the next step.</p>

                  <div className="border-4 border-gryt-black rounded-xl p-4 bg-gryt-green bg-opacity-10 mb-4">
                    <h3 className="font-bold text-gryt-black">Your Goal</h3>
                    <p className="text-gryt-gray-700">{formData.goal || "No goal specified"}</p>

                    <h3 className="font-bold mt-2 text-gryt-black">Your Motivation</h3>
                    <p className="text-gryt-gray-700">{formData.motivation || "No motivation specified"}</p>
                  </div>

                  <p className="text-sm text-gryt-gray-600">
                    By clicking "Create Account", you agree to our{" "}
                    <Link href="/terms" className="text-gryt-green font-bold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-gryt-green font-bold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full bg-gryt-black hover:bg-gryt-green text-gryt-white rounded-xl border-4 border-gryt-black font-bold py-6 h-auto shadow-brutal transition-brutal hover:shadow-brutal-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {step < 3 ? "Continue" : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gryt-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-gryt-green font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
