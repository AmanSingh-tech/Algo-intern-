import { Search, Code, Clock, CheckCircle } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const PracticePage = () => {
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers, return indices of two numbers that add up to target.",
      difficulty: "Easy",
      category: "Array",
      solved: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      description: "Find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      category: "String",
      solved: false,
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m,n))",
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      description: "Find the median of two sorted arrays with optimal time complexity.",
      difficulty: "Hard",
      category: "Binary Search",
      solved: false,
      timeComplexity: "O(log(min(m,n)))",
      spaceComplexity: "O(1)",
    },
    {
      id: 4,
      title: "Valid Parentheses",
      description: "Determine if the input string has valid parentheses arrangement.",
      difficulty: "Easy",
      category: "Stack",
      solved: true,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ]

  const categories = ["All", "Array", "String", "Dynamic Programming", "Tree", "Graph", "Stack", "Queue"]
  const difficulties = ["All", "Easy", "Medium", "Hard"]

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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Practice Problems</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sharpen your coding skills with our curated collection of programming problems.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems List */}
      <div className="space-y-4">
        {problems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {problem.solved && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <CardTitle className="mb-0">{problem.title}</CardTitle>
                    {getDifficultyBadge(problem.difficulty)}
                    <Badge variant="outline">{problem.category}</Badge>
                  </div>
                  <CardDescription className="mb-4">{problem.description}</CardDescription>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Time: {problem.timeComplexity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      <span>Space: {problem.spaceComplexity}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <Button variant={problem.solved ? "secondary" : "primary"}>
                    {problem.solved ? "Review" : "Solve"}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Progress Stats */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Problems Solved</CardTitle>
            <div className="text-3xl font-bold text-green-500">24</div>
            <CardDescription>Out of 150 total problems</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <div className="text-3xl font-bold text-blue-500">85%</div>
            <CardDescription>Average across all attempts</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
            <div className="text-3xl font-bold text-purple-500">7</div>
            <CardDescription>Days of consistent practice</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default PracticePage
