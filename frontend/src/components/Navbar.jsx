import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="h-16 bg-[#0F172A] text-white flex items-center justify-between px-6 fixed top-0 left-60 right-0 z-50 w-[calc(100%-15rem)]">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search problems, contests..."
        className="bg-[#1e293b] text-sm px-4 py-2 rounded outline-none w-[300px] placeholder:text-gray-400"
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-[#1e293b] px-3 py-1 rounded text-sm whitespace-nowrap">
          🌗 Light Mode
        </button>
        <Link to="/login" className="text-white hover:text-blue-400 transition  ">
  <button className="bg-[#3b82f6] px-4 py-1 rounded text-sm whitespace-nowrap">
    Login
  </button>
</Link>
      </div>
    </header>
  );
};

export default Navbar;
