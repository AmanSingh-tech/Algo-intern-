"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, FileText, Sparkles, CheckCircle, AlertTriangle, Lightbulb, Download, Eye } from "lucide-react"
import { analyzeResume } from "@/lib/ai-api"
import { downloadPDF, displayPDF, generateAnalysisPDF } from "@/lib/pdf-utils"

export default function AIResumeAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [resumeText, setResumeText] = useState("")
  const [targetRole, setTargetRole] = useState("")

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume content")
      return
    }

    setLoading(true)
    try {
      // For demo purposes, we'll use a dummy token
      const token = "demo-token"
      
      const response = await analyzeResume({
        resumeText,
        targetRole,
        token
      })

      if (response.success) {
        setAnalysis(response.analysis)
      } else {
        console.error('Failed to analyze resume:', response.msg)
      }
    } catch (error) {
      console.error('Error analyzing resume:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (analysis) {
      const userInfo = {
        targetRole: targetRole || 'Resume Analysis',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        analysis, 
        'AI Resume Analysis Report', 
        userInfo
      )
      
      const filename = `resume_analysis_${Date.now()}.pdf`
      doc.save(filename)
    }
  }

  const handleDisplayPDF = () => {
    if (analysis) {
      const userInfo = {
        targetRole: targetRole || 'Resume Analysis',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        analysis, 
        'AI Resume Analysis Report', 
        userInfo
      )
      
      const pdfUrl = doc.output('bloburl')
      window.open(pdfUrl, '_blank')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8">
          <CardTitle className="text-2xl font-black text-foreground flex items-center">
            <FileText className="w-6 h-6 mr-3 text-primary" />
            AI Resume Analyzer
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Get detailed feedback and improvement suggestions for your resume
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <div>
            <Label htmlFor="targetRole" className="text-foreground font-medium mb-2 block">
              Target Role (Optional)
            </Label>
            <Input
              id="targetRole"
              placeholder="e.g., Software Engineering Intern, Data Science Intern"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-card border-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="resumeText" className="text-foreground font-medium mb-2 block">
              Resume Content
            </Label>
            <Textarea
              id="resumeText"
              placeholder="Paste your resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[300px] bg-card border-border text-foreground resize-y"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Copy and paste the text content of your resume here for analysis
            </p>
          </div>

          <Button 
            onClick={handleAnalyzeResume}
            disabled={loading || !resumeText.trim()}
            className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze My Resume
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black text-foreground flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                  Resume Analysis Results
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Detailed feedback and actionable recommendations
                </CardDescription>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleDisplayPDF}
                  variant="outline"
                  size="sm"
                  className="border-2 border-border bg-card hover:bg-muted/50 text-foreground"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View PDF
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  size="sm"
                  className="border-2 border-border bg-card hover:bg-muted/50 text-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {analysis}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-l-4 border-blue-500">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Pro Tip
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use this analysis to update your resume before applying to internships. 
                    Focus on the specific recommendations for your target role to maximize your chances.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
