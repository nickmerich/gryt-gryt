import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header with Logo */}
      <header className="container px-4 mx-auto pt-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-black">
            GRYT
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="rounded-xl border-2 border-black font-bold">
                Login
              </Button>
            </Link>
            <Link href="/signup" className="hidden sm:block">
              <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-20">
            <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
              One Habit a Day Can <span className="text-purple-600">Change Everything</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Track your habits, achieve your goals, and transform your life with Gryt - the all-in-one personal
              development platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold text-lg px-8 py-6 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-xl border-2 border-black font-bold text-lg px-8 py-6 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y-4 border-black">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Transform Your Life With These Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Habit & Goal Aggregation"
              description="Track habits from multiple sources in one place. Integrate with your favorite apps for fitness, nutrition, productivity, and more."
              icon="layers"
              color="bg-gradient-to-br from-blue-500 to-purple-500"
            />
            <FeatureCard
              title="AI-Driven Guide"
              description="Receive personalized nudges and insights based on your habits and goals. Your AI companion helps you stay on track."
              icon="sparkles"
              color="bg-gradient-to-br from-pink-500 to-orange-500"
            />
            <FeatureCard
              title="Unified Analytics"
              description="Visualize your progress with comprehensive analytics. See your streaks, trends, and insights all in one dashboard."
              icon="bar-chart"
              color="bg-gradient-to-br from-green-500 to-teal-500"
            />
            <FeatureCard
              title="Reflection & Journaling"
              description="Document your journey with structured reflection prompts and an in-platform journal to track your growth."
              icon="book"
              color="bg-gradient-to-br from-yellow-500 to-amber-500"
            />
            <FeatureCard
              title="Community Support"
              description="Connect with like-minded individuals for accountability, inspiration, and motivation on your personal development journey."
              icon="users"
              color="bg-gradient-to-br from-red-500 to-pink-500"
            />
            <FeatureCard
              title="Curated Content Library"
              description="Access motivational resources tailored to your goals and habits. Articles, videos, and podcasts to fuel your growth."
              icon="library"
              color="bg-gradient-to-br from-indigo-500 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-purple-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">How Gryt Works</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white border-4 border-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  1
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-2">Onboarding & Goal Definition</h3>
                  <p>
                    Define your goals, connect your favorite apps, and set up the habits that will help you achieve
                    success.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white border-4 border-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  2
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-2">Dashboard & Daily Engagement</h3>
                  <p>
                    Track your progress, get personalized insights, and stay motivated with your daily habit dashboard.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white border-4 border-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  3
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-2">Logging & Progress Tracking</h3>
                  <p>
                    Easily log your habits manually or automatically through integrations, and watch your progress grow
                    over time.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white border-4 border-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  4
                </div>
                <div className="flex-1 bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-2">Reflection & Adaptation</h3>
                  <p>
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
      <section className="py-16 bg-white border-y-4 border-black">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Choose Your Plan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
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
            />
          </div>
          <p className="text-center mt-6 text-gray-600">Save 17% with annual billing - $99/year</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey today and see results in as little as 90 days. One habit at a time.
          </p>
          <Link href="/signup">
            <Button className="bg-white hover:bg-gray-100 text-black rounded-xl border-2 border-black font-bold text-lg px-8 py-6 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)]">
              Begin Your Transformation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-black">GRYT</h2>
              <p className="text-gray-400">One habit a day can change everything.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-purple-400">
                About
              </Link>
              <Link href="/privacy" className="hover:text-purple-400">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-purple-400">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-purple-400">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Gryt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
