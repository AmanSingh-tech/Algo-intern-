import type React from "react"
import { SidebarProvider } from "./ui/sidebar"

export function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
}
