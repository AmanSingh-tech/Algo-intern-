const Home = () => {
  return (
    <div className="w-full h-full bg-[#0a0f1c] text-white px-6 md:px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button className="bg-[#1e293b] px-4 py-2 rounded text-sm hover:bg-[#334155]">
          Practice Questions
        </button>
        <button className="bg-[#1e293b] px-4 py-2 rounded text-sm hover:bg-[#334155]">
          My Submissions
        </button>
        <button className="bg-[#1e293b] px-4 py-2 rounded text-sm hover:bg-[#334155]">
          Coming Soon
        </button>
      </div>

      {/* Question List */}
      <div className="grid gap-4">
        {[
          {
            title: "A. Permutation Warm-Up",
            desc: "For a permutation p of length n *, we define the function f(p) = Σ |p_i - i|...",
          },
          {
            title: "Trippi Troppi",
            desc: "Trippi Troppi resides in a strange world. The ancient name of each country consists...",
          },
          {
            title: "Cherry Bomb",
            desc: "Two integer arrays a and b of size n are complementary if there exists an integer x such that a[i] + b[i] = x...",
          },
          {
            title: "SUum of 2 numbers",
            desc: "Add 2",
          },
          {
            title: "difference",
            desc: "Subtract numbers",
          },
        ].map((q, i) => (
          <div key={i} className="bg-[#1e293b] p-4 rounded shadow hover:bg-[#334155] transition">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{q.title}</h2>
              <span className="bg-gray-600 text-white px-3 py-1 text-xs rounded-full">Not Attempted</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">{q.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
