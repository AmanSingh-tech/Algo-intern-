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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import CodeEditor from "@/components/code-editor"
import { 
  Loader2, 
  Play, 
  RotateCcw, 
  Clock, 
  MemoryStick, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Trophy,
  Users,
  Building,
  Code,
  Terminal,
  Bug,
  Send,
  ThumbsUp,
  ThumbsDown,
  Star,
  Share2,
  BookOpen,
  Zap,
  Target,
  Brain
} from "lucide-react"

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
  const [selectedLanguage, setSelectedLanguage] = useState("cpp")
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("description")
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    loadProblem()
  }, [problemId])

  useEffect(() => {
    if (problem) {
      setCode(getLanguageTemplate(selectedLanguage, problem))
    }
  }, [problem, selectedLanguage])

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
        return "text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "Hard":
        return "text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
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

  const getLanguageTemplate = (language: string, problem: Problem) => {
    const templates = {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Implement your solution here
    int twoSum(vector<int>& nums, int target) {
        
    }
};

int main() {
    Solution solution;
    // Test your solution here
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    int result = solution.twoSum(nums, target);
    cout << result << endl;
    
    return 0;
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # TODO: Implement your solution here
        pass

# Test your solution
if __name__ == "__main__":
    solution = Solution()
    nums = [2, 7, 11, 15]
    target = 9
    
    result = solution.twoSum(nums, target)
    print(result)`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // TODO: Implement your solution here
    
};

// Test your solution
const nums = [2, 7, 11, 15];
const target = 9;

const result = twoSum(nums, target);
console.log(result);`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // TODO: Implement your solution here
        
    }
}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`
    }
    return templates[language as keyof typeof templates] || templates.cpp
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    if (problem) {
      setCode(getLanguageTemplate(language, problem))
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate API call
    setTimeout(() => {
      setTestResults([
        { id: 1, input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]", status: "passed", time: "0ms", memory: "41.2MB" },
        { id: 2, input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]", status: "passed", time: "0ms", memory: "41.4MB" },
        { id: 3, input: "[3,3], 6", expected: "[0,1]", actual: "[0,1]", status: "passed", time: "0ms", memory: "41.1MB" }
      ])
      setIsRunning(false)
      setActiveTab("testcase")
    }, 2000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setActiveTab("result")
    }, 3000)
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
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 bg-background">
          <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
            {/* Problem Description Panel */}
            <ResizablePanel defaultSize={45} minSize={30}>
              <div className="h-full flex flex-col bg-white dark:bg-gray-900">
                {/* Simple Problem Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {problem.title}
                    </h1>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} font-semibold`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Acceptance: {problem.acceptance}</span>
                    <span>Submissions: {problem.submissions}</span>
                    <span>{problem.timeLimit}</span>
                    <span>{problem.memoryLimit}</span>
                  </div>
                </div>

                {/* Simple Problem Content */}
                <ScrollArea className="flex-1 px-6">
                  <div className="py-6 space-y-6">
                    {/* Problem Description */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Description</h3>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {problem.description}
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Examples</h3>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded p-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Example {index + 1}:</div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Input: </span>
                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                                  {example.input}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium">Output: </span>
                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
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
                      </div>
                    </div>

                    {/* Constraints */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Constraints</h3>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm">• {constraint}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-border hover:bg-border/80 transition-colors" />

            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={55} minSize={40}>
              <div className="h-full flex flex-col bg-black">
                {/* Enhanced Header */}
                <div className="bg-gray-900 border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-400" />
                        Code Editor
                      </h2>
                      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-[130px] bg-gray-800 border-gray-600 text-white hover:bg-gray-700 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="cpp" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                              C++
                            </span>
                          </SelectItem>
                          <SelectItem value="python" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                              Python
                            </span>
                          </SelectItem>
                          <SelectItem value="javascript" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              JavaScript
                            </span>
                          </SelectItem>
                          <SelectItem value="java" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                              Java
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                        {selectedLanguage.toUpperCase()}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                      >
                        {isRunning ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        Run Code
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Code Editor */}
                <div className="flex-1 bg-black">
                  <CodeEditor 
                    initialCode={code} 
                    initialLanguage={selectedLanguage}
                    className="h-full"
                  />
                </div>

                {/* Enhanced Test Results */}
                <div className="h-64 border-t border-gray-700 bg-gray-900">
                  <div className="h-full flex flex-col">
                    {/* Test Results Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        Test Results
                      </h3>
                      {testResults.length > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-green-400">
                            {testResults.filter(r => r.status === 'passed').length} Passed
                          </span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-400">{testResults.length} Total</span>
                        </div>
                      )}
                    </div>

                    {/* Test Results Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {testResults.length > 0 ? (
                        <div className="space-y-3">
                          {testResults.map((result, index) => (
                            <div key={result.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:bg-gray-750 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium">Case {index + 1}</span>
                                  {result.status === "passed" ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span className="bg-gray-700 px-2 py-1 rounded">{result.time}</span>
                                  <span className="bg-gray-700 px-2 py-1 rounded">{result.memory}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-300 font-mono bg-gray-900 p-2 rounded">
                                <div><span className="text-blue-400">Input:</span> {result.input}</div>
                                <div><span className="text-green-400">Expected:</span> {result.expected}</div>
                                <div><span className="text-yellow-400">Output:</span> {result.actual}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Bug className="w-8 h-8 text-gray-600" />
                          </div>
                          <h4 className="text-white font-medium mb-2">No Test Results Yet</h4>
                          <p className="text-gray-400 text-sm max-w-sm">
                            Click "Run Code" to execute your solution and see the test results here.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </SidebarInset>
    </>
  )
}
