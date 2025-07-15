import { Play, Clock, Users, Star, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const LearnPage = () => {
  const courses = [
    {
      id: 1,
      title: "Data Structures Fundamentals",
      description: "Master the essential data structures every programmer should know",
      instructor: "Dr. Sarah Chen",
      duration: "6 weeks",
      students: 1250,
      rating: 4.8,
      level: "Beginner",
      topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees"],
      progress: 0,
    },
    {
      id: 2,
      title: "Algorithm Design & Analysis",
      description: "Learn to design efficient algorithms and analyze their complexity",
      instructor: "Prof. Michael Johnson",
      duration: "8 weeks",
      students: 890,
      rating: 4.9,
      level: "Intermediate",
      topics: ["Sorting", "Searching", "Dynamic Programming", "Greedy Algorithms"],
      progress: 45,
    },
    {
      id: 3,
      title: "System Design Interview Prep",
      description: "Prepare for system design interviews at top tech companies",
      instructor: "Alex Rodriguez",
      duration: "4 weeks",
      students: 650,
      rating: 4.7,
      level: "Advanced",
      topics: ["Scalability", "Load Balancing", "Databases", "Caching"],
      progress: 0,
    },
  ]

  const tutorials = [
    {
      title: "Binary Search Deep Dive",
      duration: "25 min",
      difficulty: "Medium",
      views: 15420,
    },
    {
      title: "Dynamic Programming Patterns",
      duration: "45 min",
      difficulty: "Hard",
      views: 8930,
    },
    {
      title: "Graph Traversal Algorithms",
      duration: "35 min",
      difficulty: "Medium",
      views: 12100,
    },
    {
      title: "Two Pointer Technique",
      duration: "20 min",
      difficulty: "Easy",
      views: 18750,
    },
  ]

  const getLevelBadge = (level) => {
    switch (level) {
      case "Beginner":
        return <Badge variant="success">{level}</Badge>
      case "Intermediate":
        return <Badge variant="warning">{level}</Badge>
      case "Advanced":
        return <Badge variant="error">{level}</Badge>
      default:
        return <Badge>{level}</Badge>
    }
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return <Badge variant="success">{difficulty}</Badge>
      case "Medium":
        return <Badge variant="warning">{difficulty}</Badge>
      case "Hard":
        return <Badge variant="error">{difficulty}</Badge>
      default:
        return <Badge>{difficulty}</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Learn & Grow</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Enhance your programming skills with our comprehensive courses and tutorials.
        </p>
      </div>

      {/* Featured Courses */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Courses</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} hover className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  {getLevelBadge(course.level)}
                </div>
                <CardDescription className="mb-4">{course.description}</CardDescription>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Instructor: {course.instructor}</div>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Tutorials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Tutorials</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{tutorial.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{tutorial.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">{getDifficultyBadge(tutorial.difficulty)}</div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Learning Path</CardTitle>
            <CardDescription>Follow this structured path to master competitive programming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: "Master Basic Data Structures", completed: true },
                { step: 2, title: "Learn Fundamental Algorithms", completed: true },
                { step: 3, title: "Practice Problem Solving", completed: false, current: true },
                { step: 4, title: "Advanced Algorithm Techniques", completed: false },
                { step: 5, title: "System Design Concepts", completed: false },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    item.current
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : item.completed
                        ? "bg-green-50 dark:bg-green-900/20"
                        : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      item.completed
                        ? "bg-green-500 text-white"
                        : item.current
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        item.current
                          ? "text-blue-700 dark:text-blue-300"
                          : item.completed
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                  {item.current && (
                    <Badge variant="outline" className="border-blue-300 text-blue-600">
                      Current
                    </Badge>
                  )}
                  {item.completed && <Badge variant="success">Completed</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default LearnPage
