'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Users, Target, TrendingUp, Crown, Medal, Award } from 'lucide-react';
import { getLeaderboard, getLeaderboardStats } from '@/lib/api';

interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  rating: number;
  solved: number;
  contests: number;
  recentActivity: number;
  avatar: string;
  joinDate: string;
  rank: number;
}

interface LeaderboardStats {
  topRated: {
    name: string;
    username: string;
    rating: number;
    solved: number;
  };
  mostSolved: {
    name: string;
    username: string;
    rating: number;
    solved: number;
  };
  totalUsers: number;
  totalSolves: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leaderboardData, statsData] = await Promise.all([
          getLeaderboard(),
          getLeaderboardStats()
        ]);

        if (leaderboardData.success) {
          setUsers(leaderboardData.data);
        }

        if (statsData.success) {
          setStats(statsData.stats);
        }
      } catch (err) {
        setError('Failed to load leaderboard data');
        console.error('Leaderboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 2400) return 'text-red-500';
    if (rating >= 2100) return 'text-orange-500';
    if (rating >= 1900) return 'text-purple-500';
    if (rating >= 1600) return 'text-blue-500';
    if (rating >= 1400) return 'text-green-500';
    return 'text-gray-500';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 2400) return { label: 'Grandmaster', color: 'bg-red-500' };
    if (rating >= 2100) return { label: 'Master', color: 'bg-orange-500' };
    if (rating >= 1900) return { label: 'Expert', color: 'bg-purple-500' };
    if (rating >= 1600) return { label: 'Specialist', color: 'bg-blue-500' };
    if (rating >= 1400) return { label: 'Pupil', color: 'bg-green-500' };
    return { label: 'Newbie', color: 'bg-gray-500' };
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">Loading leaderboard data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Compete with fellow coders and climb the ranks!
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.topRated.rating}</div>
              <p className="text-xs text-muted-foreground">
                {stats.topRated.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Solved</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mostSolved.solved}</div>
              <p className="text-xs text-muted-foreground">
                {stats.mostSolved.name}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Active members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solves</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSolves}</div>
              <p className="text-xs text-muted-foreground">
                Problems solved
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => {
              const ratingBadge = getRatingBadge(user.rating);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`${ratingBadge.color} text-white text-xs`}
                        >
                          {ratingBadge.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className={`font-bold ${getRatingColor(user.rating)}`}>
                        {user.rating}
                      </div>
                      <div className="text-muted-foreground">Rating</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-green-600">{user.solved}</div>
                      <div className="text-muted-foreground">Solved</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{user.contests}</div>
                      <div className="text-muted-foreground">Contests</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{user.recentActivity}</div>
                      <div className="text-muted-foreground">Recent</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found in the leaderboard.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
