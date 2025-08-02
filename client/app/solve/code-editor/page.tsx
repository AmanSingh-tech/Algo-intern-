"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Play, 
  Upload, 
  RotateCcw, 
  Code2, 
  Terminal, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Clock,
  MemoryStick
} from "lucide-react"
import { runCode, submitCode, getProblem } from "@/lib/api"

// Problem interface
interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
  constraints: string
  inputtype: string
  tags: any[]
  category?: string
  acceptance?: string
  timeLimit?: string
  memoryLimit?: string
}

function CodeEditorContent() {
  const searchParams = useSearchParams()
  const problemId = searchParams.get('problemId')
  
  // Problem state
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Editor state
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("Ready to run your code...")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  // Load problem data
  useEffect(() => {
    if (!problemId) return
    
    const loadProblem = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getProblem(problemId)
        
        if (response.success && response.problem) {
          setProblem(response.problem)
          setCode(getDefaultTemplate(response.problem, language))
        } else {
          setError("Problem not found.")
        }
      } catch (err: any) {
        setError(err.message || "Failed to load problem")
      } finally {
        setLoading(false)
      }
    }

    loadProblem()
  }, [problemId])

  // Update code template when language changes
  useEffect(() => {
    if (problem) {
      setCode(getDefaultTemplate(problem, language))
    }
  }, [language, problem])

  const getDefaultTemplate = (problem: Problem, lang: string) => {
    // Create a generic function name based on the problem title
    const functionName = problem.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores

    const templates = {
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

/*
Problem: ${problem.title}
Difficulty: ${problem.difficulty}

Description:
${problem.description.split('\n')[0]}...
*/

class Solution {
public:
    // Write your solution here
    void ${functionName}() {
        
    }
};

int main() {
    Solution solution;
    solution.${functionName}();
    
    return 0;
}`,
      python: `"""
Problem: ${problem.title}
Difficulty: ${problem.difficulty}

Description:
${problem.description.split('\n')[0]}...
"""

class Solution:
    def ${functionName}(self):
        # Write your solution here
        pass

# Test case
solution = Solution()
solution.${functionName}()`,
      java: `/*
Problem: ${problem.title}
Difficulty: ${problem.difficulty}

Description:
${problem.description.split('\n')[0]}...
*/

class Solution {
    public void ${functionName}() {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        solution.${functionName}();
    }
}`,
      javascript: `/*
Problem: ${problem.title}
Difficulty: ${problem.difficulty}

Description:
${problem.description.split('\n')[0]}...
*/

function ${functionName}() {
    // Write your solution here
    
}

// Test case
${functionName}();`
    }
    
    return templates[lang as keyof typeof templates] || templates.cpp
  }

  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput("❌ Error: Please write some code first!")
      return
    }

    setIsRunning(true)
    setOutput("🔄 Running code...")
    setTestResults(null)

    try {
      const userToken = "demo-token"
      let result
      
      if (problemId) {
        result = await runCode({
          problemId,
          code,
          language,
          token: userToken,
        })
      } else {
        // Simple fallback for testing without problem context
        setOutput("❌ Error: No problem context available for testing")
        return
      }

      if (result.success) {
        setOutput(`✅ All Test Cases Passed!\n\nTotal Test Cases: ${result.totalTestCases}\nExecution completed successfully!`)
        setTestResults({
          success: true,
          totalTests: result.totalTestCases,
          passedTests: result.totalTestCases
        })
      } else {
        let errorMessage = "❌ Execution Failed!\n\n"
        
        if (result.errorcode === 3) {
          errorMessage += `Compilation Error:\n${result.err}`
        } else if (result.errorcode === 4) {
          errorMessage += `Test Case Failed (${result.failedTestCase}/${result.totalTestCases}):\n\n`
          errorMessage += `Input: ${result.testcase}\n`
          errorMessage += `Expected: ${result.expected}\n`
          errorMessage += `Got: ${result.received}`
          
          setTestResults({
            success: false,
            totalTests: result.totalTestCases,
            passedTests: result.failedTestCase - 1,
            failedTest: result.failedTestCase
          })
        } else {
          errorMessage += result.msg || result.error || "Unknown error occurred"
        }
        
        setOutput(errorMessage)
      }
    } catch (error: any) {
      const errorMessage = `❌ Network Error!\n\n${error.message}`
      setOutput(errorMessage)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitCode = async () => {
    if (!problemId) {
      setOutput("❌ Cannot submit: No problem context available")
      return
    }

    if (!code.trim()) {
      setOutput("❌ Cannot submit: Please write some code first!")
      return
    }

    const userToken = "demo-token"

    setIsSubmitting(true)
    setOutput("📤 Submitting solution...")

    try {
      const result = await submitCode({
        problemId,
        code,
        language,
        token: userToken,
      })

      if (result.success) {
        setOutput(`🎉 Submission Successful!\n\n${result.msg}`)
      } else {
        setOutput(`❌ Submission Failed!\n\n${result.msg || "Unknown error"}`)
      }
    } catch (error: any) {
      const errorMessage = `❌ Submission Error!\n\n${error.message}`
      setOutput(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (problem) {
      setCode(getDefaultTemplate(problem, language))
      setOutput("Ready to run your code...")
      setTestResults(null)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50 border-green-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Hard":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col bg-gray-900">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-lg text-gray-300">Loading problem...</p>
            </div>
          </div>
        </SidebarInset>
      </div>
    )
  }

  if (error || !problem) {
    return (
      <div className="flex h-screen bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col bg-gray-900">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{error || "Problem not found"}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col bg-gray-900">
        <Header />
        
        {/* Problem Header */}
        <div className="border-b bg-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>
                {problem.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{problem.timeLimit || "1s"}</span>
              </div>
              <div className="flex items-center gap-1">
                <MemoryStick className="w-4 h-4" />
                <span>{problem.memoryLimit || "256MB"}</span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 flex overflow-hidden bg-gray-900">
          {/* Problem Description Panel */}
          <div className="w-1/2 border-r flex flex-col bg-gray-900">
            <div className="p-4 border-b bg-gray-800">
              <h2 className="text-lg font-semibold text-white">Problem Description</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 mb-6">
                  {problem.description}
                </div>
                
                {problem.inputtype && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-white">Examples</h3>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <pre className="text-sm text-gray-300">{problem.inputtype}</pre>
                    </div>
                  </div>
                )}
                
                {problem.constraints && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-white">Constraints</h3>
                    <div className="text-sm text-gray-300 whitespace-pre-wrap">
                      {problem.constraints}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className="w-1/2 flex flex-col bg-gray-900">
            {/* Editor Header */}
            <div className="p-4 border-b bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-white" />
                  <h2 className="text-lg font-semibold text-white">Code Editor</h2>
                  {testResults && (
                    <div className="flex items-center gap-2">
                      {testResults.success ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-300">
                        {testResults.passedTests}/{testResults.totalTests} tests passed
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRunCode} 
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Run
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    onClick={handleSubmitCode} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-1" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 bg-gray-900">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-4"
                placeholder="Write your solution here..."
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              />
            </div>

            {/* Output Panel */}
            <div className="h-48 border-t bg-gray-900">
              <div className="p-3 border-b bg-gray-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white" />
                  <h3 className="font-semibold text-white">Output</h3>
                </div>
              </div>
              <div className="p-4 h-40 overflow-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap text-gray-300">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}

export default function SolveCodeEditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <CodeEditorContent />
    </Suspense>
  )
}
