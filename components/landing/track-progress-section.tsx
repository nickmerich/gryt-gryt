"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Activity, BookOpen, Apple, Flame, Target, Trophy, TrendingUp } from "lucide-react"

const fitnessData = [
  { day: "Mon", steps: 8400, target: 10000 },
  { day: "Tue", steps: 9200, target: 10000 },
  { day: "Wed", steps: 10500, target: 10000 },
  { day: "Thu", steps: 9800, target: 10000 },
  { day: "Fri", steps: 11200, target: 10000 },
  { day: "Sat", steps: 7500, target: 10000 },
  { day: "Sun", steps: 12300, target: 10000 },
]

const readingData = [
  { day: "Mon", pages: 15, target: 20 },
  { day: "Tue", pages: 22, target: 20 },
  { day: "Wed", pages: 18, target: 20 },
  { day: "Thu", pages: 25, target: 20 },
  { day: "Fri", pages: 20, target: 20 },
  { day: "Sat", pages: 30, target: 20 },
  { day: "Sun", pages: 15, target: 20 },
]

const nutritionData = [
  { day: "Mon", calories: 2100, target: 2000 },
  { day: "Tue", calories: 1950, target: 2000 },
  { day: "Wed", calories: 2200, target: 2000 },
  { day: "Thu", calories: 1850, target: 2000 },
  { day: "Fri", calories: 2050, target: 2000 },
  { day: "Sat", calories: 2300, target: 2000 },
  { day: "Sun", calories: 1900, target: 2000 },
]

const streakData = [
  { habit: "Exercise", current: 12, best: 21, icon: <Activity className="h-5 w-5" /> },
  { habit: "Reading", current: 8, best: 14, icon: <BookOpen className="h-5 w-5" /> },
  { habit: "Nutrition", current: 5, best: 30, icon: <Apple className="h-5 w-5" /> },
]

export default function TrackProgressSection() {
  const [activeTab, setActiveTab] = useState("fitness")

  return (
    <section className="py-20 bg-gryt-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-brutal-title mb-6 text-center text-gryt-black">
            Track Your <span className="text-gryt-green">Progress</span>
          </h2>
          <p className="text-brutal-body max-w-3xl mx-auto text-gryt-gray-700 leading-relaxed">
            Visualize your journey with powerful analytics. Set goals, track streaks, and watch your habits transform
            into lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* KPI Cards */}
          <Card className="border-4 border-gryt-black rounded-xl p-6 shadow-brutal bg-gryt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gryt-green p-3 rounded-full">
                  <Target className="h-6 w-6 text-gryt-white" />
                </div>
                <h3 className="text-xl font-bold text-gryt-black">Goal Completion</h3>
              </div>
              <span className="text-3xl font-black text-gryt-black">78%</span>
            </div>
            <div className="h-2 bg-gryt-gray-200 rounded-full mb-2">
              <div className="h-2 bg-gryt-green rounded-full" style={{ width: "78%" }}></div>
            </div>
            <div className="flex justify-between text-sm text-gryt-gray-600">
              <span>This Week</span>
              <span className="flex items-center gap-1 text-gryt-green">
                <TrendingUp className="h-4 w-4" /> +12%
              </span>
            </div>
          </Card>

          <Card className="border-4 border-gryt-black rounded-xl p-6 shadow-brutal bg-gryt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gryt-green p-3 rounded-full">
                  <Flame className="h-6 w-6 text-gryt-white" />
                </div>
                <h3 className="text-xl font-bold text-gryt-black">Active Streaks</h3>
              </div>
              <span className="text-3xl font-black text-gryt-black">5</span>
            </div>
            <div className="space-y-2">
              {streakData.map((streak, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {streak.icon}
                    <span className="text-gryt-black">{streak.habit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-gryt-green" />
                    <span className="font-bold text-gryt-black">{streak.current}</span>
                    <span className="text-xs text-gryt-gray-500">/ {streak.best}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-4 border-gryt-black rounded-xl p-6 shadow-brutal bg-gryt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gryt-green p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-gryt-white" />
                </div>
                <h3 className="text-xl font-bold text-gryt-black">Achievements</h3>
              </div>
              <span className="text-3xl font-black text-gryt-black">12</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-full flex items-center justify-center text-lg ${
                    index < 5 ? "bg-gryt-green text-gryt-white" : "bg-gryt-gray-200 text-gryt-gray-400"
                  }`}
                >
                  {index === 0 && "🔥"}
                  {index === 1 && "📚"}
                  {index === 2 && "💪"}
                  {index === 3 && "🧘"}
                  {index === 4 && "💧"}
                  {index === 5 && "?"}
                  {index === 6 && "?"}
                  {index === 7 && "?"}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="border-4 border-gryt-black rounded-xl overflow-hidden shadow-brutal bg-gryt-white">
          <div className="bg-gryt-black p-6 text-gryt-white">
            <Tabs defaultValue="fitness" onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-gryt-gray-800 border-2 border-gryt-green rounded-xl p-1 mb-6">
                <TabsTrigger
                  value="fitness"
                  className="rounded-lg data-[state=active]:bg-gryt-green data-[state=active]:text-gryt-white font-bold text-gryt-white"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Fitness
                </TabsTrigger>
                <TabsTrigger
                  value="reading"
                  className="rounded-lg data-[state=active]:bg-gryt-green data-[state=active]:text-gryt-white font-bold text-gryt-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Reading
                </TabsTrigger>
                <TabsTrigger
                  value="nutrition"
                  className="rounded-lg data-[state=active]:bg-gryt-green data-[state=active]:text-gryt-white font-bold text-gryt-white"
                >
                  <Apple className="h-4 w-4 mr-2" />
                  Nutrition
                </TabsTrigger>
              </TabsList>

              <div className="bg-gryt-white text-gryt-black p-6 -mx-6 -mb-6">
                <TabsContent value="fitness" className="mt-0">
                  <h3 className="text-xl font-bold mb-4 text-gryt-black">Daily Steps</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fitnessData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="day" stroke="#000000" />
                        <YAxis stroke="#000000" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #000000",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="steps" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <ReferenceLine y={10000} stroke="#000000" strokeWidth={2} strokeDasharray="5 5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-green rounded-full"></div>
                      <span className="text-gryt-black">Daily Steps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-black rounded-full"></div>
                      <span className="text-gryt-black">Target (10,000 steps)</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reading" className="mt-0">
                  <h3 className="text-xl font-bold mb-4 text-gryt-black">Pages Read</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={readingData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="day" stroke="#000000" />
                        <YAxis stroke="#000000" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #000000",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="pages"
                          stroke="#22c55e"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "#22c55e" }}
                        />
                        <ReferenceLine y={20} stroke="#000000" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-green rounded-full"></div>
                      <span className="text-gryt-black">Pages Read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-black rounded-full"></div>
                      <span className="text-gryt-black">Target (20 pages)</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-0">
                  <h3 className="text-xl font-bold mb-4 text-gryt-black">Calorie Intake</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={nutritionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="day" stroke="#000000" />
                        <YAxis stroke="#000000" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #000000",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="calories"
                          stroke="#22c55e"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "#22c55e" }}
                        />
                        <ReferenceLine y={2000} stroke="#000000" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-green rounded-full"></div>
                      <span className="text-gryt-black">Calories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gryt-black rounded-full"></div>
                      <span className="text-gryt-black">Target (2,000 calories)</span>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Card>

        {/* Streak Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <Card className="border-4 border-gryt-black rounded-xl p-6 shadow-brutal bg-gryt-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gryt-green p-3 rounded-full">
                <Flame className="h-6 w-6 text-gryt-white" />
              </div>
              <h3 className="text-xl font-bold text-gryt-black">Exercise Streak</h3>
              <div className="ml-auto bg-gryt-green text-gryt-white px-3 py-1 rounded-full font-bold text-sm">
                12 Day Streak
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {[...Array(28)].map((_, index) => {
                const isCompleted = index < 12 || index === 13 || index === 14 || index === 16 || index === 17
                const isToday = index === 12
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-md flex items-center justify-center border-2 ${
                      isToday
                        ? "border-gryt-green bg-gryt-green/10"
                        : isCompleted
                          ? "bg-gryt-green border-gryt-green text-gryt-white"
                          : "border-gryt-gray-300 bg-gryt-gray-50"
                    }`}
                  >
                    {isCompleted && !isToday && "✓"}
                    {isToday && "•"}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between text-sm text-gryt-gray-600">
              <span>4 weeks ago</span>
              <span>Today</span>
            </div>

            <div className="mt-6 p-4 bg-gryt-green/10 border-2 border-gryt-green rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gryt-green" />
                  <span className="font-bold text-gryt-black">Next Milestone: 14 Days</span>
                </div>
                <span className="text-sm text-gryt-black">+200 GP</span>
              </div>
              <div className="h-2 bg-gryt-gray-200 rounded-full">
                <div className="h-2 bg-gryt-green rounded-full" style={{ width: "85%" }}></div>
              </div>
              <div className="text-right text-xs mt-1 text-gryt-gray-600">2 days to go</div>
            </div>
          </Card>

          <Card className="border-4 border-gryt-black rounded-xl p-6 shadow-brutal bg-gryt-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gryt-green p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-gryt-white" />
              </div>
              <h3 className="text-xl font-bold text-gryt-black">Reading Progress</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gryt-black">Weekly Goal</span>
                  <span className="text-gryt-black">140 / 140 pages</span>
                </div>
                <div className="h-4 bg-gryt-gray-200 rounded-full">
                  <div className="h-4 bg-gryt-green rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gryt-black">Monthly Goal</span>
                  <span className="text-gryt-black">450 / 600 pages</span>
                </div>
                <div className="h-4 bg-gryt-gray-200 rounded-full">
                  <div className="h-4 bg-gryt-green rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gryt-black">Books Completed</span>
                  <span className="text-gryt-black">3 / 5</span>
                </div>
                <div className="h-4 bg-gryt-gray-200 rounded-full">
                  <div className="h-4 bg-gryt-green rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border-2 border-gryt-green rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-gryt-black">8</div>
                  <div className="text-xs text-gryt-gray-600">Current Streak</div>
                </div>
                <div className="border-2 border-gryt-green rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-gryt-black">14</div>
                  <div className="text-xs text-gryt-gray-600">Best Streak</div>
                </div>
                <div className="border-2 border-gryt-green rounded-lg p-3 text-center">
                  <div className="text-2xl font-black text-gryt-black">85%</div>
                  <div className="text-xs text-gryt-gray-600">Completion Rate</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
