"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CodeEditor from "@/components/code-editor"
import { Loader2 } from "lucide-react"

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
  acceptance: string
  description: string
  tags: string[]
}

export default function SolveProblemPage() {
  const params = useParams()
  const problemId = params.problemId as string
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchProblemDetails() {
    try {
      setLoading(true)
      setError(null)
      setProblem(null)

      const res = await fetch("https://codeforces.com/api/problemset.problems")
      if (!res.ok) throw new Error("Failed to fetch problems")
      const data = await res.json()
      if (data.status !== "OK") throw new Error("API returned error")

      const cfProblems: CfProblem[] = data.result.problems
      const cfStats: CfProblemStatistics[] = data.result.problemStatistics

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

      const foundProblem = cfProblems.find((p) => `${p.contestId ?? "0"}-${p.index}` === problemId)

      if (foundProblem) {
        const solvedCount = statsMap.get(problemId) ?? 0
        setProblem({
          id: problemId,
          title: foundProblem.name,
          difficulty: ratingToDifficulty(foundProblem.rating),
          category: foundProblem.tags.length > 0 ? foundProblem.tags[0] : "Unknown",
          acceptance: `${solvedCount.toLocaleString()} solved`,
          tags: foundProblem.tags,
          description: `This is a placeholder description for the problem "${foundProblem.name}". To view the full problem statement, please visit the original Codeforces page.`,
        })
      } else {
        setError("Problem not found.")
      }
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProblemDetails()
  }, [problemId])

  if (loading) {
    return (
      <>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-main min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-4 text-lg text-muted-foreground">Loading problem...</span>
          </main>
        </SidebarInset>
      </>
    )
  }

  if (error) {
    return (
      <>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-main min-h-screen space-y-4">
            <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{error}</p>
                <button
                  className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/80 transition"
                  onClick={() => fetchProblemDetails()}
                >
                  Retry
                </button>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </>
    )
  }

  if (!problem) {
    return (
      <>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-main min-h-screen">
            <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="text-foreground">Problem Not Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">The requested problem could not be found.</p>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </>
    )
  }

  const defaultCodeTemplate = `// Problem: ${problem.title} (${problem.id})
// Difficulty: ${problem.difficulty}
// Category: ${problem.category}

function solve() {
  // Your code here
}

// Example usage:
// console.log(solve());
`

  const [contestId, problemIndex] = problem.id.split("-")

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main
          className="flex-1 p-[var(--main-padding-y)] sm:p-[var(--main-padding-y)] lg:p-[var(--main-padding-y)] bg-gradient-main min-h-screen overflow-hidden"
          style={{ height: `calc(100vh - var(--header-height) - var(--main-padding-y) * 2)` }}
        >
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem Description Side */}
            <div className="h-full flex flex-col overflow-hidden rounded-3xl shadow-lg bg-card/90 backdrop-blur-sm border-2 border-border dark:glow-purple">
              <CardHeader className="flex-shrink-0 border-b border-border px-6 py-4">
                <CardTitle className="text-foreground font-black text-2xl">{problem.title}</CardTitle>
                <div className="flex items-center space-x-3 mt-2">
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
                  <span className="text-sm text-muted-foreground font-medium ml-auto">
                    Acceptance Rate: {problem.acceptance}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto px-6 py-4 text-muted-foreground text-base leading-relaxed">
                <p className="mb-4 whitespace-pre-wrap">{problem.description}</p>
                <a
                  href={`https://codeforces.com/contest/${contestId}/problem/${problemIndex}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline mt-4 block"
                >
                  View full problem on Codeforces
                </a>
                {problem.tags.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-muted/50 text-muted-foreground border-border"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </div>

            {/* Code Editor Side */}
            <div className="h-full rounded-3xl shadow-lg overflow-hidden">
              <CodeEditor initialCode={defaultCodeTemplate} initialLanguage="javascript" className="h-full" />
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
