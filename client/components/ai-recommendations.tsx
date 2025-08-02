"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Brain, Target, TrendingUp, Users, Download, Eye } from "lucide-react"
import { getInternshipRecommendations } from "@/lib/ai-api"
import { generateAnalysisPDF } from "@/lib/pdf-utils"

interface UserProfile {
  skills: string[]
  experienceLevel: string
  education: string
  locationPreference: string
  industryInterest: string
}

interface Preferences {
  roleTypes: string[]
  companySize: string
  remoteWork: string
  salaryExpectations: string
}

export default function AIRecommendations() {
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    experienceLevel: "",
    education: "",
    locationPreference: "",
    industryInterest: ""
  })
  const [preferences, setPreferences] = useState<Preferences>({
    roleTypes: [],
    companySize: "",
    remoteWork: "",
    salaryExpectations: ""
  })

  const handleGetRecommendations = async () => {
    setLoading(true)
    try {
      // For demo purposes, we'll use a dummy token
      const token = "demo-token"
      
      const response = await getInternshipRecommendations({
        userProfile,
        preferences,
        token
      })

      if (response.success) {
        setRecommendations(response.recommendations)
      } else {
        console.error('Failed to get recommendations:', response.msg)
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (recommendations) {
      const userInfo = {
        name: 'Internship Recommendations',
        targetRole: userProfile.industryInterest || 'Technology Internships',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        recommendations, 
        'AI Internship Recommendations Report', 
        userInfo
      )
      
      const filename = `internship_recommendations_${Date.now()}.pdf`
      doc.save(filename)
    }
  }

  const handleDisplayPDF = () => {
    if (recommendations) {
      const userInfo = {
        name: 'Internship Recommendations',
        targetRole: userProfile.industryInterest || 'Technology Internships',
        date: new Date().toLocaleDateString()
      }
      
      const doc = generateAnalysisPDF(
        recommendations, 
        'AI Internship Recommendations Report', 
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
            <Brain className="w-6 h-6 mr-3 text-primary" />
            AI-Powered Internship Recommendations
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Get personalized internship recommendations based on your profile and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* User Profile Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Your Profile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skills" className="text-foreground font-medium">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="React, Node.js, Python, etc."
                  value={userProfile.skills.join(", ")}
                  onChange={(e) => setUserProfile({
                    ...userProfile,
                    skills: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                  })}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="experience" className="text-foreground font-medium">Experience Level</Label>
                <Select value={userProfile.experienceLevel} onValueChange={(value) => setUserProfile({...userProfile, experienceLevel: value})}>
                  <SelectTrigger className="mt-2 bg-card border-border text-foreground">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="education" className="text-foreground font-medium">Education</Label>
                <Input
                  id="education"
                  placeholder="Computer Science, Engineering, etc."
                  value={userProfile.education}
                  onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="text-foreground font-medium">Location Preference</Label>
                <Input
                  id="location"
                  placeholder="San Francisco, Remote, etc."
                  value={userProfile.locationPreference}
                  onChange={(e) => setUserProfile({...userProfile, locationPreference: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="industry" className="text-foreground font-medium">Industry Interest</Label>
                <Input
                  id="industry"
                  placeholder="Tech, Finance, Healthcare, etc."
                  value={userProfile.industryInterest}
                  onChange={(e) => setUserProfile({...userProfile, industryInterest: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Users className="w-5 h-5 mr-2 text-accent" />
              Your Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roleTypes" className="text-foreground font-medium">Preferred Role Types</Label>
                <Input
                  id="roleTypes"
                  placeholder="Software Engineering, Data Science, etc."
                  value={preferences.roleTypes.join(", ")}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    roleTypes: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                  })}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="companySize" className="text-foreground font-medium">Company Size Preference</Label>
                <Select value={preferences.companySize} onValueChange={(value) => setPreferences({...preferences, companySize: value})}>
                  <SelectTrigger className="mt-2 bg-card border-border text-foreground">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-50)</SelectItem>
                    <SelectItem value="medium">Medium (51-500)</SelectItem>
                    <SelectItem value="large">Large (500+)</SelectItem>
                    <SelectItem value="any">Any Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="remote" className="text-foreground font-medium">Remote Work Preference</Label>
                <Select value={preferences.remoteWork} onValueChange={(value) => setPreferences({...preferences, remoteWork: value})}>
                  <SelectTrigger className="mt-2 bg-card border-border text-foreground">
                    <SelectValue placeholder="Select remote preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Fully Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="salary" className="text-foreground font-medium">Salary Expectations</Label>
                <Input
                  id="salary"
                  placeholder="$5,000-8,000/month"
                  value={preferences.salaryExpectations}
                  onChange={(e) => setPreferences({...preferences, salaryExpectations: e.target.value})}
                  className="mt-2 bg-card border-border text-foreground"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleGetRecommendations}
            disabled={loading}
            className="btn-primary text-primary-foreground font-semibold px-8 py-3 rounded-2xl shadow-lg w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Results */}
      {recommendations && (
        <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 p-8">
            <CardTitle className="text-2xl font-black text-foreground flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-accent" />
              Your Personalized Recommendations
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              AI-generated insights based on your profile and preferences
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
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {recommendations}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
