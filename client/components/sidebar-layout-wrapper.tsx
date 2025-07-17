"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

export function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
}
