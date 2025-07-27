"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Trophy } from "lucide-react"

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-8 space-y-6 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-400 rounded w-48"></div>
        <div className="h-6 bg-gray-400 rounded w-20"></div>
      </div>
      <div className="h-5 bg-gray-400 rounded w-full max-w-xl"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-400 rounded"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-400 rounded mt-6 w-40"></div>
    </div>
  )
}

interface Contest {
  id: number
  title: string
  description: string
  startTime: string
  duration: string
  participants: number
  difficulty: "Easy" | "Medium" | "Hard"
  status: "live" | "upcoming" | "completed"
  prize: string
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContests() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("https://codeforces.com/api/contest.list")
        if (!res.ok) throw new Error("Failed to fetch contests")

        const data = await res.json()

        if (data.status !== "OK") throw new Error("API returned an error")

        // Map contests to our interface
        const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"]

        const contestsMapped: Contest[] = data.result.map((c: any) => {
          // Map phase to status
          let status: "live" | "upcoming" | "completed" = "upcoming"
          if (c.phase === "CODING") status = "live"
          else if (c.phase === "BEFORE") status = "upcoming"
          else if (c.phase === "FINISHED") status = "completed"

          // Random difficulty (no API data)
          const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]

          // Format duration (seconds to hh:mm)
          const hours = Math.floor(c.durationSeconds / 3600)
          const minutes = Math.floor((c.durationSeconds % 3600) / 60)
          const duration = `${hours}h ${minutes}m`

          return {
            id: c.id,
            title: c.name,
            description: "", // No description in API, leave empty or c.name
            startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
            duration,
            participants: 0, // No data available
            difficulty,
            status,
            prize: "N/A", // No prize info
          }
        })

        setContests(contestsMapped)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchContests()
  }, [])

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>
  }

  const activeContestsCount = contests.filter(c => c.status === "live").length
  const totalParticipants = contests.reduce((sum, c) => sum + (c.participants || 0), 0)
  const upcomingEventsCount = contests.filter(c => c.status === "upcoming").length

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-gradient-main min-h-screen">
          <div className="w-full">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Coding Contests
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Compete with developers worldwide and showcase your skills in exciting programming challenges
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    Active Contests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">
                    {loading ? <div className="h-12 w-24 bg-gray-400 rounded animate-pulse"></div> : activeContestsCount}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Live competitions</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    Total Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">
                    {loading ? <div className="h-12 w-32 bg-gray-400 rounded animate-pulse"></div> : totalParticipants.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Active competitors</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">
                    {loading ? <div className="h-12 w-16 bg-gray-400 rounded animate-pulse"></div> : upcomingEventsCount}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Upcoming events</div>
                </CardContent>
              </Card>
            </div>

            {/* Contest List */}
            <div className="space-y-8">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                contests.map((contest) => (
                  <Card
                    key={contest.id}
                    className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl feature-card"
                  >
                    <CardHeader className="p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                              <Trophy className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-foreground text-2xl mb-2 font-black">{contest.title}</CardTitle>
                              <CardDescription className="text-muted-foreground text-base">{contest.description || contest.title}</CardDescription>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`px-4 py-2 text-sm font-bold rounded-xl border-2 ${
                            contest.status === "live"
                              ? "text-red-400 border-red-500/30 bg-red-500/10 animate-pulse"
                              : contest.status === "upcoming"
                              ? "text-accent border-accent/30 bg-accent/10"
                              : "text-muted-foreground border-border bg-muted/20"
                          }`}
                        >
                          {contest.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground font-medium">Date</div>
                            <div className="text-foreground font-semibold">{new Date(contest.startTime).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground font-medium">Duration</div>
                            <div className="text-foreground font-semibold">{contest.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground font-medium">Participants</div>
                            <div className="text-foreground font-semibold">{contest.participants.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground font-medium">Prize</div>
                            <div className="text-foreground font-semibold">{contest.prize}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Badge
                          variant="outline"
                          className={`px-4 py-2 font-semibold rounded-xl border-2 ${
                            contest.difficulty === "Easy"
                              ? "text-green-400 border-green-500/30 bg-green-500/10"
                              : contest.difficulty === "Medium"
                              ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                              : "text-red-400 border-red-500/30 bg-red-500/10"
                          }`}
                        >
                          {contest.difficulty}
                        </Badge>
                        <Button
                          className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg"
                          disabled={contest.status === "completed"}
                          onClick={() => window.open(`https://codeforces.com/contests/${contest.id}`, "_blank")}
                        >
                          {contest.status === "live"
                            ? "Join Now"
                            : contest.status === "upcoming"
                            ? "Register"
                            : "View Results"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
