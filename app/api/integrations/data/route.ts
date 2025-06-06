import { type NextRequest, NextResponse } from "next/server"
import { getUserFromSession } from "@/lib/auth"
import { getUserIntegrations } from "@/lib/integration-service"
import { IntegrationDataProcessor } from "@/lib/integration-data-processor"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const provider = searchParams.get("provider")
    const type = searchParams.get("type")

    const integrations = await getUserIntegrations(user.id)

    let filteredIntegrations = integrations.filter((i) => i.isActive)

    if (provider) {
      filteredIntegrations = filteredIntegrations.filter((i) => i.provider === provider)
    }

    if (type) {
      filteredIntegrations = filteredIntegrations.filter((i) => i.type === type)
    }

    const processedData = []

    for (const integration of filteredIntegrations) {
      // Generate mock data for demonstration
      const mockData = generateMockData(integration.type, integration.provider)

      let processed
      switch (integration.type) {
        case "fitness":
          processed = IntegrationDataProcessor.processFitnessData(mockData, integration.provider)
          break
        case "nutrition":
          processed = IntegrationDataProcessor.processNutritionData(mockData, integration.provider)
          break
        case "productivity":
          processed = IntegrationDataProcessor.processProductivityData(mockData, integration.provider)
          break
        case "reading":
          processed = IntegrationDataProcessor.processReadingData(mockData, integration.provider)
          break
        case "social":
          processed = IntegrationDataProcessor.processSocialData(mockData, integration.provider)
          break
        default:
          continue
      }

      processedData.push(processed)
    }

    return NextResponse.json({ data: processedData })
  } catch (error) {
    console.error("Failed to get integration data:", error)
    return NextResponse.json({ error: "Failed to get integration data" }, { status: 500 })
  }
}

function generateMockData(type: string, provider: string) {
  const data = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    switch (type) {
      case "fitness":
        data.push({
          date: dateStr,
          steps: Math.floor(Math.random() * 5000) + 5000,
          calories: Math.floor(Math.random() * 1000) + 1500,
          distance: Math.floor(Math.random() * 10) + 3,
          activeMinutes: Math.floor(Math.random() * 60) + 30,
        })
        break
      case "nutrition":
        data.push({
          date: dateStr,
          calories: Math.floor(Math.random() * 800) + 1200,
          protein: Math.floor(Math.random() * 50) + 50,
          carbs: Math.floor(Math.random() * 100) + 150,
          fat: Math.floor(Math.random() * 30) + 40,
          water: Math.floor(Math.random() * 4) + 6,
        })
        break
      case "productivity":
        data.push({
          date: dateStr,
          screenTime: Math.floor(Math.random() * 300) + 180, // minutes
          focusTime: Math.floor(Math.random() * 120) + 60,
          distractions: Math.floor(Math.random() * 20) + 5,
          productivity: Math.floor(Math.random() * 40) + 60,
        })
        break
      case "reading":
        data.push({
          date: dateStr,
          pagesRead: Math.floor(Math.random() * 30) + 10,
          minutesRead: Math.floor(Math.random() * 60) + 30,
          booksCompleted: Math.random() > 0.9 ? 1 : 0,
        })
        break
      case "social":
        data.push({
          date: dateStr,
          posts: Math.floor(Math.random() * 5),
          likes: Math.floor(Math.random() * 100) + 20,
          comments: Math.floor(Math.random() * 20) + 5,
          shares: Math.floor(Math.random() * 10),
          engagement: Math.floor(Math.random() * 50) + 25,
        })
        break
    }
  }

  return data
}
