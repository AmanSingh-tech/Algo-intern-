"use client"; // This is required because we fetch data on the client side

// React and Next.js imports
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// API imports
import { getUserProfile } from '@/lib/api';

// Your existing UI component imports
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Edit, Github, Linkedin, Mail, MapPin, Calendar, Trophy, Code, Target, Star, Award } from "lucide-react";

// --- Data Fetching and State Management ---

// A utility function to get the token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// TypeScript interface for the user profile data
interface UserProfile {
  username: string;
  firstname: string;
  lastname: string | null;
  DOB: string;
  email: string;
  rating: number;
  createdAt: string;
  solved: number;
}

export default function ProfilePage() {
  // State for profile data and errors (removed loading state)
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        // Redirect to login page if no token
        router.push('/login');
        return;
      }

      try {
        const data = await getUserProfile(token);
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch profile.");
        }
        setProfile(data.user);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchProfile();
  }, [router]);

  // --- UI Rendering ---

  // Display an error message if something went wrong
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-main text-red-400">
        <div className="text-xl text-center p-6 border-2 border-red-500/50 rounded-3xl bg-card/90">
          <h2 className="font-bold text-2xl mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // If no profile data yet, show nothing (will redirect if no token)
  if (!profile) {
    return null;
  }

  // If data is fetched successfully, render the profile with dynamic data
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-8 bg-gradient-main min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info - Now with Dynamic Data */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg">
                          <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-black">
                            {/* DYNAMIC: Initials */}
                            {profile?.firstname?.charAt(0).toUpperCase()}
                            {profile?.lastname?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                          <Star className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                      {/* DYNAMIC: Full Name */}
                      <h2 className="text-3xl font-black text-foreground mb-2">{profile?.firstname} {profile?.lastname}</h2>
                      {/* DYNAMIC: Username */}
                      <p className="text-muted-foreground mb-4 font-medium">@{profile?.username}</p>
                      
                      {/* STATIC: This data is not in your backend yet */}
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6 px-6 py-2 text-sm font-bold rounded-2xl">
                        Expert • Rating: 2156
                      </Badge>
                      <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                        Full-stack developer passionate about algorithms and system design.
                      </p>
                      <Button className="w-full btn-primary text-primary-foreground font-semibold py-3 rounded-2xl shadow-lg">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* STATIC: Email and other contact info are not in your backend yet */}
                    <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-xl">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">john.doe@email.com</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-xl">
                      <div className="w-8 h-8 bg-accent/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground font-medium">San Francisco, CA</span>
                    </div>
                    {/* DYNAMIC: Joined Date (using DOB for now) */}
                    <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-xl">
                      <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">
                        Born on {new Date(profile?.DOB || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                          <Code className="w-6 h-6 text-primary" />
                        </div>
                        Problems Solved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* DYNAMIC: Solved count */}
                      <div className="text-4xl font-black text-primary">{profile?.solved || 0}</div>
                      <div className="text-sm text-muted-foreground mt-1">Total solved</div>
                    </CardContent>
                  </Card>

                  {/* STATIC: These stats are not in your backend yet */}
                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
                          <Trophy className="w-6 h-6 text-accent" />
                        </div>
                        Contests Won
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-accent">12</div>
                      <div className="text-sm text-muted-foreground mt-1">First place</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl feature-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground font-bold">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        Current Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-black text-primary">15</div>
                      <div className="text-sm text-muted-foreground mt-1">Days active</div>
                    </CardContent>
                  </Card>
                </div>
                {/* The rest of the page remains static for now, as the data is not available from your API */}
                {/* You can follow the same pattern to make them dynamic later */}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
