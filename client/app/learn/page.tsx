import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, CheckCircle, Clock, Star, Award, TrendingUp } from "lucide-react"

const learningPaths = [
  {
    id: 1,
    title: "Data Structures Fundamentals",
    description: "Master arrays, linked lists, stacks, queues, and trees",
    progress: 75,
    lessons: 12,
    duration: "8 hours",
    difficulty: "Beginner",
    rating: 4.8,
    enrolled: 2847,
  },
  {
    id: 2,
    title: "Algorithm Design Patterns",
    description: "Learn common algorithmic patterns and problem-solving techniques",
    progress: 45,
    lessons: 16,
    duration: "12 hours",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolled: 1923,
  },
  {
    id: 3,
    title: "System Design Basics",
    description: "Introduction to scalable system architecture and design principles",
    progress: 0,
    lessons: 20,
    duration: "15 hours",
    difficulty: "Advanced",
    rating: 4.7,
    enrolled: 1456,
  },
]

const recentLessons = [
  {
    id: 1,
    title: "Binary Search Trees",
    path: "Data Structures Fundamentals",
    completed: true,
    duration: "25 min",
  },
  {
    id: 2,
    title: "Graph Traversal Algorithms",
    path: "Algorithm Design Patterns",
    completed: false,
    duration: "35 min",
  },
  {
    id: 3,
    title: "Dynamic Programming Introduction",
    path: "Algorithm Design Patterns",
    completed: false,
    duration: "40 min",
  },
]

export default function LearnPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Learn & Grow
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Structured learning paths to advance your coding skills with expert-curated content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    Courses Enrolled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">8</div>
                  <div className="text-sm text-muted-foreground mt-1">Active learning</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">3</div>
                  <div className="text-sm text-muted-foreground mt-1">Certificates earned</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    Hours Learned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">47</div>
                  <div className="text-sm text-muted-foreground mt-1">This month</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <TrendingUp className="w-4 h-4 text-accent" />
                    </div>
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">12</div>
                  <div className="text-sm text-muted-foreground mt-1">Days active</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learning Paths */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-foreground mb-6">Learning Paths</h2>
                  <div className="space-y-8">
                    {learningPaths.map((path) => (
                      <Card
                        key={path.id}
                        className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl feature-card"
                      >
                        <CardHeader className="p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-8 h-8 text-primary-foreground" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-foreground text-2xl mb-3 font-black">{path.title}</CardTitle>
                                <CardDescription className="text-muted-foreground mb-4 text-base">
                                  {path.description}
                                </CardDescription>
                                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span className="font-medium">{path.lessons} lessons</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-medium">{path.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-medium">{path.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`px-4 py-2 font-semibold rounded-xl border-2 ${
                                path.difficulty === "Beginner"
                                  ? "text-green-400 border-green-500/30 bg-green-500/10"
                                  : path.difficulty === "Intermediate"
                                    ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                                    : "text-red-400 border-red-500/30 bg-red-500/10"
                              }`}
                            >
                              {path.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                          <div className="mb-6">
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-muted-foreground font-medium">Progress</span>
                              <span className="font-bold text-foreground">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-3" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground font-medium">
                              {path.enrolled.toLocaleString()} students enrolled
                            </div>
                            <Button className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg">
                              {path.progress > 0 ? "Continue" : "Start Learning"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Continue Learning */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Continue Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center space-x-4 p-4 bg-muted/50 rounded-2xl border border-border hover:bg-primary/10 transition-colors"
                        >
                          {lesson.completed ? (
                            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                              <Play className="w-5 h-5 text-primary" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-bold text-foreground">{lesson.title}</div>
                            <div className="text-muted-foreground text-xs">{lesson.path}</div>
                          </div>
                          <div className="text-muted-foreground text-xs font-medium">{lesson.duration}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Challenge */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Daily Challenge</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Solve today's problem to maintain your streak
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="font-bold text-foreground mb-3">Valid Parentheses</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-semibold mb-4 px-3 py-1 rounded-xl">
                        Easy
                      </Badge>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Given a string containing just the characters '(', ')', '{", "}', '[' and ']', determine if the
                        input string is valid.
                      </p>
                    </div>
                    <Button className="w-full btn-primary text-primary-foreground font-semibold py-3 rounded-2xl shadow-lg">
                      Solve Challenge
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">Course Completed</div>
                          <div className="text-muted-foreground text-xs">Finished "Arrays & Strings"</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-primary/10 rounded-2xl border border-primary/20">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">Learning Streak</div>
                          <div className="text-muted-foreground text-xs">12 days in a row</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-green-500/10 rounded-2xl border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">Perfect Score</div>
                          <div className="text-muted-foreground text-xs">Aced "Binary Trees" quiz</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
