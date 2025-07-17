import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Edit, Github, Linkedin, Mail, MapPin, Calendar, Trophy, Code, Target, Star, Award } from "lucide-react"

export default function ProfilePage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg">
                          <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-black">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                          <Star className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-black text-foreground mb-2">John Doe</h2>
                      <p className="text-muted-foreground mb-4 font-medium">@johndoe_dev</p>
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6 px-6 py-2 text-sm font-bold rounded-2xl">
                        Expert • Rating: 2156
                      </Badge>
                      <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                        Full-stack developer passionate about algorithms and system design. Love solving complex
                        problems and building scalable applications.
                      </p>
                      <Button className="w-full btn-primary text-primary-foreground font-semibold py-3 rounded-2xl shadow-lg">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-xl">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">john.doe@email.com</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-xl">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground font-medium">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-xl">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">Joined January 2023</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-xl">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center">
                        <Github className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground font-medium">github.com/johndoe</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-xl">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Linkedin className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">linkedin.com/in/johndoe</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                          <Code className="w-6 h-6 text-primary" />
                        </div>
                        Problems Solved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-primary">247</div>
                      <div className="text-sm text-muted-foreground mt-1">Total solved</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
                          <Trophy className="w-6 h-6 text-accent" />
                        </div>
                        Contests Won
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-accent">12</div>
                      <div className="text-sm text-muted-foreground mt-1">First place</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        Current Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-primary">15</div>
                      <div className="text-sm text-muted-foreground mt-1">Days active</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Problem Solving Progress */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold text-xl">Problem Solving Progress</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Your progress across different difficulty levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                      <div className="flex justify-between mb-3">
                        <span className="text-green-400 font-bold">Easy</span>
                        <span className="text-foreground font-semibold">89/156</span>
                      </div>
                      <Progress value={57} className="h-3" />
                    </div>
                    <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                      <div className="flex justify-between mb-3">
                        <span className="text-yellow-400 font-bold">Medium</span>
                        <span className="text-foreground font-semibold">124/287</span>
                      </div>
                      <Progress value={43} className="h-3" />
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                      <div className="flex justify-between mb-3">
                        <span className="text-red-400 font-bold">Hard</span>
                        <span className="text-foreground font-semibold">34/156</span>
                      </div>
                      <Progress value={22} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                          <Code className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground">Solved "Binary Tree Maximum Path Sum"</div>
                          <div className="text-muted-foreground text-sm">2 hours ago</div>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-semibold">Hard</Badge>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-primary/10 rounded-2xl border border-primary/20">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground">Participated in Weekly Contest #47</div>
                          <div className="text-muted-foreground text-sm">1 day ago</div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-semibold">
                          Rank #23
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-accent/10 rounded-2xl border border-accent/20">
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground">Completed "Dynamic Programming" learning path</div>
                          <div className="text-muted-foreground text-sm">3 days ago</div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-semibold">100%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold text-xl">Skills & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "JavaScript",
                        "Python",
                        "Java",
                        "C++",
                        "React",
                        "Node.js",
                        "MongoDB",
                        "PostgreSQL",
                        "AWS",
                        "Docker",
                        "Algorithms",
                        "Data Structures",
                      ].map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-2 border-primary/30 text-primary bg-primary/10 font-semibold px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
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
