import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";

// Page imports
import Contests from "./pages/Contests";
import Practice from "./pages/Practice";
import CodeEditor from "./pages/CodeEditor";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";

function App() {
  return (
    <div className="flex h-screen bg-[#0a0f1c] text-white">
      {/* Sidebar - Fixed on the left */}
      <div className="fixed top-0 left-0 h-screen w-60 z-50">
        <Sidebar />
      </div>

      {/* Main Content Area (to the right of sidebar) */}
      <div className="ml-60 flex flex-col w-full">
        {/* Navbar - fixed at top of main area */}
        <div className="fixed top-0 left-60 right-0 h-16 z-40">
          <Navbar />
        </div>

        {/* Actual Page Content below the navbar */}
        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 sm:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/login" element={<LoginForm />} /> {/* ✅ Login route */}
            <Route path="/practice" element={<Practice />} />
            <Route path="/code-editor" element={<CodeEditor />} />
            {/* Add additional routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
