"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Clock, Users, Trophy, CheckCircle, Code, BookOpen, Target, Zap, Brain, Plus, FileText, Play, Heart, Share2 } from "lucide-react"
import { createProblem, getProblems } from "@/lib/api"

// Interface for problem structure
interface Problem {
  id: string
  title: string
  difficulty: string
  category: string
  acceptance: string
  description: string
  tags: string[]
  timeLimit: string
  memoryLimit: string
  solved: boolean
  inputtype?: string
  totalsubmissions?: number
  createdat?: string
}

// Static problems data to avoid import issues
const STATIC_PROBLEMS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: "49.1%",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    acceptance: "76.7%",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    tags: ["Two Pointers", "String"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "54.5%",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.8%",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ["String", "Stack"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    acceptance: "52.0%",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  }
]

export default function PracticePage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    constraint: "",
    inputtype: ""
  })
  const router = useRouter()

  // Function to transform API problems to match our interface
  const transformApiProblem = (apiProblem: any): Problem => ({
    id: apiProblem.id,
    title: apiProblem.title,
    difficulty: apiProblem.difficulty,
    category: apiProblem.tags?.[0]?.tag?.tagName || "General", // Use first tag as category
    acceptance: "N/A", // API doesn't provide this
    description: apiProblem.description,
    tags: apiProblem.tags?.map((t: any) => t.tag?.tagName).filter(Boolean) || [],
    timeLimit: "1 second", // Default value
    memoryLimit: "256 MB", // Default value
    solved: false // Default value
  })

  // Fetch problems from API
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true)
        const response = await getProblems()
        
        if (response.success && response.problems) {
          // Transform API problems and combine with static problems
          const apiProblems = response.problems.map(transformApiProblem)
          const combinedProblems = [...STATIC_PROBLEMS, ...apiProblems]
          setProblems(combinedProblems)
          setFilteredProblems(combinedProblems)
        } else {
          // If API fails, use static problems only
          setProblems(STATIC_PROBLEMS)
          setFilteredProblems(STATIC_PROBLEMS)
        }
      } catch (error) {
        console.error("Error fetching problems:", error)
        // Fallback to static problems
        setProblems(STATIC_PROBLEMS)
        setFilteredProblems(STATIC_PROBLEMS)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  // Refresh problems list (called after adding a new problem)
  const refreshProblems = async () => {
    try {
      const response = await getProblems()
      if (response.success && response.problems) {
        const apiProblems = response.problems.map(transformApiProblem)
        const combinedProblems = [...STATIC_PROBLEMS, ...apiProblems]
        setProblems(combinedProblems)
        setFilteredProblems(combinedProblems)
      }
    } catch (error) {
      console.error("Error refreshing problems:", error)
    }
  }

  useEffect(() => {
    filterProblems()
  }, [searchTerm, selectedDifficulty, selectedCategory, problems])

  const filterProblems = () => {
    let filtered = problems

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(problem => problem.category === selectedCategory)
    }

    setFilteredProblems(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getDifficultyVariant = (difficulty: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty) {
      case "Easy":
        return "default"
      case "Medium":
        return "secondary"
      case "Hard":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <Zap className="w-4 h-4" />
      case "Medium":
        return <Target className="w-4 h-4" />
      case "Hard":
        return <Brain className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  const handleSolveProblem = (problemId: string) => {
    router.push(`/solve/${problemId}`)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddProblem = async () => {
    if (!formData.title || !formData.description || !formData.difficulty) {
      alert("Please fill in all required fields (Title, Description, Difficulty)")
      return
    }

    setIsSubmitting(true)
    try {
      // Create the problem data with required fields
      const problemData = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        tags: formData.inputtype ? [formData.inputtype] : ["General"], // Convert inputtype to tags
        testCases: [
          {
            input: "1 2",
            output: "3"
          }
        ], // Default test case
        token: localStorage.getItem('token') || '' // Get auth token
      }

      const result = await createProblem(problemData)
      if (result.success) {
        alert("Problem created successfully!")
        setIsDialogOpen(false)
        setFormData({
          title: "",
          description: "",
          difficulty: "",
          constraint: "",
          inputtype: ""
        })
        // Refresh the problems list to show the new problem
        await refreshProblems()
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      alert("Failed to create problem. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getUniqueCategories = () => {
    const categories = problems.map(problem => problem.category)
    return Array.from(new Set(categories))
  }

  const getStatistics = () => {
    const total = problems.length
    const solved = problems.filter(p => p.solved).length
    const easy = problems.filter(p => p.difficulty === "Easy").length
    const medium = problems.filter(p => p.difficulty === "Medium").length
    const hard = problems.filter(p => p.difficulty === "Hard").length

    return { total, solved, easy, medium, hard }
  }

  const stats = getStatistics()

  if (loading) {
    return (
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading problems...</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-gradient-main min-h-screen">
          <div className="w-full">
            {/* Header Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Practice Problems
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Sharpen your coding skills with our curated collection of algorithmic challenges
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Problem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Problem</DialogTitle>
                      <DialogDescription>
                        Create a new coding problem for the practice platform.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter problem title"
                          value={formData.title}
                          onChange={(e) => handleFormChange("title", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter problem description"
                          rows={6}
                          value={formData.description}
                          onChange={(e) => handleFormChange("description", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="difficulty">Difficulty *</Label>
                          <Select value={formData.difficulty} onValueChange={(value) => handleFormChange("difficulty", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="inputtype">Input Type</Label>
                          <Input
                            id="inputtype"
                            placeholder="e.g., Array, String, etc."
                            value={formData.inputtype}
                            onChange={(e) => handleFormChange("inputtype", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="constraint">Constraints</Label>
                        <Textarea
                          id="constraint"
                          placeholder="Enter problem constraints"
                          rows={3}
                          value={formData.constraint}
                          onChange={(e) => handleFormChange("constraint", e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleAddProblem} 
                          disabled={isSubmitting}
                          className="btn-primary"
                        >
                          {isSubmitting ? "Creating..." : "Create Problem"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-blue">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    Total Problems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-primary">{stats.total}</div>
                  <div className="text-sm text-muted-foreground mt-1">Available challenges</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card dark:glow-green">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-green-500">{stats.solved}</div>
                  <div className="text-sm text-muted-foreground mt-1">Completed problems</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-green-500" />
                    </div>
                    Easy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-green-500">{stats.easy}</div>
                  <div className="text-sm text-muted-foreground mt-1">Beginner friendly</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-yellow-500" />
                    </div>
                    Medium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-yellow-500">{stats.medium}</div>
                  <div className="text-sm text-muted-foreground mt-1">Intermediate level</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all rounded-3xl feature-card">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center font-bold">
                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center mr-4">
                      <Brain className="w-6 h-6 text-red-500" />
                    </div>
                    Hard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-red-500">{stats.hard}</div>
                  <div className="text-sm text-muted-foreground mt-1">Expert challenges</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters Section */}
            <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card mb-8">
              <CardHeader className="p-8">
                <CardTitle className="text-foreground flex items-center font-bold text-2xl">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  Find Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Search</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        placeholder="Search problems or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 rounded-2xl border-2 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Difficulty</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="h-12 rounded-2xl border-2 bg-background/50">
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-12 rounded-2xl border-2 bg-background/50">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {getUniqueCategories().map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Problems Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-lg text-muted-foreground">Loading practice problems...</p>
                </div>
              </div>
            ) : filteredProblems.length === 0 ? (
              <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                <CardContent className="text-center py-16">
                  <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No Problems Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {problems.length === 0 
                      ? "No problems available yet. Add some problems to get started!"
                      : "Try adjusting your search criteria or browse all problems."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredProblems.map((problem) => (
                  <Card 
                    key={problem.id} 
                    className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl feature-card group cursor-pointer"
                    onClick={() => window.open(`/solve/${problem.id}`, '_blank')}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge 
                              variant={getDifficultyVariant(problem.difficulty)}
                              className="px-4 py-2 text-sm font-semibold rounded-full"
                            >
                              {problem.difficulty}
                            </Badge>
                            <div className="text-sm text-muted-foreground font-medium">
                              Problem #{problem.id}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {problem.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-base line-clamp-3">
                            {problem.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 ml-6">
                          <div className="text-right space-y-2">
                            <div className="text-sm text-muted-foreground">Solved by</div>
                            <div className="text-2xl font-bold text-primary">
                              {problem.totalsubmissions || 0}
                            </div>
                          </div>
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Code className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      </div>

                      {/* Problem Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
                        {problem.inputtype && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Input Type</div>
                              <div className="font-semibold text-foreground">{problem.inputtype}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Submissions</div>
                            <div className="font-semibold text-foreground">
                              {problem.totalsubmissions || 0}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Added</div>
                            <div className="font-semibold text-foreground">
                              {problem.createdat ? new Date(problem.createdat).toLocaleDateString() : 'Recently'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                        <Button 
                          className="btn-primary flex-1 h-12 rounded-2xl font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/solve/${problem.id}`, '_blank');
                          }}
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Solve Problem
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-2xl border-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to favorites functionality
                          }}
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-2xl border-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Share functionality
                          }}
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Problems Count */}
            {filteredProblems.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground text-lg">
                  Showing <span className="font-bold text-primary">{filteredProblems.length}</span> of{' '}
                  <span className="font-bold text-primary">{problems.length}</span> problems
                </p>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
