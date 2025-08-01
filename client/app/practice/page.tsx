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
import { Search, Clock, Users, Trophy, CheckCircle, Code, BookOpen, Target, Zap, Brain, Plus } from "lucide-react"
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
      const result = await createProblem(formData)
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Problems</h1>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
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
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isSubmitting ? "Creating..." : "Create Problem"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Sharpen your coding skills with our curated collection of algorithmic challenges
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.total}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Solved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.solved}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.easy}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Medium</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.medium}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Hard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.hard}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search problems or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
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
          <div className="grid gap-4">
            {filteredProblems.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No problems found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </Card>
            ) : (
              filteredProblems.map((problem) => (
                <Card key={problem.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {problem.solved && (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {problem.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`flex items-center gap-1 ${getDifficultyColor(problem.difficulty)}`}>
                            {getDifficultyIcon(problem.difficulty)}
                            {problem.difficulty}
                          </Badge>

                          <Badge variant="secondary" className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {problem.category}
                          </Badge>

                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{problem.acceptance}</span>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{problem.timeLimit}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {problem.description.slice(0, 150)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {problem.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {problem.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{problem.tags.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        <Button 
                          onClick={() => handleSolveProblem(problem.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Solve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Load More or Pagination could go here */}
          {filteredProblems.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Showing {filteredProblems.length} of {problems.length} problems
              </p>
            </div>
          )}
        </main>
      </SidebarInset>
    </div>
  )
}
