import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Suspense, lazy } from "react"
import OptimizedButton from "@/components/ui/optimized-button"
import OptimizedCard from "@/components/ui/optimized-card"
import DeviceDetector from "@/components/performance/device-detector"
import PerformanceMonitor from "@/components/performance/performance-monitor"

// Lazy load heavy components
const FeatureCard = lazy(() => import("@/components/feature-card"))
const PricingCard = lazy(() => import("@/components/pricing-card"))

// Loading fallback component
function ComponentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-xl border-4 border-black"></div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <>
      <DeviceDetector />
      <PerformanceMonitor />

      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo - Optimized */}
        <header className="container px-4 mx-auto pt-6 gpu-layer">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-brutal-title text-gryt-black">
              GRYT
            </Link>
            <div className="flex gap-4">
              <Link href="/login">
                <OptimizedButton variant="outline" size="default">
                  Login
                </OptimizedButton>
              </Link>
              <Link href="/signup" className="hidden sm:block">
                <OptimizedButton variant="default" size="default">
                  Sign Up
                </OptimizedButton>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section - Performance Optimized */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:py-32 gpu-layer">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-20">
              <h1 className="text-brutal-hero mb-8 tracking-tight leading-tight text-gryt-black">
                Build Habits That <span className="text-gryt-green">Change Everything</span>
              </h1>
              <p className="text-brutal-body mb-12 max-w-5xl mx-auto text-gray-700 leading-relaxed">
                🚀 Centralize habit tracking from all your apps. 📊 Leverage AI-driven insights. 💪 Achieve tangible
                results within 90 days. ✨ Transform into the person you aspire to be in just one year. Begin your
                journey today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/signup">
                  <OptimizedButton variant="default" size="large" className="critical-performance">
                    Start Your Journey <ArrowRight className="ml-3 h-6 w-6" />
                  </OptimizedButton>
                </Link>
                <Link href="/login">
                  <OptimizedButton variant="outline" size="large" className="critical-performance">
                    Login
                  </OptimizedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Lazy Loaded */}
        <section className="py-20 bg-gryt-black lazy-content">
          <div className="container px-4 mx-auto">
            <h2 className="text-brutal-title mb-16 text-center text-gryt-white">
              Transform Your Life With These <span className="text-gryt-green">Features</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Habit & Goal Aggregation"
                  description="Track habits from multiple sources in one place. Integrate with your favorite apps for fitness, nutrition, productivity, and more."
                  icon="layers"
                  color="bg-gradient-to-br from-green-600 to-green-800"
                  isDark={true}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="AI-Driven Guide"
                  description="Receive personalized nudges and insights based on your habits and goals. Your AI companion helps you stay on track."
                  icon="sparkles"
                  color="bg-gradient-to-br from-gray-700 to-gray-900"
                  isDark={true}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Unified Analytics"
                  description="Visualize your progress with comprehensive analytics. See your streaks, trends, and insights all in one dashboard."
                  icon="bar-chart"
                  color="bg-gradient-to-br from-green-600 to-green-800"
                  isDark={true}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Reflection & Journaling"
                  description="Document your journey with structured reflection prompts and an in-platform journal to track your growth."
                  icon="book"
                  color="bg-gradient-to-br from-gray-700 to-gray-900"
                  isDark={true}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Community Support"
                  description="Connect with like-minded individuals for accountability, inspiration, and motivation on your personal development journey."
                  icon="users"
                  color="bg-gradient-to-br from-green-600 to-green-800"
                  isDark={true}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Curated Content Library"
                  description="Access motivational resources tailored to your goals and habits. Articles, videos, and podcasts to fuel your growth."
                  icon="library"
                  color="bg-gradient-to-br from-gray-700 to-gray-900"
                  isDark={true}
                />
              </Suspense>
            </div>
          </div>
        </section>

        {/* How It Works Section - Optimized Cards */}
        <section className="py-20 bg-white lazy-content">
          <div className="container px-4 mx-auto">
            <h2 className="text-brutal-title mb-16 text-center text-gryt-black">
              How <span className="text-gryt-green">Gryt</span> Works
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 gap-12">
                {[
                  {
                    number: "1",
                    title: "Onboarding & Goal Definition",
                    description:
                      "Define your goals, connect your favorite apps, and set up the habits that will help you achieve success.",
                    variant: "green" as const,
                  },
                  {
                    number: "2",
                    title: "Dashboard & Daily Engagement",
                    description:
                      "Track your progress, get personalized insights, and stay motivated with your daily habit dashboard.",
                    variant: "black" as const,
                  },
                  {
                    number: "3",
                    title: "Logging & Progress Tracking",
                    description:
                      "Easily log your habits manually or automatically through integrations, and watch your progress grow over time.",
                    variant: "green" as const,
                  },
                  {
                    number: "4",
                    title: "Reflection & Adaptation",
                    description:
                      "Reflect on your progress weekly, journal your thoughts, and adapt your habits based on data-driven insights.",
                    variant: "black" as const,
                  },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                    <div
                      className={`
                      ${step.variant === "green" ? "bg-gryt-green border-gryt-black" : "bg-gryt-black border-gryt-green"}
                      border-4 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black 
                      shadow-brutal text-gryt-white gpu-layer
                    `}
                    >
                      {step.number}
                    </div>
                    <OptimizedCard className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-gryt-black">{step.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                    </OptimizedCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Lazy Loaded */}
        <section className="py-20 bg-gray-100 lazy-content">
          <div className="container px-4 mx-auto">
            <h2 className="text-brutal-title mb-16 text-center text-gryt-black">
              Choose Your <span className="text-gryt-green">Plan</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
              <Suspense fallback={<ComponentSkeleton />}>
                <PricingCard
                  title="Free"
                  price="$0"
                  description="Get started on your personal development journey"
                  features={[
                    "Unlimited manual habit creation",
                    "Basic integrations (up to 2 platforms)",
                    "Daily motivational AI nudges",
                    "Essential analytics",
                    "Community access",
                  ]}
                  buttonText="Get Started"
                  buttonLink="/signup"
                  highlighted={false}
                  isDark={false}
                />
              </Suspense>
              <Suspense fallback={<ComponentSkeleton />}>
                <PricingCard
                  title="Premium"
                  price="$9.99"
                  period="/month"
                  description="Unlock your full potential with advanced features"
                  features={[
                    "Unlimited integrations",
                    "Advanced AI coaching",
                    "Comprehensive analytics dashboard",
                    "Exclusive premium content library",
                    "Priority support",
                    "Advanced social features",
                  ]}
                  buttonText="Go Premium"
                  buttonLink="/signup?plan=premium"
                  highlighted={true}
                  isDark={false}
                />
              </Suspense>
            </div>
            <p className="text-center mt-8 text-gray-600 text-lg">Save 17% with annual billing - $99/year</p>
          </div>
        </section>

        {/* CTA Section - Critical Performance */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white critical-performance">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-brutal-title mb-8 text-gryt-white">Ready to Transform Your Life?</h2>
            <p className="text-brutal-body mb-12 max-w-3xl mx-auto leading-relaxed">
              Start your journey today and see results in as little as 90 days. One habit at a time.
            </p>
            <Link href="/signup">
              <OptimizedButton variant="white" size="large" className="critical-performance">
                Begin Your Transformation <ArrowRight className="ml-3 h-6 w-6" />
              </OptimizedButton>
            </Link>
          </div>
        </section>

        {/* Footer - Optimized */}
        <footer className="py-12 bg-gryt-black text-gryt-white gpu-layer">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-black">GRYT</h2>
                <p className="text-gray-400 text-lg">Build habits that change everything.</p>
              </div>
              <div className="flex gap-8">
                {["About", "Privacy", "Terms", "Contact"].map((link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-green-400 transition-colors duration-300 text-lg"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
              <p>© {new Date().getFullYear()} Gryt. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
