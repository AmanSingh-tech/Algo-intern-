'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Code, 
  TrendingUp, 
  Target,
  Calendar,
  Trophy,
  BarChart3
} from 'lucide-react';
import { getUserSubmissions } from '@/lib/api';

interface Submission {
  id: string;
  success: boolean;
  code: string;
  language: string;
  date: string;
  submittedAt: string;
  testsPassed: number;
  totalTests: number;
  executionTime: number;
  problem: {
    id: string;
    title: string;
    difficulty: string;
  };
}

interface SubmissionStats {
  totalSubmissions: number;
  successfulSubmissions: number;
  successRate: string;
  uniqueProblemsSolved: number;
  totalProblems: number;
  averageExecutionTime: number;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const usertoken = localStorage.getItem('token'); // Fixed: use 'token' instead of 'usertoken'
      
      if (!usertoken) {
        setError('Please log in to view your submissions');
        return;
      }

      console.log('Fetching submissions for user...'); // Debug log
      const response = await getUserSubmissions(usertoken);
      console.log('Submissions response:', response); // Debug log
      
      if (response.success) {
        setSubmissions(response.data.submissions);
        setStats(response.data.statistics);
        setError(null);
      } else {
        setError(response.error || 'Failed to load submissions');
        console.error('API Error:', response.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load submissions';
      setError(errorMessage);
      console.error('Submissions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Submissions</h1>
          <p className="text-muted-foreground">Loading your submission history...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Submissions</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadSubmissions} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
        <p className="text-muted-foreground">
          Track your progress and analyze your coding journey
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Across {stats.totalProblems} problems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.successfulSubmissions} successful
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueProblemsSolved}</div>
              <p className="text-xs text-muted-foreground">
                Unique problems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Runtime</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageExecutionTime}ms</div>
              <p className="text-xs text-muted-foreground">
                Execution time
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {submission.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{submission.problem.title}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`${getDifficultyColor(submission.problem.difficulty)} text-white text-xs`}
                      >
                        {submission.problem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {submission.language}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(submission.submittedAt || submission.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold">
                      {submission.testsPassed}/{submission.totalTests}
                    </div>
                    <div className="text-muted-foreground">Tests</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-bold">{submission.executionTime}ms</div>
                    <div className="text-muted-foreground">Runtime</div>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      variant={submission.success ? "default" : "destructive"}
                      className="font-bold"
                    >
                      {submission.success ? "Accepted" : "Failed"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {submissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No submissions found. Start solving problems to see your progress here!</p>
              <Button className="mt-4" onClick={() => window.location.href = '/practice'}>
                Browse Problems
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
