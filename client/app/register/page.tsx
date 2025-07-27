"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [dob, setDob] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // ❗ prevents full page reload
  setLoading(true);

  const userData = {
    username,
    password,
    firstname,
    lastname,
    dob, // ✅ lowercase 'dob' to match your working curl
  };

  try {
    const response = await fetch("http://localhost:8000/new/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
  alert(data.message || "Registration successful ✅");
} else {
  alert(data.message || "Registration failed ❌");
}
router.push("/login"); // Redirect to login page after successful registration
  } catch (err) {
    console.error("Error registering:", err);
    alert("Error occurred");
  } finally {
    setLoading(false);
  }
};


    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-main min-h-screen">
                    <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-2 border-border shadow-lg rounded-3xl dark:glow-blue">
                        <CardHeader className="text-center p-6 sm:p-8">
                            <CardTitle className="text-3xl sm:text-4xl font-black text-foreground mb-2">Join CodeArena</CardTitle>
                            <CardDescription className="text-muted-foreground text-base sm:text-lg">
                                Create your account to start your coding journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 pt-0">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-foreground font-semibold">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="johndoe_dev"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-foreground font-semibold">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="firstname" className="text-foreground font-semibold">First Name</Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                        className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastname" className="text-foreground font-semibold">Last Name (optional)</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob" className="text-foreground font-semibold">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                        className="h-12 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-xl text-base"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary text-primary-foreground font-semibold py-3 sm:py-4 rounded-2xl shadow-lg text-base sm:text-lg"
                                >
                                    {loading ? "Registering..." : "Register"}
                                </Button>
                            </form>
                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="font-medium text-primary hover:underline">
                                    Login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </SidebarInset>
        </>
    )
}
