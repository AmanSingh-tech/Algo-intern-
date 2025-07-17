import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { CodePreview } from "@/components/code-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto w-full">
          <div className="w-full">
            <HeroSection />
            <FeatureCards />
            <div className="mt-12 sm:mt-16">
              <CodePreview />
            </div>
            <Footer />
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
