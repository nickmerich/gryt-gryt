"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import IntegrationCard from "@/components/integration-card"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning meditation", selected: false },
    { id: 2, name: "Read 20 pages", selected: false },
    { id: 3, name: "Exercise for 30 minutes", selected: false },
    { id: 4, name: "Drink 8 glasses of water", selected: false },
    { id: 5, name: "Journal for 10 minutes", selected: false },
    { id: 6, name: "Practice gratitude", selected: false },
    { id: 7, name: "No screen time before bed", selected: false },
    { id: 8, name: "Learn a new skill", selected: false },
  ])
  const [customHabit, setCustomHabit] = useState("")

  const handleHabitToggle = (id: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, selected: !habit.selected } : habit)))
  }

  const handleAddCustomHabit = () => {
    if (customHabit.trim()) {
      setHabits([...habits, { id: habits.length + 1, name: customHabit, selected: true }])
      setCustomHabit("")
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, we would save the selected habits
      console.log(
        "Selected habits:",
        habits.filter((h) => h.selected),
      )
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/signup")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gryt-white to-gryt-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="outline" className="mb-6 rounded-xl border-2 border-black" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-brutal">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black">Let's Set Up Your Gryt</h1>
            <p className="text-gray-600 mt-2">
              {step === 1
                ? "Select habits that will help you achieve your goals"
                : step === 2
                  ? "Connect your favorite apps for seamless tracking"
                  : "Review your selections and get ready to start"}
            </p>
          </div>

          <div className="mb-6 relative">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 border-black
                    ${step >= i ? "bg-gryt-green text-white" : "bg-white text-black"}
                  `}
                  >
                    {i}
                  </div>
                  <span className="text-xs mt-1">{i === 1 ? "Habits" : i === 2 ? "Integrations" : "Review"}</span>
                </div>
              ))}
              <div className="h-1 bg-gryt-green absolute w-2/3 left-1/6 z-0" style={{ top: "calc(50% - 0.5px)" }}></div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Select Your Daily Habits</h2>
              <p className="text-gray-600 mb-4">
                Choose habits that will help you achieve your goals. You can always add more later.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`
                      border-2 border-black rounded-xl p-3 cursor-pointer flex items-center
                      ${habit.selected ? "bg-gryt-green bg-opacity-10" : "bg-white"}
                    `}
                    onClick={() => handleHabitToggle(habit.id)}
                  >
                    <div
                      className={`
                      w-5 h-5 rounded border-2 border-black mr-3 flex items-center justify-center
                      ${habit.selected ? "bg-gryt-green border-gryt-green" : "bg-white"}
                    `}
                    >
                      {habit.selected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{habit.name}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <Label htmlFor="customHabit" className="font-bold">
                  Add Your Own Habit
                </Label>
                <div className="flex mt-1">
                  <Input
                    id="customHabit"
                    value={customHabit}
                    onChange={(e) => setCustomHabit(e.target.value)}
                    className="border-2 border-black rounded-xl rounded-r-none"
                    placeholder="e.g., Practice piano for 15 minutes"
                  />
                  <Button
                    onClick={handleAddCustomHabit}
                    className="bg-gryt-green hover:bg-gryt-green/80 text-white rounded-xl rounded-l-none border-2 border-black"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Connect Your Apps</h2>
              <p className="text-gray-600 mb-4">
                Integrate with your favorite apps to automatically track your habits and progress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <IntegrationCard
                  name="Fitness"
                  description="Connect your fitness trackers"
                  apps={["Apple Health", "Google Fit", "Fitbit", "Strava"]}
                  icon="activity"
                  color="bg-gradient-to-br from-gryt-green to-gryt-green/70"
                />
                <IntegrationCard
                  name="Nutrition"
                  description="Track your diet and nutrition"
                  apps={["MyFitnessPal", "LoseIt!", "Cronometer"]}
                  icon="utensils"
                  color="bg-gradient-to-br from-gryt-green to-gryt-green/70"
                />
                <IntegrationCard
                  name="Productivity"
                  description="Monitor your screen time and focus"
                  apps={["RescueTime", "Screen Time", "Forest"]}
                  icon="clock"
                  color="bg-gradient-to-br from-gryt-green to-gryt-green/70"
                />
                <IntegrationCard
                  name="Reading"
                  description="Track your reading habits"
                  apps={["Kindle", "Goodreads", "Audible", "Libby"]}
                  icon="book"
                  color="bg-gradient-to-br from-gryt-green to-gryt-green/70"
                />
              </div>

              <p className="text-sm text-gray-600">You can connect more apps later in the settings.</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Review Your Setup</h2>

              <div className="border-2 border-black rounded-xl p-4 mb-4">
                <h3 className="font-bold">Selected Habits</h3>
                <ul className="mt-2 space-y-1">
                  {habits.filter((h) => h.selected).length > 0 ? (
                    habits
                      .filter((h) => h.selected)
                      .map((habit) => (
                        <li key={habit.id} className="flex items-center">
                          <Check className="h-4 w-4 text-gryt-green mr-2" />
                          {habit.name}
                        </li>
                      ))
                  ) : (
                    <li className="text-gray-500">No habits selected</li>
                  )}
                </ul>
              </div>

              <div className="border-2 border-black rounded-xl p-4 mb-4">
                <h3 className="font-bold">Connected Apps</h3>
                <p className="text-gray-600 mt-2">You can connect your apps after completing the onboarding.</p>
              </div>

              <div className="bg-gryt-green bg-opacity-10 border-2 border-black rounded-xl p-4 mb-6">
                <h3 className="font-bold">What's Next?</h3>
                <p className="mt-2">
                  After completing setup, you'll be taken to your personalized dashboard where you can:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gryt-green mr-2" />
                    Track your daily habits
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gryt-green mr-2" />
                    Monitor your progress
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gryt-green mr-2" />
                    Receive personalized AI insights
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gryt-green mr-2" />
                    Connect with the community
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-gryt-green hover:bg-gryt-green/80 text-white rounded-xl border-2 border-black font-bold py-3 px-6 shadow-brutal"
            >
              {step < 3 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
