"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await loginUser(form.username, form.password)

      if (data.jwt_token) {
        localStorage.setItem("token", data.jwt_token)
        router.push("/") // Go to home or dashboard
      } else {
        setError(data.message || "Invalid username or password")
      }
    } catch (err) {
      setError("Could not connect to server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-main min-h-screen">
          <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-purple">
            <CardHeader className="text-center p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl font-black text-foreground mb-2">Welcome Back!</CardTitle>
              <CardDescription className="text-muted-foreground text-base sm:text-lg">
                Sign in to your CodeArena account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground font-semibold">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="your username"
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground font-semibold">
                      Password
                    </Label>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary text-primary-foreground font-semibold py-3 sm:py-4 rounded-2xl shadow-lg text-base sm:text-lg"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  )
}
