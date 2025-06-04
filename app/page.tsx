import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="container px-4 mx-auto pt-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-black">
            GRYT
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all duration-300"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup" className="hidden sm:block">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-20">
            <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tight leading-tight">
              One Habit a Day Can <span className="text-red-600">Change Everything</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-12 max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Track your habits, achieve your goals, and transform your life with Gryt - the all-in-one personal
              development platform.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/signup">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-xl border-2 border-black font-bold text-lg px-10 py-7 h-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]">
                  Start Your Journey <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-xl border-2 border-black font-bold text-lg px-10 py-7 h-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black hover:bg-black hover:text-white transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-16 text-center text-white">
            Transform Your Life With These <span className="text-red-500">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Habit & Goal Aggregation"
              description="Track habits from multiple sources in one place. Integrate with your favorite apps for fitness, nutrition, productivity, and more."
              icon="layers"
              color="bg-gradient-to-br from-red-600 to-red-800"
              isDark={true}
            />
            <FeatureCard
              title="AI-Driven Guide"
              description="Receive personalized nudges and insights based on your habits and goals. Your AI companion helps you stay on track."
              icon="sparkles"
              color="bg-gradient-to-br from-gray-700 to-gray-900"
              isDark={true}
            />
            <FeatureCard
              title="Unified Analytics"
              description="Visualize your progress with comprehensive analytics. See your streaks, trends, and insights all in one dashboard."
              icon="bar-chart"
              color="bg-gradient-to-br from-red-600 to-red-800"
              isDark={true}
            />
            <FeatureCard
              title="Reflection & Journaling"
              description="Document your journey with structured reflection prompts and an in-platform journal to track your growth."
              icon="book"
              color="bg-gradient-to-br from-gray-700 to-gray-900"
              isDark={true}
            />
            <FeatureCard
              title="Community Support"
              description="Connect with like-minded individuals for accountability, inspiration, and motivation on your personal development journey."
              icon="users"
              color="bg-gradient-to-br from-red-600 to-red-800"
              isDark={true}
            />
            <FeatureCard
              title="Curated Content Library"
              description="Access motivational resources tailored to your goals and habits. Articles, videos, and podcasts to fuel your growth."
              icon="library"
              color="bg-gradient-to-br from-gray-700 to-gray-900"
              isDark={true}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-16 text-center text-black">
            How <span className="text-red-600">Gryt</span> Works
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-red-600 border-4 border-black rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
                  1
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-bold mb-4 text-black">Onboarding & Goal Definition</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Define your goals, connect your favorite apps, and set up the habits that will help you achieve
                    success.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-black border-4 border-red-600 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] text-white">
                  2
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-bold mb-4 text-black">Dashboard & Daily Engagement</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Track your progress, get personalized insights, and stay motivated with your daily habit dashboard.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-red-600 border-4 border-black rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
                  3
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-bold mb-4 text-black">Logging & Progress Tracking</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Easily log your habits manually or automatically through integrations, and watch your progress grow
                    over time.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-black border-4 border-red-600 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] text-white">
                  4
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-2xl font-bold mb-4 text-black">Reflection & Adaptation</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Reflect on your progress weekly, journal your thoughts, and adapt your habits based on data-driven
                    insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-16 text-center text-black">
            Choose Your <span className="text-red-600">Plan</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
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
          </div>
          <p className="text-center mt-8 text-gray-600 text-lg">Save 17% with annual billing - $99/year</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-8">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your journey today and see results in as little as 90 days. One habit at a time.
          </p>
          <Link href="/signup">
            <Button className="bg-white hover:bg-gray-100 text-black rounded-xl border-4 border-black font-bold text-xl px-12 py-8 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]">
              Begin Your Transformation <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-black">GRYT</h2>
              <p className="text-gray-400 text-lg">One habit a day can change everything.</p>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="hover:text-red-400 transition-colors duration-300 text-lg">
                About
              </Link>
              <Link href="/privacy" className="hover:text-red-400 transition-colors duration-300 text-lg">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-red-400 transition-colors duration-300 text-lg">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-red-400 transition-colors duration-300 text-lg">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Gryt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
