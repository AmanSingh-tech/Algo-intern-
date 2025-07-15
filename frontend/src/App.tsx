import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { SidebarLayoutWrapper } from "./components/sidebar-layout-wrapper"
import HomePage from "./pages/HomePage"
import ContestsPage from "./pages/ContestsPage"
import PracticePage from "./pages/PracticePage"
import CodeEditorPage from "./pages/CodeEditorPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import InternshipTrackerPage from "./pages/InternshipTrackerPage"
import ProfilePage from "./pages/ProfilePage"
import LearnPage from "./pages/LearnPage"
import PeerRoomsPage from "./pages/PeerRoomsPage"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SidebarLayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/code-editor" element={<CodeEditorPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/internship-tracker" element={<InternshipTrackerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/peer-rooms" element={<PeerRoomsPage />} />
        </Routes>
      </SidebarLayoutWrapper>
    </ThemeProvider>
  )
}

export default App
