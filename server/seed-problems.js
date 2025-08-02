import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample problems data to seed the database
const problemsData = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    constraints: "2 ≤ nums.length ≤ 10⁴, -10⁹ ≤ nums[i] ≤ 10⁹, -10⁹ ≤ target ≤ 10⁹, Only one valid answer exists.",
    inputtype: "Array and Target Integer",
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]"
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]"
      },
      {
        input: "[3,3]\n6",
        output: "[0,1]"
      }
    ]
  },
  {
    title: "Add Two Numbers",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    difficulty: "Medium",
    constraints: "The number of nodes in each linked list is in the range [1, 100], 0 ≤ Node.val ≤ 9, It is guaranteed that the list represents a number that does not have leading zeros.",
    inputtype: "Two Linked Lists",
    testCases: [
      {
        input: "[2,4,3]\n[5,6,4]",
        output: "[7,0,8]"
      },
      {
        input: "[0]\n[0]",
        output: "[0]"
      },
      {
        input: "[9,9,9,9,9,9,9]\n[9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]"
      }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    constraints: "0 ≤ s.length ≤ 5 * 10⁴, s consists of English letters, digits, symbols and spaces.",
    inputtype: "String",
    testCases: [
      {
        input: "abcabcbb",
        output: "3"
      },
      {
        input: "bbbbb",
        output: "1"
      },
      {
        input: "pwwkew",
        output: "3"
      }
    ]
  },
  {
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    difficulty: "Hard",
    constraints: "nums1.length == m, nums2.length == n, 0 ≤ m ≤ 1000, 0 ≤ n ≤ 1000, 1 ≤ m + n ≤ 2000, -10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
    inputtype: "Two Sorted Arrays",
    testCases: [
      {
        input: "[1,3]\n[2]",
        output: "2.00000"
      },
      {
        input: "[1,2]\n[3,4]",
        output: "2.50000"
      }
    ]
  },
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    constraints: "1 ≤ s.length ≤ 10⁴, s consists of parentheses only '()[]{}'.",
    inputtype: "String",
    testCases: [
      {
        input: "()",
        output: "true"
      },
      {
        input: "()[]{}",
        output: "true"
      },
      {
        input: "(]",
        output: "false"
      },
      {
        input: "([)]",
        output: "false"
      },
      {
        input: "{[]}",
        output: "true"
      }
    ]
  },
  {
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    difficulty: "Medium",
    constraints: "1 ≤ nums.length ≤ 10⁵, -10⁴ ≤ nums[i] ≤ 10⁴",
    inputtype: "Integer Array",
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6"
      },
      {
        input: "[1]",
        output: "1"
      },
      {
        input: "[5,4,-1,7,8]",
        output: "23"
      }
    ]
  },
  {
    title: "Climbing Stairs",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: "Easy",
    constraints: "1 ≤ n ≤ 45",
    inputtype: "Integer",
    testCases: [
      {
        input: "2",
        output: "2"
      },
      {
        input: "3",
        output: "3"
      },
      {
        input: "4",
        output: "5"
      }
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    difficulty: "Easy",
    constraints: "The number of nodes in the tree is in the range [0, 100], -100 ≤ Node.val ≤ 100",
    inputtype: "Binary Tree Root",
    testCases: [
      {
        input: "[1,null,2,3]",
        output: "[1,3,2]"
      },
      {
        input: "[]",
        output: "[]"
      },
      {
        input: "[1]",
        output: "[1]"
      }
    ]
  }
];

async function seedProblems() {
  try {
    console.log('🌱 Starting to seed problems...');

    // Clear existing problems and test cases
    await prisma.testCase.deleteMany();
    await prisma.solve.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.problemToTags.deleteMany();
    await prisma.problem.deleteMany();
    
    console.log('✅ Cleared existing data');

    for (const problemData of problemsData) {
      const { testCases, ...problemInfo } = problemData;
      
      // Create problem
      const problem = await prisma.problem.create({
        data: problemInfo
      });
      
      console.log(`✅ Created problem: ${problem.title}`);
      
      // Create test cases for this problem
      if (testCases && testCases.length > 0) {
        await prisma.testCase.createMany({
          data: testCases.map(tc => ({
            input: tc.input,
            output: tc.output,
            problemId: problem.id
          }))
        });
        
        console.log(`✅ Created ${testCases.length} test cases for ${problem.title}`);
      }
    }

    console.log('🎉 Successfully seeded all problems and test cases!');
    
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedProblems();
