#!/usr/bin/env node

import { execSync } from "child_process"

interface DeploymentConfig {
  environment: "staging" | "production"
  databaseUrl: string
  domain: string
  features: string[]
}

async function deployMVP(config: DeploymentConfig) {
  console.log(`🚀 Starting ${config.environment} deployment...`)

  try {
    // 1. Build application
    console.log("📦 Building application...")
    execSync("npm run build", { stdio: "inherit" })

    // 2. Run tests
    console.log("🧪 Running tests...")
    execSync("npm run test", { stdio: "inherit" })

    // 3. Security scan
    console.log("🔒 Running security scan...")
    execSync("npm audit --audit-level moderate", { stdio: "inherit" })

    // 4. Performance check
    console.log("⚡ Performance check...")
    execSync("npm run lighthouse:desktop", { stdio: "inherit" })

    // 5. Deploy to Vercel
    console.log("🌐 Deploying to Vercel...")
    execSync(`vercel --prod --confirm`, { stdio: "inherit" })

    console.log("✅ Deployment completed successfully!")

    // 6. Post-deployment verification
    await verifyDeployment(config.domain)
  } catch (error) {
    console.error("❌ Deployment failed:", error)
    process.exit(1)
  }
}

async function verifyDeployment(domain: string) {
  console.log("🔍 Verifying deployment...")

  // Health check
  const response = await fetch(`https://${domain}/api/health`)
  if (!response.ok) {
    throw new Error("Health check failed")
  }

  console.log("✅ Deployment verification passed!")
}

// Run deployment
const config: DeploymentConfig = {
  environment: (process.argv[2] as "staging" | "production") || "staging",
  databaseUrl: process.env.NEON_DATABASE_URL || "",
  domain: process.env.VERCEL_URL || "localhost:3000",
  features: ["habits", "analytics", "gamification"],
}

deployMVP(config).catch(console.error)
