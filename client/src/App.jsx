import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
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
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  )
}

export default App
