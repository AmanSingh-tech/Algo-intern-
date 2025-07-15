import { Header } from "../components/header"
import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset } from "../components/ui/sidebar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Code, Clock, CheckCircle, Star, Filter, Search } from "lucide-react"
import { Input } from "../components/ui/input"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    solved: true,
    acceptance: 89,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    likes: 1247,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  },
  {
    id: 2,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    category: "Tree",
    solved: false,
    acceptance: 67,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    likes: 892,
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    solved: false,
    acceptance: 45,
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(1)",
    likes: 2156,
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
  },
]

const categories = ["All", "Array", "String", "Tree", "Graph", "Dynamic Programming", "Linked List"]

export default function PracticePage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-gradient-main min-h-screen">
          <div className="w-full">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Practice Problems
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Sharpen your coding skills with our curated collection of algorithmic challenges
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold text-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-primary">127</div>
                  <div className="text-sm text-muted-foreground mt-1">Problems completed</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold text-lg">
                    <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center mr-3">
                      <Code className="w-5 h-5 text-accent" />
                    </div>
                    Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-accent">2,847</div>
                  <div className="text-sm text-muted-foreground mt-1">Available problems</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold text-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-primary">15</div>
                  <div className="text-sm text-muted-foreground mt-1">Days in a row</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold text-lg">
                    <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-accent">4.5%</div>
                  <Progress value={4.5} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search problems..."
                  className="pl-10 h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-2xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className={`rounded-2xl px-6 py-3 font-semibold ${
                      category === "All"
                        ? "btn-primary text-primary-foreground"
                        : "border-2 border-border hover:border-primary/50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                className="border-2 border-border hover:border-primary/50 rounded-2xl px-6 py-3 font-semibold bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Problems List */}
            <div className="space-y-6">
              {problems.map((problem) => (
                <Card
                  key={problem.id}
                  className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl feature-card"
                >
                  <CardHeader className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                            <Code className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-foreground text-xl mb-2 font-black flex items-center">
                              {problem.title}
                              {problem.solved && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">{problem.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`px-3 py-1 text-sm font-bold rounded-xl border-2 ${
                            problem.difficulty === "Easy"
                              ? "text-green-400 border-green-500/30 bg-green-500/10"
                              : problem.difficulty === "Medium"
                                ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                                : "text-red-400 border-red-500/30 bg-red-500/10"
                          }`}
                        >
                          {problem.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="px-3 py-1 text-sm font-semibold rounded-xl border-2 border-primary/30 bg-primary/10 text-primary"
                        >
                          {problem.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">Acceptance</div>
                        <div className="text-lg font-bold text-foreground">{problem.acceptance}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">Time</div>
                        <div className="text-lg font-bold text-foreground">{problem.timeComplexity}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">Space</div>
                        <div className="text-lg font-bold text-foreground">{problem.spaceComplexity}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">Likes</div>
                        <div className="text-lg font-bold text-foreground flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {problem.likes}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">Problem #{problem.id}</div>
                      <Button className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg">
                        {problem.solved ? "Solve Again" : "Solve Problem"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
