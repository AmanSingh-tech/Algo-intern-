import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "../components/Card"
import Badge from "../components/Badge"

const LeaderboardPage = () => {
  const topUsers = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "AC",
      score: 2850,
      problemsSolved: 245,
      contestsWon: 12,
      streak: 45,
      country: "USA",
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "SJ",
      score: 2720,
      problemsSolved: 198,
      contestsWon: 8,
      streak: 32,
      country: "Canada",
    },
    {
      rank: 3,
      name: "Mike Rodriguez",
      avatar: "MR",
      score: 2680,
      problemsSolved: 210,
      contestsWon: 7,
      streak: 28,
      country: "Spain",
    },
  ]

  const allUsers = [
    ...topUsers,
    {
      rank: 4,
      name: "Emily Davis",
      avatar: "ED",
      score: 2590,
      problemsSolved: 187,
      contestsWon: 5,
      streak: 21,
      country: "UK",
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "DK",
      score: 2540,
      problemsSolved: 165,
      contestsWon: 6,
      streak: 19,
      country: "South Korea",
    },
    {
      rank: 6,
      name: "Lisa Wang",
      avatar: "LW",
      score: 2480,
      problemsSolved: 156,
      contestsWon: 4,
      streak: 15,
      country: "China",
    },
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold">
            {rank}
          </div>
        )
    }
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-white">🥇 Champion</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-white">🥈 Runner-up</Badge>
      case 3:
        return <Badge className="bg-orange-500 text-white">🥉 Third Place</Badge>
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          See how you rank against other developers in our community.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Top Performers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topUsers.map((user) => (
            <Card key={user.rank} className={`text-center ${user.rank === 1 ? "ring-2 ring-yellow-500" : ""}`}>
              <CardHeader>
                <div className="flex justify-center mb-4">{getRankIcon(user.rank)}</div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {user.avatar}
                </div>
                <CardTitle className="mb-2">{user.name}</CardTitle>
                {getRankBadge(user.rank)}
                <div className="text-2xl font-bold text-blue-500 mt-2">{user.score}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">points</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{user.problemsSolved}</div>
                    <div className="text-gray-600 dark:text-gray-400">Problems</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{user.contestsWon}</div>
                    <div className="text-gray-600 dark:text-gray-400">Contests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allUsers.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{user.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="font-bold text-blue-500">{user.score}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">{user.problemsSolved}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">{user.contestsWon}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Won</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-semibold text-orange-500">
                      <TrendingUp className="h-4 w-4" />
                      {user.streak}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Streak</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Rank</CardTitle>
            <div className="text-2xl font-bold text-blue-500">#42</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Score</CardTitle>
            <div className="text-2xl font-bold text-purple-500">1,850</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Problems Solved</CardTitle>
            <div className="text-2xl font-bold text-green-500">89</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Streak</CardTitle>
            <div className="text-2xl font-bold text-orange-500">12</div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default LeaderboardPage
