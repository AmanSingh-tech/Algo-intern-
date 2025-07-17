import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, CheckCircle, Clock, Code, Target, BookOpen } from "lucide-react"

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    solved: true,
    acceptance: "49.2%",
    description: "Given an array of integers, return indices of two numbers that add up to target.",
  },
  {
    id: 2,
    title: "Binary Tree Traversal",
    difficulty: "Medium",
    category: "Tree",
    solved: false,
    acceptance: "67.8%",
    description: "Implement inorder, preorder, and postorder traversal of a binary tree.",
  },
  {
    id: 3,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    solved: true,
    acceptance: "32.1%",
    description: "Find the longest palindromic substring in a given string.",
  },
  {
    id: 4,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    solved: false,
    acceptance: "45.6%",
    description: "Merge k sorted linked lists and return it as one sorted list.",
  },
]

const categories = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Linked List", "Stack", "Queue"]

export default function PracticePage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Practice Problems
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Sharpen your coding skills with our curated problem set and intelligent difficulty progression
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    Total Problems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground mt-1">Available challenges</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">342</div>
                  <div className="text-sm text-muted-foreground mt-1">Problems completed</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    Easy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">156/487</div>
                  <div className="text-sm text-muted-foreground mt-1">32% completed</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <Code className="w-4 h-4 text-accent" />
                    </div>
                    Medium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">142/623</div>
                  <div className="text-sm text-muted-foreground mt-1">23% completed</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search problems by title, category, or difficulty..."
                  className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-2xl text-lg"
                />
              </div>
              <Button
                variant="outline"
                className="h-14 px-8 border-2 border-primary/30 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary/10 rounded-2xl font-semibold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter & Sort
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg sticky top-8 rounded-3xl dark:glow-purple">
                  <CardHeader>
                    <CardTitle className="text-foreground text-lg font-bold">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-medium"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-3">
                <div className="space-y-6">
                  {problems.map((problem) => (
                    <Card
                      key={problem.id}
                      className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl feature-card"
                    >
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              {problem.solved ? (
                                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                                  <CheckCircle className="w-6 h-6 text-green-400" />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center">
                                  <Clock className="w-6 h-6 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <h3 className="text-foreground font-black text-xl mb-2">{problem.title}</h3>
                                <div className="flex items-center space-x-3">
                                  <Badge
                                    variant="outline"
                                    className={`px-3 py-1 font-semibold rounded-xl border-2 ${
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
                                    className="border-primary/30 text-primary bg-primary/10 font-semibold px-3 py-1 rounded-xl"
                                  >
                                    {problem.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-base mb-4 leading-relaxed">
                              {problem.description}
                            </p>
                            <div className="text-sm text-muted-foreground font-medium">
                              Acceptance Rate: {problem.acceptance}
                            </div>
                          </div>
                          <Button className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg ml-6">
                            {problem.solved ? "Solve Again" : "Solve"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
