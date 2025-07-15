import { Header } from "../components/header"
import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset } from "../components/ui/sidebar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Calendar, Clock, Users, Trophy } from "lucide-react"

const contests = [
  {
    id: 1,
    title: "Weekly Coding Challenge #47",
    description: "Solve algorithmic problems and compete with developers worldwide",
    startTime: "2024-01-15T10:00:00Z",
    duration: "2 hours",
    participants: 1247,
    difficulty: "Medium",
    status: "upcoming",
    prize: "$500",
  },
  {
    id: 2,
    title: "Data Structures Sprint",
    description: "Focus on trees, graphs, and dynamic programming challenges",
    startTime: "2024-01-12T14:00:00Z",
    duration: "3 hours",
    participants: 892,
    difficulty: "Hard",
    status: "live",
    prize: "$1000",
  },
  {
    id: 3,
    title: "Beginner's Algorithm Battle",
    description: "Perfect for newcomers to competitive programming",
    startTime: "2024-01-10T16:00:00Z",
    duration: "1.5 hours",
    participants: 2156,
    difficulty: "Easy",
    status: "completed",
    prize: "$200",
  },
]

export default function ContestsPage() {
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
                  <div className="text-4xl font-black text-primary">3</div>
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
                  <div className="text-4xl font-black text-accent">4,295</div>
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
                  <div className="text-4xl font-black text-primary">5</div>
                  <div className="text-sm text-muted-foreground mt-1">Upcoming events</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {contests.map((contest) => (
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
                            <CardDescription className="text-muted-foreground text-base">
                              {contest.description}
                            </CardDescription>
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
                          <div className="text-foreground font-semibold">
                            {new Date(contest.startTime).toLocaleDateString()}
                          </div>
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
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
