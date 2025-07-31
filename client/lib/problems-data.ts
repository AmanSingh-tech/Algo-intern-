// Pre-filled problems database
export interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  acceptance: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  hints?: string[]
  tags: string[]
  timeLimit: string
  memoryLimit: string
  solved: boolean
}

export const PROBLEMS_DATABASE: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: "49.1%",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    tags: ["Array", "Hash Table"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    acceptance: "76.7%",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s[i] is a printable ascii character."
    ],
    hints: [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!"
    ],
    tags: ["Two Pointers", "String"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "54.5%",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴"
    ],
    hints: [
      "Try to optimize it to O(n) time complexity."
    ],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.8%",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack of characters.",
      "When you encounter an opening bracket, push it to the top of the stack.",
      "When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false."
    ],
    tags: ["String", "Stack"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "62.1%",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    tags: ["Linked List", "Recursion"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "binary-tree-inorder",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    category: "Tree",
    acceptance: "74.2%",
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]"
      },
      {
        input: "root = []",
        output: "[]"
      },
      {
        input: "root = [1]",
        output: "[1]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 ≤ Node.val ≤ 100"
    ],
    hints: [
      "Try both recursive and iterative approaches."
    ],
    tags: ["Stack", "Tree", "Depth-First Search", "Binary Tree"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    acceptance: "52.0%",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 ≤ n ≤ 45"
    ],
    hints: [
      "To reach nth step, what could have been your previous steps? (Think about the step sizes)"
    ],
    tags: ["Math", "Dynamic Programming", "Memoization"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "58.7%",
    description: `Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.`,
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: "3",
        explanation: 'The longest common subsequence is "ace" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: "3",
        explanation: 'The longest common subsequence is "abc" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: "0",
        explanation: "There is no such common subsequence, so the result is 0."
      }
    ],
    constraints: [
      "1 ≤ text1.length, text2.length ≤ 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    hints: [
      "Try to solve this problem using dynamic programming.",
      "Create a 2D array to store the LCS length for each substring."
    ],
    tags: ["String", "Dynamic Programming"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Graph",
    acceptance: "40.1%",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true"
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true"
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false"
      }
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 ≤ m, n ≤ 6",
      "1 ≤ word.length ≤ 15",
      "board and word consists of only lowercase and uppercase English letters."
    ],
    hints: [
      "Use backtracking to explore all possible paths.",
      "Mark visited cells and unmark them when backtracking."
    ],
    tags: ["Array", "Backtracking", "Matrix"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  },
  {
    id: "minimum-path-sum",
    title: "Minimum Path Sum",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "62.4%",
    description: `Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.`,
    examples: [
      {
        input: "grid = [[1,3,1],[1,5,1],[4,2,1]]",
        output: "7",
        explanation: "Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum."
      },
      {
        input: "grid = [[1,2,3],[4,5,6]]",
        output: "12"
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 200",
      "0 ≤ grid[i][j] ≤ 200"
    ],
    hints: [
      "Think about using dynamic programming.",
      "At each cell, the minimum path sum is the minimum of the path sums from the cell above and the cell to the left, plus the current cell's value."
    ],
    tags: ["Array", "Dynamic Programming", "Matrix"],
    timeLimit: "1 second",
    memoryLimit: "256 MB",
    solved: false
  }
]

export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS_DATABASE.find(problem => problem.id === id)
}

export function getAllProblems(): Problem[] {
  return PROBLEMS_DATABASE
}

export function getProblemsByCategory(category: string): Problem[] {
  return PROBLEMS_DATABASE.filter(problem => problem.category === category)
}

export function getProblemsByDifficulty(difficulty: "Easy" | "Medium" | "Hard"): Problem[] {
  return PROBLEMS_DATABASE.filter(problem => problem.difficulty === difficulty)
}
