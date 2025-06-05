"use client"

interface ProgressRingsProps {
  level: number
  currentGP: number
  nextLevelGP: number
  isDarkMode: boolean
}

export default function ProgressRings({ level, currentGP, nextLevelGP, isDarkMode }: ProgressRingsProps) {
  const progressPercentage = (currentGP / nextLevelGP) * 100
  const circumference = 2 * Math.PI * 45 // radius of 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
      {/* Background Circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke={isDarkMode ? "#374151" : "#E5E7EB"} strokeWidth="8" fill="transparent" />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>

      {/* Level Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-xl sm:text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{level}</div>
        <div className={`text-xs font-bold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>LEVEL</div>
      </div>

      {/* GP Display */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            isDarkMode
              ? "bg-green-600/20 text-green-300 border border-green-500/30"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {currentGP} GP
        </div>
      </div>
    </div>
  )
}
