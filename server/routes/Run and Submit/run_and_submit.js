import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import getTestCases from '../Functions/get_testcases.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const route = Router();
const prisma = new PrismaClient();
const jwtpasskey = process.env.JWT_PASSKEY;

route.post('/run/:pid', async (req, res) => {
  const { code, language } = req.body;
  const { pid } = req.params;
    
  if (!pid || !code || !language) {
    return res.json({
      success: false,
      errorcode:1,
      msg: "Send All Parameters",
      err:"Send All Parameters"
    });
  }

  try {
    const problem = await getTestCases(pid)

    if (problem.success==false) {
      return res.json({
        success: false,
        errorcode:2,
        msg: "P_id does not exist or is in-valid",
        err:"P_id does not exist or is in-valid"
      });
    }

    const testCases = problem.testCases;

    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];

      try {
        const response = await axios.post(`${process.env.COMPILER_SERVICE_URL || 'http://localhost:3002'}/run`, {
          code,
          language,
          inputs: test.input,
          mode: "compiler",
        });

        if (!response.data.success) {
          return res.json({
            success: false,
            errorcode:3,
            msg: "Compilation Failed",
            err: response.data.error,
            failedTestCase: i,
            totalTestCases: testCases.length,
          });
        }

        if (response.data.verdict.trim() !== test.output.trim()) {
          return res.json({
            success: false,
            errorcode:4,
            msg: `Failed at Test Case ${i + 1}`,
            testcase:test.input,
            expected: test.output.trim() || "",
            received: response.data.verdict.trim() || "",
            failedTestCase: i + 1,
            totalTestCases: testCases.length,
          });
        }

      } catch (err) {
    
        return res.json({
          success: false,
          errorcode:5,
          msg: `Error while running test case ${i + 1}`,
          err: err.message,
        });
      }
    }

    // All test cases passed
    return res.json({
      success: true,
      msg: "All Test Cases Passed",
      totalTestCases: testCases.length,
    });

  } catch (error) {
    // console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      errorcode:6,
      msg: "Internal Server Error",
      err: error.message,
    });
  }
});


// Enhanced Submission Route - Tests code against all test cases
route.post('/submit/:pid', async (req, res) => {
  const { pid } = req.params;
  const { usertoken, code, language } = req.body;

  if (!pid || !usertoken || !code || !language) {
    return res.json({
      success: false,
      msg: "Send All Data",
      error: "Missing required parameters"
    });
  }

  try {
    // Verify JWT token
    const decode = jwt.verify(usertoken, jwtpasskey);
    
    if (!decode) {
      return res.json({
        success: false,
        msg: "User Id Invalid",
        error: "Invalid authentication token"
      });
    }

    const uid = decode.id;

    // Verify user exists
    const auth_user = await prisma.user.findFirst({
      where: { id: uid }
    });

    if (!auth_user) {
      return res.json({
        success: false,
        msg: "User Does not Exist",
        error: "User not found"
      });
    }

    // Get problem and test cases
    const problem = await getTestCases(pid);

    if (!problem.success) {
      return res.json({
        success: false,
        msg: "Problem ID is invalid",
        error: "Problem not found or has no test cases"
      });
    }

    const testCases = problem.testCases;
    let passedTests = 0;
    let totalTests = testCases.length;
    let testResults = [];
    let executionTime = 0;
    let memoryUsed = 0;

    // Run code against all test cases
    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      
      try {
        const startTime = Date.now();
        const response = await axios.post(`${process.env.COMPILER_SERVICE_URL || 'http://localhost:3002'}/run`, {
          code,
          language,
          inputs: test.input,
          mode: "compiler",
        });
        
        const endTime = Date.now();
        executionTime = Math.max(executionTime, endTime - startTime);

        const data = response.data;
        
        if (data.success) {
          const actualOutput = data.output?.trim() || "";
          const expectedOutput = test.output?.trim() || "";
          
          const testPassed = actualOutput === expectedOutput;
          
          if (testPassed) {
            passedTests++;
          }
          
          testResults.push({
            testCase: i + 1,
            passed: testPassed,
            expected: expectedOutput,
            actual: actualOutput,
            input: test.input,
            executionTime: endTime - startTime
          });
          
        } else {
          // Compilation or runtime error
          testResults.push({
            testCase: i + 1,
            passed: false,
            error: data.error || "Runtime error",
            input: test.input,
            executionTime: endTime - startTime
          });
        }
        
      } catch (compilerError) {
        testResults.push({
          testCase: i + 1,
          passed: false,
          error: `Compiler service error: ${compilerError.message}`,
          input: test.input,
          executionTime: 0
        });
      }
    }

    // Determine if submission is successful
    const isSuccessful = passedTests === totalTests;
    const accuracy = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

    // Save submission to database
    const submission = await prisma.solve.create({
      data: {
        success: isSuccessful,
        code: code,
        language: language,
        problemId: pid,
        userId: uid,
        testsPassed: passedTests,
        totalTests: totalTests,
        executionTime: executionTime,
        submittedAt: new Date()
      }
    });

    if (!submission) {
      return res.json({
        success: false,
        msg: "Error saving submission",
        error: "Database error"
      });
    }

    // Return detailed results
    return res.json({
      success: true,
      accepted: isSuccessful,
      msg: isSuccessful ? "Submission Successful - All tests passed!" : "Submission Failed - Some tests failed",
      results: {
        passedTests,
        totalTests,
        accuracy: Math.round(accuracy * 100) / 100,
        executionTime,
        testResults: testResults.slice(0, 5), // Show only first 5 test results
        status: isSuccessful ? "Accepted" : "Wrong Answer"
      }
    });

  } catch (error) {
    console.error('Submission error:', error);
    return res.json({
      success: false,
      msg: "Submission error",
      error: error.message
    });
  }
});

// Simple run endpoint for code editor (no problem ID required)
route.post('/run', async (req, res) => {
  const { code, language, inputs = "" } = req.body;
    
  if (!code || !language) {
    return res.json({
      success: false,
      error: "Code and language are required"
    });
  }

  try {
    const response = await axios.post(`${process.env.COMPILER_SERVICE_URL || 'http://localhost:3002'}/run`, {
      code,
      language,
      inputs,
      mode: "compiler",
    });

    const data = response.data;

    if (data.success) {
      return res.json({
        success: true,
        output: data.verdict || "Code executed successfully!",
        verdict: data.verdict || "Execution completed",
        err: data.err || "",
        error: data.err || ""
      });
    } else {
      return res.json({
        success: false,
        error: data.error || "Execution failed",
        err: data.error || "Execution failed",
        output: ""
      });
    }

  } catch (error) {
    return res.json({
      success: false,
      error: `Compiler service error: ${error.message}`,
      err: `Compiler service error: ${error.message}`,
      output: ""
    });
  }
});

export default route;
