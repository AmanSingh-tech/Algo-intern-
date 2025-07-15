import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Github, ArrowRight, Sparkles, Code2, Trophy } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements - responsive */}
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise-50 via-transparent to-coral-50 rounded-2xl sm:rounded-3xl opacity-60" />
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-turquoise-200/30 to-turquoise-300/20 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-coral-200/30 to-coral-300/20 rounded-full blur-2xl sm:blur-3xl" />

      {/* Floating Code Elements - responsive positioning */}
      <div className="absolute top-16 sm:top-32 right-16 sm:right-32 float-animation hidden sm:block">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-turquoise-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
          <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>
      <div
        className="absolute bottom-16 sm:bottom-32 left-16 sm:left-32 float-animation hidden sm:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-coral-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge - responsive sizing */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <Badge
            variant="outline"
            className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-turquoise-50 text-turquoise-700 border-turquoise-200 rounded-full shadow-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            New: AI-Powered Code Review
          </Badge>
        </div>

        {/* Main Heading - responsive text sizing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-navy-900 mb-4 sm:mb-6 leading-tight">
          Your Journey.{" "}
          <span className="bg-gradient-to-r from-turquoise-500 via-turquoise-600 to-coral-500 bg-clip-text text-transparent">
            Your Success.
          </span>
        </h1>

        {/* Subtitle - responsive text sizing */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-navy-700 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
          Master coding challenges, compete in contests, and accelerate your programming career with our comprehensive
          platform designed for developers at every level.
        </p>

        {/* CTA Buttons - responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg">
            Start Coding Now
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-navy-200 text-navy-700 hover:bg-navy-50 font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-sm sm:text-base lg:text-lg bg-transparent"
          >
            <Github className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            View on GitHub
          </Button>
        </div>

        {/* Stats - responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-turquoise-600 mb-1">10K+</div>
            <div className="text-xs sm:text-sm text-navy-600 font-medium">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-coral-500 mb-1">500+</div>
            <div className="text-xs sm:text-sm text-navy-600 font-medium">Challenges</div>
          </div>
          <div className="text-center col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-navy-700 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-navy-600 font-medium">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
