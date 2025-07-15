import { ArrowRight, Code, Trophy, Users, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"

const HomePage = () => {
  const features = [
    {
      icon: Code,
      title: "Practice Coding",
      description: "Solve thousands of coding problems across different difficulty levels and topics.",
      link: "/practice",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: "Join Contests",
      description: "Participate in competitive programming contests and climb the leaderboard.",
      link: "/contests",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Peer Rooms",
      description: "Collaborate with other developers in real-time coding sessions.",
      link: "/peer-rooms",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Access comprehensive tutorials and learning resources.",
      link: "/learn",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="gradient-bg min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Master Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Coding Skills
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers practicing algorithms, participating in contests, and building their
            programming expertise on CodeArena.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/practice">
              <Button size="lg" className="w-full sm:w-auto">
                Start Practicing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contests">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                View Contests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need to Excel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} to={feature.link}>
                  <Card hover className="h-full">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Join Our Growing Community</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-400">Problems Solved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Contests Held</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
