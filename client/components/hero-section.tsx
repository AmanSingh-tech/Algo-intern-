import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coral-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-6 sm:mb-8 bg-turquoise-100 text-turquoise-800 border-turquoise-200 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Welcome to the Future of Coding
          </Badge>

          <h1 className="display-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-none">
            <span className="bg-gradient-to-r from-navy-900 via-turquoise-600 to-navy-800 bg-clip-text text-transparent block">
              Code.
            </span>
            <span className="bg-gradient-to-r from-turquoise-600 via-coral-500 to-turquoise-700 bg-clip-text text-transparent block">
              Compete.
            </span>
            <span className="bg-gradient-to-r from-coral-500 via-navy-700 to-turquoise-600 bg-clip-text text-transparent block">
              Conquer.
            </span>
          </h1>

          <p className="body-text text-base sm:text-lg lg:text-xl text-navy-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Your comprehensive platform for developer growth. Track contests, find internships, and build your coding
            career with our AI-powered insights and vibrant community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <Button
              size="lg"
              className="gradient-turquoise hover:shadow-xl hover:shadow-turquoise-500/25 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 w-full sm:w-auto"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm w-full sm:w-auto"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Stats with responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-turquoise-100 shadow-lg">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-turquoise-600 mb-1 sm:mb-2">50K+</div>
              <div className="text-navy-600 font-medium text-sm sm:text-base">Active Developers</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-coral-100 shadow-lg">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-coral-500 mb-1 sm:mb-2">2.5K+</div>
              <div className="text-navy-600 font-medium text-sm sm:text-base">Internships Posted</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-navy-100 shadow-lg">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-700 mb-1 sm:mb-2">500+</div>
              <div className="text-navy-600 font-medium text-sm sm:text-base">Contests Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
