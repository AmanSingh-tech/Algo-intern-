"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, FileText, Sparkles, Copy, Download, Eye } from "lucide-react"
import { generateCoverLetter } from "@/lib/ai-api"
import { generateAnalysisPDF } from "@/lib/pdf-utils"

export default function AICoverLetterGenerator() {
  const [loading, setLoading] = useState(false)
  const [coverLetter, setCoverLetter] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [userProfile, setUserProfile] = useState({
    name: "",
    skills: "",
    experience: "",
    education: "",
    achievements: ""
  })
  const [companyInfo, setCompanyInfo] = useState("")

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      alert("Please provide the job description")
      return
    }

    setLoading(true)
    try {
      // For demo purposes, we'll use a dummy token
      const token = "demo-token"
      
      const profileData = {
        ...userProfile,
        skills: userProfile.skills.split(",").map(s => s.trim()).filter(s => s)
      }
      
      const response = await generateCoverLetter({
        jobDescription,
        userProfile: profileData,
        companyInfo,
        token
      })

      if (response.success) {
        setCoverLetter(response.coverLetter)
      } else {
        console.error('Failed to generate cover letter:', response.msg)
      }
    } catch (error) {
      console.error('Error generating cover letter:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyCoverLetter = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter)
      alert("Cover letter copied to clipboard!")
    }
  }

  const handleDownloadPDF = () => {
    if (coverLetter) {
      const userInfo = {
        name: userProfile.name || 'Cover Letter',
        targetRole: 'Cover Letter Generation',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        coverLetter, 
        'AI Generated Cover Letter', 
        userInfo
      )
      
      const filename = `cover_letter_${Date.now()}.pdf`
      doc.save(filename)
    }
  }

  const handleDisplayPDF = () => {
    if (coverLetter) {
      const userInfo = {
        name: userProfile.name || 'Cover Letter',
        targetRole: 'Cover Letter Generation',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        coverLetter, 
        'AI Generated Cover Letter', 
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
            AI Cover Letter Generator
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Generate personalized cover letters tailored to specific job descriptions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* Job Description */}
          <div>
            <Label htmlFor="jobDescription" className="text-foreground font-medium mb-2 block">
              Job Description *
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] bg-card border-border text-foreground resize-y"
            />
          </div>

          {/* User Profile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="education" className="text-foreground font-medium">Education</Label>
                <Input
                  id="education"
                  placeholder="Your degree and university"
                  value={userProfile.education}
                  onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skills" className="text-foreground font-medium">Skills (comma-separated)</Label>
              <Input
                id="skills"
                placeholder="JavaScript, React, Python, etc."
                value={userProfile.skills}
                onChange={(e) => setUserProfile({...userProfile, skills: e.target.value})}
                className="mt-2 bg-card border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="text-foreground font-medium">Relevant Experience</Label>
              <Textarea
                id="experience"
                placeholder="Brief description of your relevant experience, projects, or coursework"
                value={userProfile.experience}
                onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
                className="mt-2 bg-card border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="achievements" className="text-foreground font-medium">Key Achievements (Optional)</Label>
              <Textarea
                id="achievements"
                placeholder="Notable achievements, awards, or accomplishments"
                value={userProfile.achievements}
                onChange={(e) => setUserProfile({...userProfile, achievements: e.target.value})}
                className="mt-2 bg-card border-border text-foreground"
              />
            </div>
          </div>

          {/* Company Information */}
          <div>
            <Label htmlFor="companyInfo" className="text-foreground font-medium mb-2 block">
              Company Information (Optional)
            </Label>
            <Textarea
              id="companyInfo"
              placeholder="Any specific information about the company, their values, recent news, etc."
              value={companyInfo}
              onChange={(e) => setCompanyInfo(e.target.value)}
              className="bg-card border-border text-foreground"
            />
          </div>

          <Button 
            onClick={handleGenerateCoverLetter}
            disabled={loading || !jobDescription.trim()}
            className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Cover Letter */}
      {coverLetter && (
        <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 p-8">
            <CardTitle className="text-2xl font-black text-foreground flex items-center">
              <FileText className="w-6 h-6 mr-3 text-accent" />
              Your AI-Generated Cover Letter
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Personalized cover letter ready for your internship application
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="flex gap-3 mb-6">
              <Button 
                onClick={handleDownloadPDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Download PDF
              </Button>
              <Button 
                onClick={handleDisplayPDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                  />
                </svg>
                View PDF
              </Button>
              <Button
                onClick={copyCoverLetter}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  {coverLetter.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border-l-4 border-green-500">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    Ready to Use!
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your cover letter has been generated. Review it, make any personal adjustments, 
                    and include it with your internship application.
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
