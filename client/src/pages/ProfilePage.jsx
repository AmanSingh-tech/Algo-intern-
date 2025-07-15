import { Mail, MapPin, Calendar, Github, Linkedin, Trophy, Code, Target } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const ProfilePage = () => {
  const userStats = {
    problemsSolved: 89,
    contestsParticipated: 15,
    currentStreak: 12,
    longestStreak: 28,
    totalScore: 1850,
    rank: 42,
  }

  const recentActivity = [
    {
      type: "problem",
      title: "Two Sum",
      difficulty: "Easy",
      date: "2024-01-15",
      status: "solved",
    },
    {
      type: "contest",
      title: "Weekly Algorithm Challenge",
      date: "2024-01-14",
      status: "participated",
      rank: 23,
    },
    {
      type: "problem",
      title: "Longest Substring",
      difficulty: "Medium",
      date: "2024-01-13",
      status: "solved",
    },
  ]

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "Python", level: 85 },
    { name: "Java", level: 75 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "Data Structures", level: 85 },
    { name: "Algorithms", level: 82 },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Profile</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Manage your account and track your coding journey.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                JD
              </div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Full Stack Developer</CardDescription>
              <div className="flex justify-center gap-2 mt-4">
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Joined January 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Problems Solved</CardTitle>
                </div>
                <div className="text-3xl font-bold text-blue-500">{userStats.problemsSolved}</div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Global Rank</CardTitle>
                </div>
                <div className="text-3xl font-bold text-yellow-500">#{userStats.rank}</div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Current Streak</CardTitle>
                </div>
                <div className="text-3xl font-bold text-green-500">{userStats.currentStreak}</div>
              </CardHeader>
            </Card>
          </div>

          {/* Detailed Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Score</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{userStats.totalScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Contests Participated</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {userStats.contestsParticipated}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Longest Streak</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{userStats.longestStreak} days</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Easy Problems</span>
                    <span className="font-semibold text-green-500">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Medium Problems</span>
                    <span className="font-semibold text-yellow-500">35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hard Problems</span>
                    <span className="font-semibold text-red-500">9</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "problem"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "bg-purple-100 dark:bg-purple-900"
                        }`}
                      >
                        {activity.type === "problem" ? (
                          <Code className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Trophy className="h-4 w-4 text-purple-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{activity.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.difficulty && (
                        <Badge
                          variant={
                            activity.difficulty === "Easy"
                              ? "success"
                              : activity.difficulty === "Medium"
                                ? "warning"
                                : "error"
                          }
                        >
                          {activity.difficulty}
                        </Badge>
                      )}
                      {activity.rank && <Badge variant="outline">Rank #{activity.rank}</Badge>}
                      <Badge variant={activity.status === "solved" ? "success" : "secondary"}>{activity.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
