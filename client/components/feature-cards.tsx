import { Search, ArrowRight, Target, Users, Code2, Trophy, BookOpen, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Search,
    title: "Smart Internship Matching",
    description:
      "AI-powered matching system that connects you with the perfect internship opportunities based on your skills and career goals.",
    gradient: "gradient-turquoise",
    iconBg: "bg-turquoise-100",
    iconColor: "text-turquoise-600",
    stats: "2,500+ opportunities",
    badge: "AI-Powered",
    badgeColor: "bg-turquoise-500",
  },
  {
    icon: Trophy,
    title: "Contest Tracking Hub",
    description:
      "Never miss a coding competition with our intelligent contest calendar, personalized notifications, and performance analytics.",
    gradient: "gradient-coral",
    iconBg: "bg-coral-100",
    iconColor: "text-coral-600",
    stats: "500+ contests tracked",
    badge: "Live Updates",
    badgeColor: "bg-coral-500",
  },
  {
    icon: Code2,
    title: "Advanced Code Editor",
    description:
      "Professional-grade online IDE with syntax highlighting, debugging tools, and real-time collaboration features.",
    gradient: "gradient-navy",
    iconBg: "bg-navy-100",
    iconColor: "text-navy-700",
    stats: "15+ languages supported",
    badge: "Pro Tools",
    badgeColor: "bg-navy-700",
  },
  {
    icon: Users,
    title: "Developer Community",
    description:
      "Connect with fellow developers, join study groups, participate in peer programming sessions, and grow together.",
    gradient: "gradient-golden",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    stats: "50k+ active members",
    badge: "Community",
    badgeColor: "bg-yellow-600",
  },
]

const additionalFeatures = [
  {
    icon: Target,
    title: "Skill Assessment",
    description: "Get personalized skill evaluations and improvement recommendations with detailed analytics.",
    color: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-200",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Structured learning journeys designed by industry experts to accelerate your growth.",
    color: "text-turquoise-600",
    bgColor: "bg-turquoise-50",
    borderColor: "border-turquoise-200",
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "AI-powered career counseling and personalized roadmaps for your developer journey.",
    color: "text-navy-700",
    bgColor: "bg-navy-50",
    borderColor: "border-navy-200",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
        <Badge className="mb-4 sm:mb-6 bg-turquoise-100 text-turquoise-800 border-turquoise-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
          Platform Features
        </Badge>
        <h2 className="display-text text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-navy-900">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-turquoise-600 to-coral-500 bg-clip-text text-transparent">
            succeed
          </span>
        </h2>
        <p className="body-text text-base sm:text-lg lg:text-xl text-navy-600 max-w-3xl mx-auto">
          Comprehensive tools and features designed to accelerate your developer journey with modern technology and
          community support.
        </p>
      </div>

      {/* Main Feature Cards - responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20 px-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="feature-card bg-white border-2 border-gray-100 hover:border-turquoise-200 group overflow-hidden relative shadow-lg hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-turquoise-50/50 via-transparent to-coral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${feature.iconBg} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-navy-900 text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:text-turquoise-700 transition-colors font-bold">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
                <Badge className={`${feature.badgeColor} text-white border-0 px-3 py-1 font-medium flex-shrink-0`}>
                  {feature.badge}
                </Badge>
              </div>
              <CardDescription className="text-navy-600 text-sm sm:text-base leading-relaxed mb-4">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative p-4 sm:p-6 lg:p-8 pt-0">
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm text-navy-500 font-medium">{feature.stats}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-turquoise-100 group-hover:text-turquoise-700 transition-all font-medium text-sm"
                >
                  Explore
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Features Grid - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20 px-4">
        {additionalFeatures.map((feature, index) => (
          <Card key={index} className={`feature-card bg-white border-2 ${feature.borderColor} hover:shadow-lg group`}>
            <CardContent className="p-6 sm:p-8">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.color}`} />
              </div>
              <h3 className="text-navy-900 font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-turquoise-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section - responsive */}
      <div className="text-center px-4">
        <div className="bg-gradient-to-r from-turquoise-50 via-white to-coral-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border-2 border-turquoise-100 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="display-text text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-navy-900">
              Ready to accelerate your{" "}
              <span className="bg-gradient-to-r from-turquoise-600 to-coral-500 bg-clip-text text-transparent">
                coding career?
              </span>
            </h3>
            <p className="body-text text-navy-600 mb-6 sm:mb-8 text-base sm:text-lg">
              Join thousands of developers who have transformed their careers with CodeArena's comprehensive platform
              and supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-turquoise text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-navy-200 text-navy-700 hover:bg-navy-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-white w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
