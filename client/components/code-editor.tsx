"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Download, Upload, Settings, Maximize2, Minimize2 } from "lucide-react"

interface CodeEditorProps {
  initialCode: string
  initialLanguage?: string
  className?: string
}

export default function CodeEditor({ initialCode, initialLanguage = "javascript", className = "" }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState(14)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab key functionality
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.target as HTMLTextAreaElement
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value
      const newValue = value.substring(0, start) + '    ' + value.substring(end)
      setCode(newValue)
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
      }, 0)
    }
  }

  const getLineNumbers = () => {
    const lines = code.split('\n').length
    return Array.from({ length: lines }, (_, i) => i + 1)
  }

  return (
    <div className={`h-full flex flex-col bg-[#1a1a1a] ${className}`}>
      {/* LeetCode-style Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#262626] border-b border-[#3a3a3a]">
        <div className="flex items-center space-x-3">
          <span className="text-[#eff1f6bf] text-sm font-medium">
            {initialLanguage === 'cpp' ? 'C++' : initialLanguage === 'python' ? 'Python' : initialLanguage === 'java' ? 'Java' : 'JavaScript'}
          </span>
          <div className="h-4 w-px bg-[#3a3a3a]"></div>
          <span className="text-[#eff1f680] text-xs">
            main.{initialLanguage === 'cpp' ? 'cpp' : initialLanguage === 'python' ? 'py' : initialLanguage === 'java' ? 'java' : 'js'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-3 text-[#eff1f680] hover:text-[#eff1f6bf] hover:bg-[#3a3a3a] text-xs border border-[#3a3a3a] hover:border-[#4a4a4a] transition-all"
          >
            <Copy className="w-3.5 h-3.5 mr-1" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize(prev => Math.min(prev + 1, 20))}
            className="h-8 px-2 text-[#eff1f680] hover:text-[#eff1f6bf] hover:bg-[#3a3a3a] text-xs border border-[#3a3a3a] hover:border-[#4a4a4a]"
          >
            A+
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize(prev => Math.max(prev - 1, 10))}
            className="h-8 px-2 text-[#eff1f680] hover:text-[#eff1f6bf] hover:bg-[#3a3a3a] text-xs border border-[#3a3a3a] hover:border-[#4a4a4a]"
          >
            A-
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2 text-[#eff1f680] hover:text-[#eff1f6bf] hover:bg-[#3a3a3a] border border-[#3a3a3a] hover:border-[#4a4a4a]"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex bg-[#1a1a1a] relative">
        {/* Line Numbers */}
        <div className="bg-[#1a1a1a] text-[#6c7086] text-right py-4 px-4 font-mono text-sm border-r border-[#3a3a3a] select-none min-w-[60px]">
          {getLineNumbers().map(num => (
            <div 
              key={num} 
              className="leading-6 hover:text-[#eff1f680] transition-colors" 
              style={{ fontSize: `${fontSize}px` }}
            >
              {String(num).padStart(2, ' ')}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-[#1a1a1a] text-[#eff1f6bf] font-mono resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-4 px-4 rounded-none leading-6 placeholder:text-[#6c7086]"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: '1.5',
              minHeight: '100%'
            }}
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* LeetCode-style Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#262626] border-t border-[#3a3a3a] text-xs">
        <div className="flex items-center space-x-4 text-[#6c7086]">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-[#00b8a3] rounded-full"></div>
            <span>Ready</span>
          </span>
          <span>Ln {code.split('\n').length}</span>
          <span>Col {code.length > 0 ? code.split('\n').pop()?.length || 0 : 0}</span>
        </div>
        <div className="flex items-center space-x-4 text-[#6c7086]">
          <span>UTF-8</span>
          <span>Spaces: 4</span>
          <span className="text-[#eff1f680]">{initialLanguage.charAt(0).toUpperCase() + initialLanguage.slice(1)}</span>
        </div>
      </div>
    </div>
  )
}
