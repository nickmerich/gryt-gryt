import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Suspense, lazy } from "react"
import OptimizedButton from "@/components/ui/optimized-button"
import OptimizedCard from "@/components/ui/optimized-card"
import DeviceDetector from "@/components/performance/device-detector"
import PerformanceMonitor from "@/components/performance/performance-monitor"
import TrackProgressSection from "@/components/landing/track-progress-section"

// Lazy load heavy components
const FeatureCard = lazy(() => import("@/components/feature-card"))
const PricingCard = lazy(() => import("@/components/pricing-card"))

// Loading fallback component
function ComponentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-80 bg-gryt-gray-200 rounded-xl border-4 border-gryt-black shadow-brutal"></div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <>
      <DeviceDetector />
      <PerformanceMonitor />

      <div className="min-h-screen bg-gryt-white">
        {/* Header with Logo - Optimized */}
        <header className="container px-4 mx-auto pt-6 gpu-layer">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-brutal-title text-gryt-black font-black">
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
              <h1 className="text-brutal-hero mb-8 tracking-tight leading-tight text-gryt-black font-black">
                Build Habits That <span className="text-gryt-green">Change Everything</span>
              </h1>
              <p className="text-brutal-body mb-12 max-w-5xl mx-auto text-gryt-black leading-relaxed font-medium">
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

        {/* Features Section - Redesigned with Brutal Aesthetic */}
        <section className="py-20 bg-gryt-black lazy-content">
          <div className="container px-4 mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2
                className="text-brutal-title mb-6 text-gryt-white font-black"
                style={{
                  color: "#FFFFFF",
                  textShadow: "2px 2px 0px #22c55e, 4px 4px 0px #16a34a, 6px 6px 0px rgba(34, 197, 94, 0.3)",
                  fontWeight: "900",
                }}
              >
                Your Daily Growth Stack
              </h2>
              <p className="text-xl text-gryt-white max-w-3xl mx-auto leading-relaxed font-medium">
                Powerful tools designed to help you build lasting habits and achieve your goals
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Suspense fallback={<ComponentSkeleton />}>
                <FeatureCard
                  title="Habit & Goal Aggregation"
                  description="Track habits from multiple sources in one place. Integrate with your favorite apps for fitness, nutrition, productivity, and more."
                  icon="layers"
                  color="bg-gradient-to-br from-green-600 to-green-800"
                  isDark={false}
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
                  isDark={false}
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
                  isDark={false}
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

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <Link href="/signup">
                <OptimizedButton variant="default" size="large">
                  Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
                </OptimizedButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section - Lazy Loaded */}
        <section className="py-20 bg-gryt-white lazy-content">
          <div className="container px-4 mx-auto">
            <h2 className="text-brutal-title mb-16 text-center text-gryt-black font-black">
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
            <p className="text-center mt-8 text-gryt-black text-lg font-medium">
              Save 17% with annual billing - $99/year
            </p>
          </div>
        </section>

        {/* Track Your Progress Section */}
        <TrackProgressSection />

        {/* How It Works Section - Optimized Cards */}
        <section className="py-20 bg-gryt-white lazy-content">
          <div className="container px-4 mx-auto">
            <h2 className="text-brutal-title mb-16 text-center text-gryt-black font-black">
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
                        ${step.variant === "green" ? "bg-gryt-green border-gryt-black shadow-white-lg" : "bg-gryt-black border-gryt-black shadow-brutal"}
                        border-4 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black 
                        text-gryt-white gpu-layer hover:shadow-brutal-lg hover:translate-y-[-2px] transition-all duration-300
                      `}
                    >
                      {step.number}
                    </div>
                    <OptimizedCard className="flex-1">
                      <h3 className="text-2xl font-black mb-4 text-gryt-black">{step.title}</h3>
                      <p className="text-gryt-black text-lg leading-relaxed font-medium">{step.description}</p>
                    </OptimizedCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Critical Performance */}
        <section className="py-20 bg-gryt-green text-gryt-white critical-performance shadow-white-xl">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-brutal-title mb-8 text-gryt-white font-black">Ready to Transform Your Life?</h2>
            <p className="text-brutal-body mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
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
                <p className="text-gryt-white text-lg font-medium">Build habits that change everything.</p>
              </div>
              <div className="flex gap-8">
                {["About", "Privacy", "Terms", "Contact"].map((link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-gryt-green transition-colors duration-300 text-lg font-medium"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gryt-white text-center">
              <p className="font-medium">© {new Date().getFullYear()} Gryt. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
