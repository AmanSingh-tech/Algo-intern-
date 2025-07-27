"use client"

import { Search, Sun, Moon, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem("token")
    setLoggedIn(!!token)
  }, [])

  if (!mounted) return null

  const buttonClasses = {
    login: "text-xs sm:text-sm px-3 sm:px-4 h-7 sm:h-8 md:h-10 rounded-lg sm:rounded-xl", 
  }

  return (
    <header className="bg-card/60 backdrop-blur-xl border-b-2 border-border/30 p-2 sm:p-3 md:p-4 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6 flex-1 min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <SidebarTrigger className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-foreground hover:bg-primary/10 hover:text-primary rounded-lg sm:rounded-xl border-2 border-transparent hover:border-primary/20 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0">
              <PanelLeftOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </SidebarTrigger>
            <h1 className="text-base sm:text-lg md:text-xl font-black text-foreground hidden sm:block truncate">
              CodeArena
            </h1>
          </div>
          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
            <Input
              placeholder="Search..."
              className="pl-7 sm:pl-8 md:pl-10 h-7 sm:h-8 md:h-10 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary/50 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:text-primary hover:bg-primary/10 rounded-lg sm:rounded-xl h-7 sm:h-8 md:h-10 px-2 sm:px-3"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1 md:mr-2" />
                <span className="hidden md:inline text-xs sm:text-sm">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1 md:mr-2" />
                <span className="hidden md:inline text-xs sm:text-sm">Dark</span>
              </>
            )}
          </Button>

          {!loggedIn && (
            <Link href="/login" passHref>
              <Button asChild className={buttonClasses.login}>
                <span>
                  <span className="hidden sm:inline">Login</span>
                  <span className="sm:hidden">Login</span>
                </span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
