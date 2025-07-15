import { Header } from "../components/header"
import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset } from "../components/ui/sidebar"

export default function CodeEditorPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-gradient-main min-h-screen">
          <div className="w-full">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Code Editor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Write, test, and debug your code with our powerful online editor
            </p>
            <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-8 shadow-lg">
              <p className="text-muted-foreground">Code editor interface coming soon...</p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
