import { Building, MapPin, Calendar, DollarSign, ExternalLink, Plus } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/Card"
import Button from "../components/Button"
import Badge from "../components/Badge"

const InternshipTrackerPage = () => {
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineering Intern",
      location: "Mountain View, CA",
      salary: "$8,000/month",
      appliedDate: "2024-01-10",
      status: "interview",
      deadline: "2024-02-15",
      notes: "Completed online assessment, waiting for technical interview",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Software Development Intern",
      location: "Seattle, WA",
      salary: "$7,500/month",
      appliedDate: "2024-01-08",
      status: "applied",
      deadline: "2024-02-20",
      notes: "Application submitted, no response yet",
    },
    {
      id: 3,
      company: "Meta",
      position: "Frontend Engineering Intern",
      location: "Menlo Park, CA",
      salary: "$8,500/month",
      appliedDate: "2024-01-05",
      status: "rejected",
      deadline: "2024-02-10",
      notes: "Rejected after phone screening",
    },
    {
      id: 4,
      company: "Apple",
      position: "iOS Development Intern",
      location: "Cupertino, CA",
      salary: "$8,200/month",
      appliedDate: "2024-01-12",
      status: "offer",
      deadline: "2024-02-25",
      notes: "Received offer! Need to respond by Jan 20",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "applied":
        return <Badge variant="secondary">Applied</Badge>
      case "interview":
        return <Badge variant="warning">Interview</Badge>
      case "offer":
        return <Badge variant="success">Offer</Badge>
      case "rejected":
        return <Badge variant="error">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "applied").length,
    interviews: applications.filter((app) => app.status === "interview").length,
    offers: applications.filter((app) => app.status === "offer").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Internship Tracker</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Keep track of your internship applications and their progress.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total</CardTitle>
            <div className="text-2xl font-bold text-blue-500">{stats.total}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Applied</CardTitle>
            <div className="text-2xl font-bold text-gray-500">{stats.applied}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interviews</CardTitle>
            <div className="text-2xl font-bold text-yellow-500">{stats.interviews}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offers</CardTitle>
            <div className="text-2xl font-bold text-green-500">{stats.offers}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rejected</CardTitle>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Building className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="mb-1">{app.company}</CardTitle>
                      <CardDescription className="mb-0">{app.position}</CardDescription>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{app.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>{app.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Applied: {app.appliedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {app.deadline}</span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{app.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Streamline your internship application process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Plus className="h-6 w-6 mb-2" />
                Add New Application
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <ExternalLink className="h-6 w-6 mb-2" />
                Job Board Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InternshipTrackerPage
