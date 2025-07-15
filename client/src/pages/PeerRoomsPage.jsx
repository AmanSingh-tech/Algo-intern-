import { Users, Plus, Clock, Globe, Lock, Video, MessageCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const PeerRoomsPage = () => {
  const activeRooms = [
    {
      id: 1,
      name: "Algorithm Study Group",
      description: "Solving dynamic programming problems together",
      participants: 8,
      maxParticipants: 12,
      host: "Sarah Chen",
      topic: "Dynamic Programming",
      difficulty: "Medium",
      isPrivate: false,
      hasVideo: true,
      duration: "2h 15m",
    },
    {
      id: 2,
      name: "Interview Prep Session",
      description: "Mock interviews and coding challenges",
      participants: 6,
      maxParticipants: 8,
      host: "Mike Rodriguez",
      topic: "System Design",
      difficulty: "Hard",
      isPrivate: false,
      hasVideo: true,
      duration: "1h 45m",
    },
    {
      id: 3,
      name: "Beginner's Coding Circle",
      description: "Learning basics of data structures",
      participants: 15,
      maxParticipants: 20,
      host: "Emily Davis",
      topic: "Data Structures",
      difficulty: "Easy",
      isPrivate: false,
      hasVideo: false,
      duration: "3h 20m",
    },
    {
      id: 4,
      name: "Competitive Programming",
      description: "Preparing for upcoming contests",
      participants: 4,
      maxParticipants: 6,
      host: "Alex Kim",
      topic: "Contest Prep",
      difficulty: "Hard",
      isPrivate: true,
      hasVideo: true,
      duration: "45m",
    },
  ]

  const myRooms = [
    {
      id: 5,
      name: "JavaScript Deep Dive",
      participants: 12,
      lastActive: "2 hours ago",
      isOwner: true,
    },
    {
      id: 6,
      name: "React Best Practices",
      participants: 8,
      lastActive: "1 day ago",
      isOwner: false,
    },
  ]

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Peer Rooms</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Collaborate with other developers in real-time coding sessions.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Rooms</CardTitle>
            <div className="text-2xl font-bold text-blue-500">{activeRooms.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Participants</CardTitle>
            <div className="text-2xl font-bold text-green-500">
              {activeRooms.reduce((sum, room) => sum + room.participants, 0)}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Rooms</CardTitle>
            <div className="text-2xl font-bold text-purple-500">{myRooms.length}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hours Collaborated</CardTitle>
            <div className="text-2xl font-bold text-orange-500">24</div>
          </CardHeader>
        </Card>
      </div>

      {/* Active Rooms */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Active Rooms</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {activeRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      {room.isPrivate ? (
                        <Lock className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Globe className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="mb-3">{room.description}</CardDescription>
                  </div>
                  {getDifficultyBadge(room.difficulty)}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {room.participants}/{room.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{room.duration}</span>
                  </div>
                  {room.hasVideo && (
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4 text-blue-500" />
                      <span>Video</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Hosted by <span className="font-medium text-gray-900 dark:text-white">{room.host}</span>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {room.topic}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm">Join Room</Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* My Rooms */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Rooms</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {myRooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{room.participants} members</span>
                      </div>
                      <span>Last active: {room.lastActive}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {room.isOwner && <Badge variant="outline">Owner</Badge>}
                    <Button variant="outline" size="sm">
                      Enter
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Create Room CTA */}
      <div className="mt-12">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Start Your Own Coding Session</CardTitle>
            <CardDescription>Create a room and invite others to collaborate on coding problems</CardDescription>
            <div className="pt-4">
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create New Room
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default PeerRoomsPage
