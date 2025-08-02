import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function addProblemsWithTestCases() {
  try {
    console.log('Adding problems with test cases...');

    // Problem 1: Two Sum (Easy)
    const twoSumProblem = await prisma.problem.create({
      data: {
        title: "Two Sum",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: "Easy",
        constraints: `2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.`,
        inputtype: `Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`
      }
    });

    // Add test cases for Two Sum
    await prisma.testCase.createMany({
      data: [
        {
          input: "4\n2 7 11 15\n9",
          output: "0 1",
          problemId: twoSumProblem.id
        },
        {
          input: "3\n3 2 4\n6",
          output: "1 2",
          problemId: twoSumProblem.id
        },
        {
          input: "2\n3 3\n6",
          output: "0 1",
          problemId: twoSumProblem.id
        }
      ]
    });

    // Problem 2: Palindrome Number (Easy)
    const palindromeProblem = await prisma.problem.create({
      data: {
        title: "Palindrome Number",
        description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.`,
        difficulty: "Easy",
        constraints: `-231 <= x <= 231 - 1`,
        inputtype: `Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.`
      }
    });

    // Add test cases for Palindrome Number
    await prisma.testCase.createMany({
      data: [
        {
          input: "121",
          output: "true",
          problemId: palindromeProblem.id
        },
        {
          input: "-121",
          output: "false",
          problemId: palindromeProblem.id
        },
        {
          input: "10",
          output: "false",
          problemId: palindromeProblem.id
        },
        {
          input: "12321",
          output: "true",
          problemId: palindromeProblem.id
        }
      ]
    });

    // Problem 3: Reverse Integer (Medium)
    const reverseIntegerProblem = await prisma.problem.create({
      data: {
        title: "Reverse Integer",
        description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
        difficulty: "Medium",
        constraints: `-231 <= x <= 231 - 1`,
        inputtype: `Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21`
      }
    });

    // Add test cases for Reverse Integer
    await prisma.testCase.createMany({
      data: [
        {
          input: "123",
          output: "321",
          problemId: reverseIntegerProblem.id
        },
        {
          input: "-123",
          output: "-321",
          problemId: reverseIntegerProblem.id
        },
        {
          input: "120",
          output: "21",
          problemId: reverseIntegerProblem.id
        },
        {
          input: "0",
          output: "0",
          problemId: reverseIntegerProblem.id
        }
      ]
    });

    // Problem 4: Valid Parentheses (Easy)
    const validParenthesesProblem = await prisma.problem.create({
      data: {
        title: "Valid Parentheses",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: "Easy",
        constraints: `1 <= s.length <= 104
s consists of parentheses only '()[]{}'.`,
        inputtype: `Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`
      }
    });

    // Add test cases for Valid Parentheses
    await prisma.testCase.createMany({
      data: [
        {
          input: "()",
          output: "true",
          problemId: validParenthesesProblem.id
        },
        {
          input: "()[]{}", 
          output: "true",
          problemId: validParenthesesProblem.id
        },
        {
          input: "(]",
          output: "false",
          problemId: validParenthesesProblem.id
        },
        {
          input: "([)]",
          output: "false",
          problemId: validParenthesesProblem.id
        },
        {
          input: "{[]}",
          output: "true",
          problemId: validParenthesesProblem.id
        }
      ]
    });

    // Problem 5: Maximum Subarray (Medium)
    const maxSubarrayProblem = await prisma.problem.create({
      data: {
        title: "Maximum Subarray",
        description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
        difficulty: "Medium",
        constraints: `1 <= nums.length <= 105
-104 <= nums[i] <= 104`,
        inputtype: `Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.`
      }
    });

    // Add test cases for Maximum Subarray
    await prisma.testCase.createMany({
      data: [
        {
          input: "9\n-2 1 -3 4 -1 2 1 -5 4",
          output: "6",
          problemId: maxSubarrayProblem.id
        },
        {
          input: "1\n1",
          output: "1",
          problemId: maxSubarrayProblem.id
        },
        {
          input: "5\n5 4 -1 7 8",
          output: "23",
          problemId: maxSubarrayProblem.id
        },
        {
          input: "4\n-1 -2 -3 -4",
          output: "-1",
          problemId: maxSubarrayProblem.id
        }
      ]
    });

    console.log('✅ Successfully added 5 problems with test cases:');
    console.log(`1. Two Sum (${twoSumProblem.id}) - Easy`);
    console.log(`2. Palindrome Number (${palindromeProblem.id}) - Easy`);
    console.log(`3. Reverse Integer (${reverseIntegerProblem.id}) - Medium`);
    console.log(`4. Valid Parentheses (${validParenthesesProblem.id}) - Easy`);
    console.log(`5. Maximum Subarray (${maxSubarrayProblem.id}) - Medium`);

  } catch (error) {
    console.error('Error adding problems:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProblemsWithTestCases();
