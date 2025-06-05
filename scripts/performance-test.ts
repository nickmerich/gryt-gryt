#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

interface PerformanceTestResult {
  timestamp: string
  device: "mobile" | "desktop"
  metrics: {
    fcp: number
    lcp: number
    cls: number
    fid: number
    bundleSize: number
  }
  passed: boolean
  issues: string[]
}

const PERFORMANCE_BUDGETS = {
  mobile: { fcp: 1500, lcp: 2500, cls: 0.1, fid: 100, bundleSize: 500 },
  desktop: { fcp: 1000, lcp: 2000, cls: 0.1, fid: 50, bundleSize: 1000 },
}

async function runLighthouseTest(url: string, device: "mobile" | "desktop"): Promise<any> {
  const configFlag =
    device === "mobile" ? "--preset=perf --emulated-form-factor=mobile" : "--preset=perf --emulated-form-factor=desktop"

  try {
    const result = execSync(`npx lighthouse ${url} ${configFlag} --output=json --quiet`, { encoding: "utf8" })
    return JSON.parse(result)
  } catch (error) {
    console.error("Lighthouse test failed:", error)
    throw error
  }
}

async function analyzeBundleSize(): Promise<number> {
  try {
    const result = execSync("npx next build && npx next-bundle-analyzer --analyze", { encoding: "utf8" })
    // Parse bundle analyzer output to get total size
    const sizeMatch = result.match(/Total bundle size: (\d+\.?\d*) KB/)
    return sizeMatch ? Number.parseFloat(sizeMatch[1]) : 0
  } catch (error) {
    console.error("Bundle analysis failed:", error)
    return 0
  }
}

async function runPerformanceTest(url: string, device: "mobile" | "desktop"): Promise<PerformanceTestResult> {
  console.log(`Running performance test for ${device} device...`)

  const lighthouseResult = await runLighthouseTest(url, device)
  const bundleSize = await analyzeBundleSize()

  const metrics = {
    fcp: lighthouseResult.audits["first-contentful-paint"].numericValue,
    lcp: lighthouseResult.audits["largest-contentful-paint"].numericValue,
    cls: lighthouseResult.audits["cumulative-layout-shift"].numericValue,
    fid: lighthouseResult.audits["max-potential-fid"].numericValue,
    bundleSize,
  }

  const budget = PERFORMANCE_BUDGETS[device]
  const issues: string[] = []

  if (metrics.fcp > budget.fcp) issues.push(`FCP exceeded: ${metrics.fcp}ms > ${budget.fcp}ms`)
  if (metrics.lcp > budget.lcp) issues.push(`LCP exceeded: ${metrics.lcp}ms > ${budget.lcp}ms`)
  if (metrics.cls > budget.cls) issues.push(`CLS exceeded: ${metrics.cls} > ${budget.cls}`)
  if (metrics.fid > budget.fid) issues.push(`FID exceeded: ${metrics.fid}ms > ${budget.fid}ms`)
  if (metrics.bundleSize > budget.bundleSize)
    issues.push(`Bundle size exceeded: ${metrics.bundleSize}KB > ${budget.bundleSize}KB`)

  return {
    timestamp: new Date().toISOString(),
    device,
    metrics,
    passed: issues.length === 0,
    issues,
  }
}

async function main() {
  const url = process.argv[2] || "http://localhost:3000"

  console.log("Starting performance tests...")

  const mobileResult = await runPerformanceTest(url, "mobile")
  const desktopResult = await runPerformanceTest(url, "desktop")

  const results = { mobile: mobileResult, desktop: desktopResult }

  // Save results
  const resultsPath = path.join(process.cwd(), "performance-results.json")
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2))

  // Print summary
  console.log("\n=== Performance Test Results ===")
  console.log(`Mobile: ${mobileResult.passed ? "✅ PASSED" : "❌ FAILED"}`)
  if (mobileResult.issues.length > 0) {
    mobileResult.issues.forEach((issue) => console.log(`  - ${issue}`))
  }

  console.log(`Desktop: ${desktopResult.passed ? "✅ PASSED" : "❌ FAILED"}`)
  if (desktopResult.issues.length > 0) {
    desktopResult.issues.forEach((issue) => console.log(`  - ${issue}`))
  }

  // Exit with error code if tests failed
  if (!mobileResult.passed || !desktopResult.passed) {
    process.exit(1)
  }
}

main().catch(console.error)
