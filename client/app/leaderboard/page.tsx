"use client"

import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Crown, Star } from "lucide-react"

const leaderboardData = [
  {
    name: "Alex Chen",
    username: "alexc_dev",
    rating: 2847,
    solved: 342,
    contests: 28,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sarah Johnson",
    username: "sarah_codes",
    rating: 2756,
    solved: 298,
    contests: 25,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mike Rodriguez",
    username: "mike_r",
    rating: 2689,
    solved: 276,
    contests: 22,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Davis",
    username: "emily_dev",
    rating: 2634,
    solved: 254,
    contests: 20,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Kim",
    username: "david_k",
    rating: 2587,
    solved: 231,
    contests: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function LeaderboardPage() {
  // Sort users by solved descending
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.solved - a.solved)

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Top performers in our coding community - compete and climb the ranks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                      <Crown className="w-6 h-6 text-primary" />
                    </div>
                    Top Rated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">{sortedLeaderboard[0].rating}</div>
                  <div className="text-sm text-muted-foreground mt-1">{sortedLeaderboard[0].name}</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
                      <Medal className="w-6 h-6 text-accent" />
                    </div>
                    Most Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">{sortedLeaderboard[0].solved}</div>
                  <div className="text-sm text-muted-foreground mt-1">Problems</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground mt-1">This month</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    Avg Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">
                    {Math.round(
                      sortedLeaderboard.reduce((sum, user) => sum + user.rating, 0) / sortedLeaderboard.length
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Community</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
              <CardHeader className="p-8">
                <CardTitle className="text-foreground flex items-center font-black text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mr-4">
                    <Trophy className="w-6 h-6 text-primary-foreground" />
                  </div>
                  Global Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  {sortedLeaderboard.map((user, index) => {
                    const rank = index + 1
                    return (
                      <div
                        key={user.username}
                        className="flex items-center justify-between p-6 bg-muted/30 hover:bg-primary/10 transition-colors rounded-3xl border border-border hover:border-primary/30"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center justify-center w-12 h-12">
                            {rank <= 3 ? (
                              <div
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black shadow-lg ${
                                  rank === 1
                                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900"
                                    : rank === 2
                                    ? "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900"
                                    : "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-900"
                                }`}
                              >
                                {rank === 1 ? <Crown className="w-5 h-5" /> : rank}
                              </div>
                            ) : (
                              <span className="text-muted-foreground font-black text-lg">#{rank}</span>
                            )}
                          </div>

                          <div className="relative">
                            <Avatar className="w-16 h-16 border-4 border-primary/20 shadow-lg">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-black text-lg">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {rank === 1 && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-yellow-900" />
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="font-black text-foreground text-lg">{user.name}</div>
                            <div className="text-muted-foreground text-sm font-medium">@{user.username}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="font-black text-foreground text-lg">{user.rating}</div>
                            <div className="text-muted-foreground text-xs font-medium">Rating</div>
                          </div>

                          <div className="text-center">
                            <div className="text-green-400 font-black text-lg">{user.solved}</div>
                            <div className="text-muted-foreground text-xs font-medium">Solved</div>
                          </div>

                          <div className="text-center">
                            <div className="text-accent font-black text-lg">{user.contests}</div>
                            <div className="text-muted-foreground text-xs font-medium">Contests</div>
                          </div>

                          <Badge
                            variant="outline"
                            className={`px-4 py-2 font-bold rounded-xl border-2 ${
                              user.rating >= 2800
                                ? "text-red-400 border-red-500/30 bg-red-500/10"
                                : user.rating >= 2400
                                ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                                : user.rating >= 2000
                                ? "text-primary border-primary/30 bg-primary/10"
                                : user.rating >= 1600
                                ? "text-accent border-accent/30 bg-accent/10"
                                : "text-green-400 border-green-500/30 bg-green-500/10"
                            }`}
                          >
                            {user.rating >= 2800
                              ? "Grandmaster"
                              : user.rating >= 2400
                              ? "Master"
                              : user.rating >= 2000
                              ? "Expert"
                              : user.rating >= 1600
                              ? "Specialist"
                              : "Pupil"}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
