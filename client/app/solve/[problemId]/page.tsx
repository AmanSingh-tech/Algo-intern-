"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CodeEditor from "@/components/code-editor"
import { Loader2, Play, RotateCcw, Clock, MemoryStick, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"

interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  timeLimit: string
  memoryLimit: string
  hints: string[]
  acceptance: string
  submissions: string
  companies: string[]
  tags: string[]
}

// Static problems data to avoid import issues
const staticProblems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Again, the best way to approach this problem is to think about what we need and whether we can trade space for time.",
      "What if we could look up each complement in constant time?"
    ],
    acceptance: "47.3%",
    submissions: "17.2M",
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple"],
    tags: ["Array", "Hash Table"]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "Two Pointers",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    hints: [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!"
    ],
    acceptance: "74.9%",
    submissions: "2.1M",
    companies: ["Microsoft", "Amazon", "Apple"],
    tags: ["Two Pointers", "String"]
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    hints: [
      "Try to solve this problem using Kadane's algorithm.",
      "If you're having trouble with the algorithm, try to think about when you would want to start a new subarray."
    ],
    acceptance: "49.9%",
    submissions: "3.4M",
    companies: ["Microsoft", "Amazon", "Apple", "Facebook", "Google"],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    hints: [
      "An interesting property about a valid parenthesis expression is that a sub-expression of a valid expression should also be a valid expression.",
      "What if whenever we encounter a matching pair of parenthesis in the expression, we simply remove it from the expression?",
      "Use a stack of characters."
    ],
    acceptance: "40.7%",
    submissions: "4.8M",
    companies: ["Microsoft", "Amazon", "Facebook", "Google", "Bloomberg"],
    tags: ["String", "Stack"]
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    hints: [
      "To reach nth step, what could have been your previous steps? (Think about the step sizes)",
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      "Think dynamic programming. What's the relation between the number of ways to reach the (n-1)th step and (n-2)th step with the number of ways to reach the nth step?"
    ],
    acceptance: "52.1%",
    submissions: "2.9M",
    companies: ["Amazon", "Microsoft", "Apple", "Adobe"],
    tags: ["Math", "Dynamic Programming", "Memoization"]
  }
]

function getProblemById(id: string): Problem | null {
  return staticProblems.find(problem => problem.id === id) || null
}

export default function SolvePage() {
  const params = useParams()
  const problemId = params.problemId as string
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showHints, setShowHints] = useState(false)

  useEffect(() => {
    loadProblem()
  }, [problemId])

  const loadProblem = () => {
    try {
      const foundProblem = getProblemById(problemId)
      if (foundProblem) {
        setProblem(foundProblem)
      } else {
        setError("Problem not found.")
      }
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 border-green-500/30 bg-green-500/10"
      case "Medium":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
      case "Hard":
        return "text-red-400 border-red-500/30 bg-red-500/10"
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10"
    }
  }

  const getDefaultCodeTemplate = (problem: Problem) => {
    return `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

/*
Problem: ${problem.title}
Difficulty: ${problem.difficulty}
Category: ${problem.category}

Description:
${problem.description.split('\n')[0]}...

Time Limit: ${problem.timeLimit}
Memory Limit: ${problem.memoryLimit}
*/

int main() {
    // Your solution here
    
    return 0;
}`
  }

  if (loading) {
    return (
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading problem...</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Problem Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || "The requested problem could not be found."}
              </p>
              <Button 
                onClick={() => window.history.back()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go Back
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex">
          {/* Problem Description Panel - Left Side */}
          <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {problem.title}
                </h1>
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Acceptance: {problem.acceptance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span>Submissions: {problem.submissions}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{problem.timeLimit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MemoryStick className="w-4 h-4 text-purple-500" />
                  <span>{problem.memoryLimit}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Problem Description */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Problem Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{problem.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Input: </span>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">Output: </span>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-medium">Explanation: </span>
                            <span className="text-gray-600 dark:text-gray-400">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Constraints */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Constraints</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Hints */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Hints
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHints(!showHints)}
                      className="ml-auto"
                    >
                      {showHints ? "Hide" : "Show"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                {showHints && (
                  <CardContent>
                    <div className="space-y-2">
                      {problem.hints.map((hint, index) => (
                        <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <span className="font-medium text-yellow-800 dark:text-yellow-200">Hint {index + 1}: </span>
                          <span className="text-yellow-700 dark:text-yellow-300">{hint}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Code Editor Panel - Right Side */}
          <div className="w-1/2 flex flex-col">
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Solution
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-900">
              <CodeEditor 
                initialCode={getDefaultCodeTemplate(problem)} 
                initialLanguage="cpp"
                className="h-full"
              />
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
