import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Plus, Search, MessageCircle, Video, Lock, Globe, Zap } from "lucide-react"

const peerRooms = [
  {
    id: 1,
    name: "Algorithm Study Group",
    description: "Daily problem solving and algorithm discussions",
    members: 24,
    online: 8,
    type: "public",
    category: "Study",
    host: "Sarah Chen",
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Interview Prep Squad",
    description: "Mock interviews and coding practice sessions",
    members: 16,
    online: 5,
    type: "private",
    category: "Interview",
    host: "Mike Johnson",
    lastActive: "15 minutes ago",
  },
  {
    id: 3,
    name: "Web Dev Collective",
    description: "Frontend and backend development discussions",
    members: 32,
    online: 12,
    type: "public",
    category: "Development",
    host: "Alex Rodriguez",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Competitive Programming",
    description: "Contest preparation and problem solving",
    members: 45,
    online: 18,
    type: "public",
    category: "Contest",
    host: "Emily Davis",
    lastActive: "5 minutes ago",
  },
]

const myRooms = [
  {
    id: 1,
    name: "Data Structures Mastery",
    members: 12,
    unreadMessages: 3,
  },
  {
    id: 2,
    name: "System Design Study",
    members: 8,
    unreadMessages: 0,
  },
]

export default function PeerRoomsPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Peer Rooms
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Connect with fellow developers and learn together in collaborative spaces
                </p>
              </div>
              <Button className="btn-primary text-primary-foreground font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Create Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    Active Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">127</div>
                  <div className="text-sm text-muted-foreground mt-1">Live discussions</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <Zap className="w-4 h-4 text-accent" />
                    </div>
                    Online Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">1,847</div>
                  <div className="text-sm text-muted-foreground mt-1">Currently active</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    My Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">5</div>
                  <div className="text-sm text-muted-foreground mt-1">Joined rooms</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-sm font-bold flex items-center">
                    <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                      <Video className="w-4 h-4 text-accent" />
                    </div>
                    Messages Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-accent">23</div>
                  <div className="text-sm text-muted-foreground mt-1">Your activity</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search rooms by name, category, or host..."
                      className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-2xl text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-foreground">Discover Rooms</h2>
                  {peerRooms.map((room) => (
                    <Card
                      key={room.id}
                      className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl feature-card"
                    >
                      <CardHeader className="p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                              <Users className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <CardTitle className="text-foreground text-2xl font-black">{room.name}</CardTitle>
                                {room.type === "private" ? (
                                  <div className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-yellow-400" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-green-400" />
                                  </div>
                                )}
                              </div>
                              <CardDescription className="text-muted-foreground mb-4 text-base">
                                {room.description}
                              </CardDescription>
                              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">{room.members} members</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="font-medium">{room.online} online</span>
                                </div>
                                <div className="font-medium">Host: {room.host}</div>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-2 border-primary/30 text-primary bg-primary/10 font-semibold px-4 py-2 rounded-xl"
                          >
                            {room.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="text-sm text-muted-foreground font-medium">
                            Last active: {room.lastActive}
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-primary/30 bg-card hover:bg-primary/10 text-primary font-semibold px-6 py-2 rounded-xl"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                            <Button
                              size="sm"
                              className="btn-primary text-primary-foreground font-semibold px-6 py-2 rounded-xl shadow-lg"
                            >
                              Join Room
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* My Rooms */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">My Rooms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myRooms.map((room) => (
                        <div
                          key={room.id}
                          className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/10 cursor-pointer transition-colors border border-border hover:border-primary/30"
                        >
                          <div>
                            <div className="font-bold text-foreground">{room.name}</div>
                            <div className="text-muted-foreground text-sm">{room.members} members</div>
                          </div>
                          {room.unreadMessages > 0 && (
                            <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {room.unreadMessages}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full btn-primary text-primary-foreground font-semibold py-3 rounded-2xl shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Room
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary/30 bg-card hover:bg-primary/10 text-primary font-semibold py-3 rounded-2xl"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Start Video Call
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-accent/30 bg-card hover:bg-accent/10 text-accent font-semibold py-3 rounded-2xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Browse Discussions
                    </Button>
                  </CardContent>
                </Card>

                {/* Online Friends */}
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Online Friends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Alice Johnson", status: "Solving problems" },
                        { name: "Bob Smith", status: "In contest" },
                        { name: "Carol Davis", status: "Available" },
                      ].map((friend, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-2xl">
                          <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-primary/20">
                              <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={friend.name} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{friend.name}</div>
                            <div className="text-muted-foreground text-sm">{friend.status}</div>
                          </div>
                        </div>
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
