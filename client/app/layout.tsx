import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarLayoutWrapper } from "@/components/sidebar-layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeArena - Your Journey. Your Success.",
  description: "Comprehensive platform for developer growth and opportunities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarLayoutWrapper>{children}</SidebarLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
