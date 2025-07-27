"use client"

import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Save,
  Download,
  Settings,
  Code,
  Terminal,
  FileText,
} from "lucide-react"
import { useState } from "react"

export default function CodeEditorPage() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(`// Welcome to CodeArena Code Editor
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9));`)
  const [inputs, setInputs] = useState("")
  const [output, setOutput] = useState("Ready to run your code...")
  const [loading, setLoading] = useState(false)

  const runCode = async () => {
    setLoading(true)
    setOutput("Running...")

    try {
      const response = await fetch("http://localhost:3002/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language === "c++" ? "cpp" : language,
          code,
          inputs,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setOutput(data.verdict || "No output.")
      } else {
        setOutput(data.err || "An error occurred.")
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`)
    }

    setLoading(false)
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 bg-gradient-main min-h-screen">
          <div className="w-full h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Code Editor
                </h1>
                <p className="text-muted-foreground">
                  Professional IDE with real-time collaboration and debugging
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-48 h-12 bg-card/80 backdrop-blur-sm border-2 border-border rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-xl">
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="h-12 px-6 border-2 border-primary/30 bg-card/80 backdrop-blur-sm text-primary hover:bg-primary/10 rounded-xl font-semibold"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
              <div className="lg:col-span-3">
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg h-full rounded-3xl overflow-hidden dark:glow-purple">
                  <CardHeader className="pb-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground font-bold flex items-center">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
                          <Code className="w-5 h-5 text-primary" />
                        </div>
                        Editor
                      </CardTitle>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          onClick={runCode}
                          disabled={loading}
                          className="btn-primary text-primary-foreground font-semibold px-6 py-2 rounded-xl shadow-lg"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {loading ? "Running..." : "Run"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-primary/30 bg-card hover:bg-primary/10 text-primary font-semibold px-4 py-2 rounded-xl"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-accent/30 bg-card hover:bg-accent/10 text-accent font-semibold px-4 py-2 rounded-xl"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-full">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-slate-900 text-green-400 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-6 rounded-none"
                      placeholder="Write your code here..."
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-orange">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground font-bold flex items-center">
                      <div className="w-8 h-8 bg-orange-400/20 rounded-xl flex items-center justify-center mr-3">
                        <Terminal className="w-4 h-4 text-orange-400" />
                      </div>
                      Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter stdin input here..."
                      className="bg-slate-900 text-green-400 font-mono text-sm h-28 resize-none"
                      value={inputs}
                      onChange={(e) => setInputs(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground font-bold flex items-center">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center mr-3">
                        <Terminal className="w-4 h-4 text-accent" />
                      </div>
                      Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 p-4 rounded-xl min-h-32">
                      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground font-bold">Shortcuts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span className="font-medium">Run Code</span>
                        <span className="font-mono bg-muted/50 px-2 py-1 rounded">Ctrl + Enter</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span className="font-medium">Save</span>
                        <span className="font-mono bg-muted/50 px-2 py-1 rounded">Ctrl + S</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span className="font-medium">Format</span>
                        <span className="font-mono bg-muted/50 px-2 py-1 rounded">Ctrl + Shift + F</span>
                      </div>
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
