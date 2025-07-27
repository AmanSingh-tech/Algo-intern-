"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, CheckCircle, Clock, BookOpen } from "lucide-react"

interface CfProblem {
  contestId?: number
  index: string
  name: string
  type: string
  rating?: number
  tags: string[]
}

interface CfProblemStatistics {
  contestId?: number
  index: string
  solvedCount: number
}

interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard" | "Unknown"
  category: string
  solved: boolean
  acceptance: string
  description?: string
}

const categories = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Linked List", "Stack", "Queue"]

export default function PracticePage() {
  const router = useRouter()
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProblems() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("https://codeforces.com/api/problemset.problems")
        if (!res.ok) throw new Error("Failed to fetch problems")

        const data = await res.json()
        if (data.status !== "OK") throw new Error("API returned error")

        const cfProblems: CfProblem[] = data.result.problems
        const cfStats: CfProblemStatistics[] = data.result.problemStatistics

        // Map contestId+index to solvedCount
        const statsMap = new Map<string, number>()
        cfStats.forEach((stat) => {
          statsMap.set(`${stat.contestId ?? ""}-${stat.index}`, stat.solvedCount)
        })

        function ratingToDifficulty(rating?: number): Problem["difficulty"] {
          if (!rating) return "Unknown"
          if (rating < 1200) return "Easy"
          if (rating < 1800) return "Medium"
          return "Hard"
        }

        const mappedProblems: Problem[] = cfProblems.map((p) => {
          const id = `${p.contestId ?? "0"}-${p.index}`
          const solvedCount = statsMap.get(id) ?? 0

          return {
            id,
            title: p.name,
            difficulty: ratingToDifficulty(p.rating),
            category: p.tags.length > 0 ? p.tags[0] : "Unknown",
            solved: false,
            acceptance: `${solvedCount.toLocaleString()} solved`,
          }
        })

        setProblems(mappedProblems)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  // Filter and search problems
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(search.toLowerCase()) ||
      problem.category.toLowerCase().includes(search.toLowerCase()) ||
      problem.difficulty.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = selectedCategory ? problem.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

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
                  <div className="text-4xl font-black text-primary">{loading ? "..." : problems.length}</div>
                  <div className="text-sm text-muted-foreground mt-1">Available challenges</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search problems by title, category, or difficulty..."
                  className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-2xl text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="h-14 px-8 border-2 border-primary/30 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary/10 rounded-2xl font-semibold"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter className="w-5 h-5 mr-2" />
                Clear Filter
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
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-medium"
                          onClick={() => setSelectedCategory(category)}
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
                  {loading ? (
                    <div>Loading problems...</div>
                  ) : filteredProblems.length === 0 ? (
                    <div>No problems found.</div>
                  ) : (
                    filteredProblems.map((problem) => (
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
                              <div className="text-sm text-muted-foreground font-medium">
                                Acceptance Rate: {problem.acceptance}
                              </div>
                            </div>
                            <Button
                              className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg ml-6"
                              onClick={() => router.push(`/solve/${problem.id}`)}
                            >
                              {problem.solved ? "Solve Again" : "Solve"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
