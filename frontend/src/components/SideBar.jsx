import { FaTrophy, FaCode, FaUser, FaSearch, FaBook, FaUsers, FaChartBar, FaTerminal } from 'react-icons/fa';
import {Link,NavLink, useNavigate} from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-60 h-screen bg-[#0B1120] text-white p-5 fixed">
      <h1 className="text-xs mb-8">Code</h1>
      <nav className="space-y-4">
        <NavItem icon={<FaTrophy />} label="Contests" to="/contests" navigate={navigate} />
        <NavItem icon={<FaCode />} label="Practice" to="/practice" navigate={navigate} />
        <NavItem icon={<FaTerminal />} label="Code Editor" to="/code-editor" navigate={navigate} />
        <NavItem icon={<FaChartBar />} label="Leaderboard" to="/leaderboard" navigate={navigate} />
        <NavItem icon={<FaSearch />} label="Internship Tracker" to="/internships" navigate={navigate} />
        <NavItem icon={<FaUser />} label="Profile" to="/profile" navigate={navigate} />
        <NavItem icon={<FaBook />} label="Learn" to="/learn" navigate={navigate} />
        <NavItem icon={<FaUsers />} label="Peer Rooms" to="/peers" navigate={navigate} />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, to, navigate }) => (
  <div
    className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer px-2 py-2 rounded hover:bg-[#1a233a]"
    onClick={() => navigate(to)}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
