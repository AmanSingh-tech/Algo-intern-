"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, Code } from "lucide-react"

interface CodeEditorProps {
  initialCode: string
  initialLanguage?: string
  className?: string
}

export default function CodeEditor({ initialCode, initialLanguage = "javascript", className = "" }: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("Ready to run your code...")

  const runCode = () => {
    setOutput("Running code...\n[1, 0]\nExecution completed successfully!")
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center space-x-2">
          <Code className="w-5 h-5 text-primary" />
          <span>Editor</span>
        </h2>
        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 h-10 rounded-xl border-2 border-border bg-card/80 backdrop-blur-sm">
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
          <Button variant="outline" onClick={runCode} className="rounded-xl h-10 px-4">
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden rounded-3xl bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg">
        <CardContent className="p-0 h-full">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-slate-900 text-green-400 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-6 rounded-none"
            placeholder="Write your code here..."
          />
        </CardContent>
      </Card>

      <Card className="mt-4 rounded-3xl bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground font-bold flex items-center space-x-2">
            <Play className="w-5 h-5 text-primary" />
            <span>Output</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
