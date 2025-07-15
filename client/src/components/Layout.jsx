import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
