import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Building, MapPin, Clock, DollarSign, Filter, Calendar } from "lucide-react"

const internships = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineering Intern",
    location: "Mountain View, CA",
    type: "Remote",
    duration: "12 weeks",
    stipend: "$8,000/month",
    status: "applied",
    appliedDate: "2024-01-10",
    description: "Work on cutting-edge projects with experienced engineers",
    logo: "G",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Frontend Developer Intern",
    location: "Seattle, WA",
    type: "Hybrid",
    duration: "10 weeks",
    stipend: "$7,500/month",
    status: "interview",
    appliedDate: "2024-01-08",
    description: "Build user interfaces for Microsoft's cloud products",
    logo: "M",
  },
  {
    id: 3,
    company: "Meta",
    position: "Data Science Intern",
    location: "Menlo Park, CA",
    type: "On-site",
    duration: "12 weeks",
    stipend: "$8,500/month",
    status: "offer",
    appliedDate: "2024-01-05",
    description: "Analyze user behavior and improve recommendation systems",
    logo: "F",
  },
  {
    id: 4,
    company: "Amazon",
    position: "Backend Engineer Intern",
    location: "Austin, TX",
    type: "Remote",
    duration: "16 weeks",
    stipend: "$7,000/month",
    status: "rejected",
    appliedDate: "2024-01-03",
    description: "Develop scalable backend services for e-commerce platform",
    logo: "A",
  },
]

export default function InternshipTrackerPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Internship Tracker
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Track your internship applications and discover new opportunities with our intelligent matching
                    system
                  </p>
                </div>
                <Button className="btn-primary text-primary-foreground font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Application
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-purple">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-sm font-bold flex items-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                        <Building className="w-4 h-4 text-primary" />
                      </div>
                      Total Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-primary">24</div>
                    <div className="text-sm text-muted-foreground mt-1">+3 this week</div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-sm font-bold flex items-center">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      In Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-accent">8</div>
                    <div className="text-sm text-muted-foreground mt-1">Active interviews</div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-sm font-bold flex items-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-primary">3</div>
                    <div className="text-sm text-muted-foreground mt-1">Pending decisions</div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-sm font-bold flex items-center">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                        <Calendar className="w-4 h-4 text-accent" />
                      </div>
                      Response Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-accent">67%</div>
                    <div className="text-sm text-muted-foreground mt-1">Above average</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search applications by company, position, or status..."
                    className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-2xl text-lg"
                  />
                </div>
                <Button
                  variant="outline"
                  className="h-14 px-8 border-2 border-primary/30 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary/10 rounded-2xl font-semibold"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filter & Sort
                </Button>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-6">
              {internships.map((internship) => (
                <Card
                  key={internship.id}
                  className="bg-card/90 backdrop-blur-sm border-2 border-border hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden feature-card"
                >
                  <CardHeader className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-6">
                        {/* Company Logo */}
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-primary-foreground font-black text-xl">{internship.logo}</span>
                        </div>

                        <div className="flex-1">
                          <CardTitle className="text-foreground text-2xl mb-2 font-black">
                            {internship.position}
                          </CardTitle>
                          <div className="flex items-center text-muted-foreground mb-3">
                            <Building className="w-5 h-5 mr-2" />
                            <span className="font-semibold text-lg">{internship.company}</span>
                          </div>
                          <CardDescription className="text-muted-foreground text-base leading-relaxed max-w-2xl">
                            {internship.description}
                          </CardDescription>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={`px-4 py-2 text-sm font-bold rounded-xl border-2 ${
                          internship.status === "offer"
                            ? "text-green-400 border-green-500/30 bg-green-500/10"
                            : internship.status === "interview"
                              ? "text-accent border-accent/30 bg-accent/10"
                              : internship.status === "applied"
                                ? "text-primary border-primary/30 bg-primary/10"
                                : "text-red-400 border-red-500/30 bg-red-500/10"
                        }`}
                      >
                        {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-medium">Location</div>
                          <div className="text-foreground font-semibold">{internship.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-medium">Duration</div>
                          <div className="text-foreground font-semibold">{internship.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-medium">Stipend</div>
                          <div className="text-foreground font-semibold">{internship.stipend}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                          <Building className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-medium">Type</div>
                          <Badge variant="outline" className="border-accent/30 text-accent bg-accent/10 font-semibold">
                            {internship.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-muted-foreground font-medium">
                        Applied on{" "}
                        {new Date(internship.appliedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-2 border-border bg-card hover:bg-muted/50 text-foreground font-semibold px-6 py-2 rounded-xl"
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="btn-primary text-primary-foreground font-semibold px-6 py-2 rounded-xl shadow-lg"
                        >
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add New Application CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 border-2 border-primary/20 shadow-xl">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Ready to apply to more internships?
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    Discover new opportunities with our AI-powered matching system and never miss a deadline again.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="btn-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Application
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold rounded-2xl bg-card"
                    >
                      Browse Opportunities
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
