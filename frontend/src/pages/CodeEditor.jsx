import { useState } from "react";

const questions = [
  {
    id: 1,
    title: "A. Permutation Warm-Up",
    description:
      "For a permutation p of length n, we define the function f(p) = ∑ |p_i - i|. You are given a number n...",
    status: "Not Attempted",
  },
  {
    id: 2,
    title: "Trippi Troppi",
    description:
      "Trippi Troppi resides in a strange world. The ancient name of each country consists of three strings...",
    status: "Not Attempted",
  },
  {
    id: 3,
    title: "Cherry Bomb",
    description:
      "Two integer arrays a and b of size n are complementary if there exists an integer x such that a[i] + b[i] = x...",
    status: "Not Attempted",
  },
  {
    id: 4,
    title: "SUum of 2 numbers",
    description: "Add 2",
    status: "Not Attempted",
  },
  {
    id: 5,
    title: "difference",
    description: "Subtract numbers",
    status: "Not Attempted",
  },
];

const Practice = () => {
  const [activeTab, setActiveTab] = useState("practice");

  return (
    <div className="flex flex-col w-full h-full px-8 py-6 bg-[#0a0f1c] text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "practice"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setActiveTab("practice")}
        >
          Practice Questions
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "submissions"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setActiveTab("submissions")}
        >
          My Submissions
        </button>
        <button className="px-4 py-2 rounded bg-gray-700 text-gray-300 cursor-not-allowed">
          Coming Soon
        </button>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-8">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-[#1e293b] p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-semibold">{q.title}</h2>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                {q.description}
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-gray-600 text-white rounded-full">
              {q.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
