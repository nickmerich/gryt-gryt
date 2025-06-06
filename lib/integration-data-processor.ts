export interface ProcessedIntegrationData {
  provider: string
  type: string
  chartData: any[]
  summary: {
    total: number
    average: number
    trend: "up" | "down" | "stable"
    change: number
  }
  lastUpdated: Date
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
  category?: string
}

export class IntegrationDataProcessor {
  static processFitnessData(rawData: any[], provider: string): ProcessedIntegrationData {
    const last30Days = this.getLast30Days()

    const chartData = last30Days.map((date) => {
      const dayData = rawData.find((d) => d.date === date)
      return {
        date,
        steps: dayData?.steps || 0,
        calories: dayData?.calories || 0,
        distance: dayData?.distance || 0,
        activeMinutes: dayData?.activeMinutes || 0,
      }
    })

    const totalSteps = chartData.reduce((sum, day) => sum + day.steps, 0)
    const avgSteps = totalSteps / chartData.length
    const trend = this.calculateTrend(chartData.map((d) => d.steps))

    return {
      provider,
      type: "fitness",
      chartData,
      summary: {
        total: totalSteps,
        average: Math.round(avgSteps),
        trend: trend.direction,
        change: trend.percentage,
      },
      lastUpdated: new Date(),
    }
  }

  static processNutritionData(rawData: any[], provider: string): ProcessedIntegrationData {
    const last30Days = this.getLast30Days()

    const chartData = last30Days.map((date) => {
      const dayData = rawData.find((d) => d.date === date)
      return {
        date,
        calories: dayData?.calories || 0,
        protein: dayData?.protein || 0,
        carbs: dayData?.carbs || 0,
        fat: dayData?.fat || 0,
        water: dayData?.water || 0,
      }
    })

    const totalCalories = chartData.reduce((sum, day) => sum + day.calories, 0)
    const avgCalories = totalCalories / chartData.length
    const trend = this.calculateTrend(chartData.map((d) => d.calories))

    return {
      provider,
      type: "nutrition",
      chartData,
      summary: {
        total: totalCalories,
        average: Math.round(avgCalories),
        trend: trend.direction,
        change: trend.percentage,
      },
      lastUpdated: new Date(),
    }
  }

  static processProductivityData(rawData: any[], provider: string): ProcessedIntegrationData {
    const last30Days = this.getLast30Days()

    const chartData = last30Days.map((date) => {
      const dayData = rawData.find((d) => d.date === date)
      return {
        date,
        screenTime: dayData?.screenTime || 0,
        focusTime: dayData?.focusTime || 0,
        distractions: dayData?.distractions || 0,
        productivity: dayData?.productivity || 0,
      }
    })

    const totalScreenTime = chartData.reduce((sum, day) => sum + day.screenTime, 0)
    const avgScreenTime = totalScreenTime / chartData.length
    const trend = this.calculateTrend(chartData.map((d) => d.screenTime))

    return {
      provider,
      type: "productivity",
      chartData,
      summary: {
        total: Math.round(totalScreenTime / 60), // Convert to hours
        average: Math.round(avgScreenTime / 60),
        trend: trend.direction,
        change: trend.percentage,
      },
      lastUpdated: new Date(),
    }
  }

  static processReadingData(rawData: any[], provider: string): ProcessedIntegrationData {
    const last30Days = this.getLast30Days()

    const chartData = last30Days.map((date) => {
      const dayData = rawData.find((d) => d.date === date)
      return {
        date,
        pagesRead: dayData?.pagesRead || 0,
        minutesRead: dayData?.minutesRead || 0,
        booksCompleted: dayData?.booksCompleted || 0,
      }
    })

    const totalPages = chartData.reduce((sum, day) => sum + day.pagesRead, 0)
    const avgPages = totalPages / chartData.length
    const trend = this.calculateTrend(chartData.map((d) => d.pagesRead))

    return {
      provider,
      type: "reading",
      chartData,
      summary: {
        total: totalPages,
        average: Math.round(avgPages),
        trend: trend.direction,
        change: trend.percentage,
      },
      lastUpdated: new Date(),
    }
  }

  static processSocialData(rawData: any[], provider: string): ProcessedIntegrationData {
    const last30Days = this.getLast30Days()

    const chartData = last30Days.map((date) => {
      const dayData = rawData.find((d) => d.date === date)
      return {
        date,
        posts: dayData?.posts || 0,
        likes: dayData?.likes || 0,
        comments: dayData?.comments || 0,
        shares: dayData?.shares || 0,
        engagement: dayData?.engagement || 0,
      }
    })

    const totalPosts = chartData.reduce((sum, day) => sum + day.posts, 0)
    const avgPosts = totalPosts / chartData.length
    const trend = this.calculateTrend(chartData.map((d) => d.posts))

    return {
      provider,
      type: "social",
      chartData,
      summary: {
        total: totalPosts,
        average: Math.round(avgPosts * 10) / 10,
        trend: trend.direction,
        change: trend.percentage,
      },
      lastUpdated: new Date(),
    }
  }

  private static getLast30Days(): string[] {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split("T")[0])
    }
    return days
  }

  private static calculateTrend(values: number[]): { direction: "up" | "down" | "stable"; percentage: number } {
    if (values.length < 2) return { direction: "stable", percentage: 0 }

    const firstHalf = values.slice(0, Math.floor(values.length / 2))
    const secondHalf = values.slice(Math.floor(values.length / 2))

    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length

    if (firstAvg === 0) return { direction: "stable", percentage: 0 }

    const change = ((secondAvg - firstAvg) / firstAvg) * 100

    if (Math.abs(change) < 5) return { direction: "stable", percentage: Math.round(change) }
    return {
      direction: change > 0 ? "up" : "down",
      percentage: Math.round(Math.abs(change)),
    }
  }
}
