interface BetaMetricsCardProps {
  title: string
  value: number
  total: number
  label: string
}

export default function BetaMetricsCard({ title, value, total, label }: BetaMetricsCardProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className="bg-white border-4 border-black p-6 shadow-brutal">
      <h3 className="text-lg font-bold text-black mb-2">{title}</h3>

      <div className="flex items-end justify-between mb-2">
        <div className="text-4xl font-bold text-green-500">{value}</div>
        <div className="text-xl font-bold text-black">{percentage}%</div>
      </div>

      <div className="w-full bg-gray-200 h-4 border-2 border-black">
        <div className="bg-green-500 h-full" style={{ width: `${percentage}%` }}></div>
      </div>

      <p className="text-sm text-gray-600 mt-2">{label}</p>
    </div>
  )
}
