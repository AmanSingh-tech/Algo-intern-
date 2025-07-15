import { Calendar, Clock, Trophy, Users } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const ContestsPage = () => {
  const contests = [
    {
      id: 1,
      title: "Weekly Algorithm Challenge",
      description: "Test your algorithmic skills with challenging problems",
      startTime: "2024-01-15 18:00",
      duration: "2 hours",
      participants: 1250,
      status: "upcoming",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Data Structures Sprint",
      description: "Focus on advanced data structure implementations",
      startTime: "2024-01-12 14:00",
      duration: "3 hours",
      participants: 890,
      status: "live",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Beginner's Coding Contest",
      description: "Perfect for those starting their coding journey",
      startTime: "2024-01-10 16:00",
      duration: "1.5 hours",
      participants: 2100,
      status: "completed",
      difficulty: "Easy",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return <Badge variant="success">Live</Badge>
      case "upcoming":
        return <Badge variant="warning">Upcoming</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Programming Contests</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Challenge yourself in competitive programming contests and improve your skills.
        </p>
      </div>

      <div className="grid gap-6">
        {contests.map((contest) => (
          <Card key={contest.id} className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="mb-0">{contest.title}</CardTitle>
                    {getStatusBadge(contest.status)}
                    {getDifficultyBadge(contest.difficulty)}
                  </div>
                  <CardDescription className="mb-4">{contest.description}</CardDescription>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contest.startTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants.toLocaleString()} participants</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {contest.status === "live" && <Button>Join Now</Button>}
                  {contest.status === "upcoming" && <Button variant="outline">Register</Button>}
                  {contest.status === "completed" && <Button variant="secondary">View Results</Button>}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <CardTitle>Top Performers This Month</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Alex Chen", score: 2850, contests: 12 },
                { rank: 2, name: "Sarah Johnson", score: 2720, contests: 10 },
                { rank: 3, name: "Mike Rodriguez", score: 2680, contests: 11 },
                { rank: 4, name: "Emily Davis", score: 2590, contests: 9 },
                { rank: 5, name: "David Kim", score: 2540, contests: 8 },
              ].map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank === 1
                          ? "bg-yellow-500 text-white"
                          : user.rank === 2
                            ? "bg-gray-400 text-white"
                            : user.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{user.contests} contests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-500">{user.score}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContestsPage
