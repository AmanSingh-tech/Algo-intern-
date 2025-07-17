"use client"

import { Trophy, Code, Edit, BarChart3, Briefcase, User, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Contests", icon: Trophy, href: "/contests" },
  { name: "Practice", icon: Code, href: "/practice" },
  { name: "Code Editor", icon: Edit, href: "/code-editor" },
  { name: "Leaderboard", icon: BarChart3, href: "/leaderboard" },
  { name: "Internship Tracker", icon: Briefcase, href: "/internship-tracker" },
  { name: "Profile", icon: User, href: "/profile" },
  { name: "Learn", icon: BookOpen, href: "/learn" },
  { name: "Peer Rooms", icon: Users, href: "/peer-rooms" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border p-4">
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg p-3 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
