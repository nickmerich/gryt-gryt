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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Button variant="outline" className="mb-6 rounded-xl border-2 border-black" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black">Join Gryt</h1>
            <p className="text-gray-600 mt-2">
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
                    w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-black
                    ${step >= i ? "bg-black text-white" : "bg-white text-black"}
                  `}
                  >
                    {i}
                  </div>
                  <span className="text-xs mt-1">{i === 1 ? "Account" : i === 2 ? "Profile" : "Goals"}</span>
                </div>
              ))}
              <div className="h-1 bg-black absolute w-1/3 left-1/3 z-0" style={{ top: "calc(50% - 0.5px)" }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-bold">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-black rounded-xl mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-bold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-black rounded-xl mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="font-bold">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-2 border-black rounded-xl mt-1"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal" className="font-bold">
                    What goal are you working towards?
                  </Label>
                  <Input
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="border-2 border-black rounded-xl mt-1"
                    placeholder="e.g., Run a marathon, Learn a new language"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="motivation" className="font-bold">
                    Why does achieving this goal matter to you?
                  </Label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    className="w-full border-2 border-black rounded-xl mt-1 p-2"
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
                  <h2 className="text-xl font-bold mb-2">You're almost there!</h2>
                  <p className="text-gray-600 mb-4">We'll help you set up your habits in the next step.</p>

                  <div className="border-2 border-black rounded-xl p-4 bg-purple-50 mb-4">
                    <h3 className="font-bold">Your Goal</h3>
                    <p>{formData.goal || "No goal specified"}</p>

                    <h3 className="font-bold mt-2">Your Motivation</h3>
                    <p>{formData.motivation || "No motivation specified"}</p>
                  </div>

                  <p className="text-sm text-gray-600">
                    By clicking "Create Account", you agree to our{" "}
                    <Link href="/terms" className="text-purple-600 underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-purple-600 underline">
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
                className="w-full bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold py-6 h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {step < 3 ? "Continue" : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 font-bold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
