import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Trophy, Code, Users, BarChart3, Briefcase, BookOpen } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "Coding Contests",
    description: "Participate in weekly contests and compete with developers worldwide",
    badge: "Live",
    gradient: "from-turquoise-500 to-turquoise-600",
    bgGradient: "from-turquoise-50 to-turquoise-100",
  },
  {
    icon: Code,
    title: "Practice Problems",
    description: "Solve thousands of algorithmic challenges across all difficulty levels",
    badge: "500+ Problems",
    gradient: "from-coral-500 to-coral-600",
    bgGradient: "from-coral-50 to-coral-100",
  },
  {
    icon: Users,
    title: "Peer Learning",
    description: "Join study groups and collaborate with fellow programmers",
    badge: "Community",
    gradient: "from-navy-600 to-navy-700",
    bgGradient: "from-navy-50 to-navy-100",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and insights",
    badge: "Analytics",
    gradient: "from-turquoise-600 to-coral-500",
    bgGradient: "from-turquoise-50 to-coral-50",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Get internship opportunities and career guidance from industry experts",
    badge: "New",
    gradient: "from-coral-600 to-navy-600",
    bgGradient: "from-coral-50 to-navy-50",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Follow structured curricula designed by programming experts",
    badge: "Guided",
    gradient: "from-navy-700 to-turquoise-600",
    bgGradient: "from-navy-50 to-turquoise-50",
  },
]

export function FeatureCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-navy-900 mb-3 sm:mb-4">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-turquoise-500 to-coral-500 bg-clip-text text-transparent">Excel</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-navy-700 max-w-2xl mx-auto">
          Comprehensive tools and resources to accelerate your programming journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className={`feature-card bg-gradient-to-br ${feature.bgGradient} border-2 border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden group relative`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-white to-transparent rounded-full -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-white to-transparent rounded-full translate-y-8 -translate-x-8" />
            </div>

            <CardHeader className="p-4 sm:p-6 lg:p-8 relative z-10">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/80 text-navy-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs shadow-sm"
                >
                  {feature.badge}
                </Badge>
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-black text-navy-900 mb-2 sm:mb-3 group-hover:text-navy-800 transition-colors">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-navy-700 leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8 pt-0 relative z-10">
              <div className="flex items-center text-navy-600 font-semibold text-xs sm:text-sm group-hover:text-navy-800 transition-colors">
                Learn More
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
