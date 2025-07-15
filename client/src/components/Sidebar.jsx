import { Link, useLocation } from "react-router-dom"
import { Home, Trophy, Code, Edit, BarChart3, Briefcase, User, BookOpen, Users, X } from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Trophy, label: "Contests", path: "/contests" },
    { icon: Code, label: "Practice", path: "/practice" },
    { icon: Edit, label: "Code Editor", path: "/code-editor" },
    { icon: BarChart3, label: "Leaderboard", path: "/leaderboard" },
    { icon: Briefcase, label: "Internship Tracker", path: "/internship-tracker" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: BookOpen, label: "Learn", path: "/learn" },
    { icon: Users, label: "Peer Rooms", path: "/peer-rooms" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeArena</h1>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
