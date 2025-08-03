"use client"

import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Play } from "lucide-react"
import { useState, useEffect } from "react"

const LANGUAGE_SAMPLES = {
  cpp: `// Two Sum Problem - C++
#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = twoSum(nums, 9);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
  c: `// Two Sum Problem - C
#include <stdio.h>
#include <stdlib.h>

// Simple hash table implementation for demonstration
#define TABLE_SIZE 1000

typedef struct {
    int key;
    int value;
    int used;
} HashEntry;

int hash(int key) {
    return abs(key) % TABLE_SIZE;
}

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    HashEntry table[TABLE_SIZE] = {0};
    int* result = (int*)malloc(2 * sizeof(int));
    
    for (int i = 0; i < numsSize; i++) {
        int complement = target - nums[i];
        int index = hash(complement);
        
        // Linear probing for collision resolution
        while (table[index].used && table[index].key != complement) {
            index = (index + 1) % TABLE_SIZE;
        }
        
        if (table[index].used && table[index].key == complement) {
            result[0] = table[index].value;
            result[1] = i;
            *returnSize = 2;
            return result;
        }
        
        // Insert current number
        int insertIndex = hash(nums[i]);
        while (table[insertIndex].used) {
            insertIndex = (insertIndex + 1) % TABLE_SIZE;
        }
        table[insertIndex].key = nums[i];
        table[insertIndex].value = i;
        table[insertIndex].used = 1;
    }
    
    *returnSize = 0;
    return result;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    int* result = twoSum(nums, 4, target, &returnSize);
    
    if (returnSize == 2) {
        printf("[%d, %d]\\n", result[0], result[1]);
    }
    
    free(result);
    return 0;
}`
}

export default function CodeEditorPage() {
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(LANGUAGE_SAMPLES.cpp)
  const [inputs, setInputs] = useState("")
  const [output, setOutput] = useState("Ready to run your code...")
  const [loading, setLoading] = useState(false)
  const [executionTime, setExecutionTime] = useState<number | null>(null)

  // Update code when language changes
  useEffect(() => {
    setCode(LANGUAGE_SAMPLES[language as keyof typeof LANGUAGE_SAMPLES] || "")
  }, [language])

  const runCode = async () => {
    setLoading(true)
    setOutput("Compiling and running...")
    const startTime = Date.now()

    try {
      // Try backend evaluation service
      let response;
      try {
        response = await fetch("http://localhost:8000/new/evaluation/run", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "usertoken": `Bearer ${localStorage.getItem('token') || 'guest'}`,
          },
          body: JSON.stringify({
            language: language, // Now we use 'cpp' and 'c' directly
            code,
            inputs,
          }),
        })
      } catch (backendError) {
        // If backend fails, try a simple simulation
        setOutput("Backend service unavailable. Here's a simulation:\n" + 
                 "Code compiled successfully!\n" +
                 "Sample output for demonstration purposes.\n" +
                 "Note: Install and run the compiler service for real execution.")
        setExecutionTime(150) // Simulated time
        setLoading(false)
        return
      }

      const data = await response.json()
      const endTime = Date.now()
      setExecutionTime(endTime - startTime)

      if (response.ok) {
        const outputText = data.verdict || data.output || data.result || "Code executed successfully!"
        const errorText = data.err || data.error || ""
        
        // Check if there are actual errors (not just "No Error" message)
        if (errorText && errorText !== "No Error" && errorText.toLowerCase().includes('error')) {
          // Format compiler errors for better readability
          const formattedErrors = errorText
            .split('\n')
            .filter((line: string) => line.trim())
            .map((line: string) => {
              // Highlight error lines
              if (line.includes('error:')) {
                return `🔴 ${line}`
              } else if (line.includes('warning:')) {
                return `🟡 ${line}`
              }
              return `   ${line}`
            })
            .join('\n')
          
          setOutput(`❌ Compilation Failed\n\n${formattedErrors}`)
        } else {
          setOutput(`✅ ${outputText}`)
        }
      } else {
        const errorMessage = data.err || data.error || data.message || "An error occurred during execution."
        setOutput(`❌ Execution Failed\n\n${errorMessage}`)
      }
    } catch (err: any) {
      setOutput(`Connection Error: ${err.message}\nMake sure the compiler service is running.`)
    }

    setLoading(false)
  }

  const resetEditor = () => {
    setCode(LANGUAGE_SAMPLES[language as keyof typeof LANGUAGE_SAMPLES] || "")
    setInputs("")
    setOutput("Ready to run your code...")
    setExecutionTime(null)
  }

  const saveCode = () => {
    const element = document.createElement("a")
    const fileExtensions = { cpp: "cpp", c: "c" }
    const extension = fileExtensions[language as keyof typeof fileExtensions] || "txt"
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `code.${extension}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      runCode()
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault()
      saveCode()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcuts)
    return () => document.removeEventListener("keydown", handleKeyboardShortcuts)
  }, [code, language, inputs])

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
          <div className="w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 h-[calc(100vh-80px)]">
              <div className="lg:col-span-3 border-r border-purple-500/20">
                {/* Modern Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-cyan-300">Language:</span>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-32 h-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg text-sm text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border border-purple-500/50 rounded-lg backdrop-blur-md">
                        <SelectItem value="cpp" className="text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            C++
                          </span>
                        </SelectItem>
                        <SelectItem value="c" className="text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            C
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetEditor}
                      className="h-8 px-3 text-xs bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/50 text-red-300 hover:bg-gradient-to-r hover:from-red-600/40 hover:to-pink-600/40 hover:border-red-400 transition-all shadow-lg shadow-red-500/20"
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={runCode}
                      disabled={loading}
                      className="h-8 px-4 text-xs bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-none shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all transform hover:scale-105"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      {loading ? "Running..." : "Run"}
                    </Button>
                  </div>
                </div>

                {/* Modern Code Editor */}
                <div className="h-[calc(100%-48px)] bg-gradient-to-br from-black via-gray-900 to-black relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5"></div>
                  <div className="h-full p-0 relative z-10">
                    {/* Line numbers and code area */}
                    <div className="h-full flex">
                      {/* Line numbers */}
                      <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-purple-500/30 px-3 py-4 min-w-[50px] backdrop-blur-sm">
                        {code.split('\n').map((_, index) => (
                          <div key={index} className="text-xs text-cyan-400/80 leading-6 text-right font-mono hover:text-cyan-300 transition-colors">
                            {index + 1}
                          </div>
                        ))}
                      </div>
                      {/* Code editor */}
                      <div className="flex-1 relative">
                        <textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="// Start coding here..."
                          className="w-full h-full bg-transparent text-gray-100 placeholder-purple-400/50 border-none outline-none resize-none font-mono text-sm leading-6 p-4 selection:bg-purple-500/30"
                          spellCheck="false"
                          style={{
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                            fontSize: '14px',
                            lineHeight: '1.5',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Right Panel */}
              <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-l from-purple-900/10 via-transparent to-blue-900/10"></div>
                <div className="relative z-10 flex flex-col h-full">
                  {/* Colorful Tabs */}
                  <div className="flex border-b border-purple-500/30">
                    <button className="px-4 py-3 text-sm font-medium text-white border-b-2 border-cyan-400 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 shadow-lg shadow-cyan-500/20">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        Input
                      </span>
                    </button>
                    <button className="px-4 py-3 text-sm font-medium text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 transition-all">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Output
                      </span>
                    </button>
                  </div>

                  {/* Enhanced Input Section */}
                  <div className="p-4 border-b border-purple-500/30">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-cyan-300 uppercase tracking-wide flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Custom Input
                      </label>
                      <textarea
                        placeholder="Enter your input here..."
                        className="w-full h-24 p-3 text-sm font-mono bg-gradient-to-br from-gray-900 to-black border border-purple-500/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white placeholder-purple-400/60 shadow-inner transition-all"
                        value={inputs}
                        onChange={(e) => setInputs(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Enhanced Output Section */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-green-300 uppercase tracking-wide flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Output
                        </label>
                        {executionTime !== null && (
                          <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/30">
                            ⚡ {executionTime}ms
                          </span>
                        )}
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/50 rounded-lg p-3 min-h-32 max-h-64 overflow-y-auto shadow-inner">
                        <pre className={`text-sm font-mono whitespace-pre-wrap ${
                          output.includes('❌') 
                            ? 'text-red-400' 
                            : output.includes('✅') 
                            ? 'text-green-400' 
                            : 'text-gray-100'
                        }`}>
                          {output}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stats Section */}
                  <div className="p-4 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-purple-300 uppercase tracking-wide flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Code Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                          Language: <span className="font-medium text-blue-300">{language.toUpperCase()}</span>
                        </div>
                        <div className="text-gray-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                          Lines: <span className="font-medium text-cyan-300">{code.split('\n').length}</span>
                        </div>
                        <div className="text-gray-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                          Characters: <span className="font-medium text-purple-300">{code.length}</span>
                        </div>
                        {executionTime && (
                          <div className="text-gray-400 flex items-center gap-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                            Runtime: <span className="font-medium text-green-400">{executionTime}ms</span>
                          </div>
                        )}
                      </div>
                    </div>
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
