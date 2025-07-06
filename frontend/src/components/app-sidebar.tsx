import {
  Trophy,
  Code,
  Edit,
  BarChart3,
  Briefcase,
  User,
  BookOpen,
  Users,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar"

const navigation = [
  { name: "Contests", icon: Trophy, href: "/contests", color: "text-primary" },
  { name: "Practice", icon: Code, href: "/practice", color: "text-accent" },
  { name: "Code Editor", icon: Edit, href: "/code-editor", color: "text-primary" },
  { name: "Leaderboard", icon: BarChart3, href: "/leaderboard", color: "text-accent" },
  { name: "Internship Tracker", icon: Briefcase, href: "/internship-tracker", color: "text-primary" },
  { name: "Profile", icon: User, href: "/profile", color: "text-accent" },
  { name: "Learn", icon: BookOpen, href: "/learn", color: "text-primary" },
  { name: "Peer Rooms", icon: Users, href: "/peer-rooms", color: "text-accent" },
]

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-2 border-border/30 bg-sidebar/60 backdrop-blur-xl w-64 md:w-56 lg:w-64 xl:w-72 group-data-[collapsible=icon]:w-16 transition-all duration-300"
      variant="sidebar"
    >
      <SidebarHeader className="p-2 sm:p-3 md:p-4 group-data-[collapsible=icon]:p-2 bg-sidebar/10 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 px-1 sm:px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl md:rounded-2xl group-data-[collapsible=icon]:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4 bg-sidebar rounded-sm sm:rounded-md md:rounded-lg group-data-[collapsible=icon]:rounded-md opacity-90"></div>
          </div>
          <span className="font-black text-sidebar-foreground text-sm sm:text-base md:text-lg lg:text-xl group-data-[collapsible=icon]:hidden truncate">
            CodeArena
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1 sm:px-2 bg-sidebar/5 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only text-sidebar-foreground/70 font-bold px-2 sm:px-3 md:px-4 mb-2 group-data-[collapsible=icon]:px-0 text-xs sm:text-sm">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.name}
                      className="hover:bg-sidebar-accent data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/20 data-[active=true]:to-accent/20 data-[active=true]:text-primary rounded-lg sm:rounded-xl md:rounded-2xl mx-0.5 sm:mx-1 group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:rounded-xl font-semibold transition-all duration-200 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:p-0 h-9 sm:h-10 md:h-12 group-data-[collapsible=icon]:h-10"
                    >
                      <NavLink
                        to={item.href}
                        className="flex items-center w-full group-data-[collapsible=icon]:justify-center"
                      >
                        <item.icon
                          className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 ${item.color} group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5 flex-shrink-0`}
                        />
                        <span className="font-semibold text-xs sm:text-sm md:text-base group-data-[collapsible=icon]:sr-only ml-2 sm:ml-3 truncate">
                          {item.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
