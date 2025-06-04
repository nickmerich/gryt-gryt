"use client"

interface ProgressChartProps {
  period: "week" | "month" | "year"
  isDarkMode?: boolean
}

export default function ProgressChart({ period, isDarkMode = false }: ProgressChartProps) {
  // Mock data for different periods
  const getChartData = () => {
    switch (period) {
      case "week":
        return [
          { label: "Mon", value: 80 },
          { label: "Tue", value: 100 },
          { label: "Wed", value: 60 },
          { label: "Thu", value: 90 },
          { label: "Fri", value: 70 },
          { label: "Sat", value: 85 },
          { label: "Sun", value: 95 },
        ]
      case "month":
        return [
          { label: "Week 1", value: 75 },
          { label: "Week 2", value: 82 },
          { label: "Week 3", value: 68 },
          { label: "Week 4", value: 91 },
        ]
      case "year":
        return [
          { label: "Jan", value: 65 },
          { label: "Feb", value: 72 },
          { label: "Mar", value: 78 },
          { label: "Apr", value: 85 },
          { label: "May", value: 82 },
          { label: "Jun", value: 88 },
        ]
      default:
        return []
    }
  }

  const data = getChartData()
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className={`font-bold text-sm sm:text-base ${isDarkMode ? "text-white" : "text-black"}`}>
          Habit Completion Rate
        </h3>
        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {period === "week" ? "This Week" : period === "month" ? "This Month" : "This Year"}
        </span>
      </div>

      <div className="h-40 sm:h-48 flex items-end justify-between gap-1 sm:gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-full rounded-t-lg sm:rounded-t-xl relative border-2 ${
                isDarkMode
                  ? "bg-gradient-to-t from-gray-800 to-gray-700 border-red-600"
                  : "bg-gradient-to-t from-gray-200 to-gray-300 border-black"
              }`}
              style={{ height: "120px" }}
            >
              <div
                className="bg-gradient-to-t from-red-500 via-red-400 to-red-300 rounded-t-lg sm:rounded-t-xl transition-all duration-500 ease-out shadow-inner"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white drop-shadow-lg">
                {item.value}%
              </div>
            </div>
            <span className={`text-xs font-semibold mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Average completion rate: {Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length)}%
        </p>
      </div>
    </div>
  )
}
