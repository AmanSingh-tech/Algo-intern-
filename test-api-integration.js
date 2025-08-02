// Test script to verify API integration
const BASE_URL = "http://localhost:8000";

async function testGetProblems() {
  try {
    console.log("Testing /new/problems/problems endpoint...");
    const response = await fetch(`${BASE_URL}/new/problems/problems`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Found ${data.problems.length} problems`);
      console.log("First problem:", {
        id: data.problems[0].id,
        title: data.problems[0].title,
        difficulty: data.problems[0].difficulty
      });
    } else {
      console.log("❌ Failed to fetch problems:", data.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function testGetSingleProblem() {
  try {
    console.log("\nTesting /new/problems/problem/:id endpoint...");
    
    // First get a problem ID
    const problemsResponse = await fetch(`${BASE_URL}/new/problems/problems`);
    const problemsData = await problemsResponse.json();
    
    if (!problemsData.success || problemsData.problems.length === 0) {
      console.log("❌ No problems found to test with");
      return;
    }
    
    const problemId = problemsData.problems[0].id;
    const response = await fetch(`${BASE_URL}/new/problems/problem/${problemId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Fetched problem: ${data.problem.title}`);
      console.log(`   Test cases: ${data.problem.testCases?.length || 0}`);
      console.log(`   Tags: ${data.problem.tags?.length || 0}`);
    } else {
      console.log("❌ Failed to fetch problem:", data.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function testGetFullProblem() {
  try {
    console.log("\nTesting /new/problems/problem/:id/full endpoint...");
    
    // First get a problem ID
    const problemsResponse = await fetch(`${BASE_URL}/new/problems/problems`);
    const problemsData = await problemsResponse.json();
    
    if (!problemsData.success || problemsData.problems.length === 0) {
      console.log("❌ No problems found to test with");
      return;
    }
    
    const problemId = problemsData.problems[0].id;
    const response = await fetch(`${BASE_URL}/new/problems/problem/${problemId}/full`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Fetched full problem: ${data.problem.title}`);
      console.log(`   All test cases: ${data.problem.testCases?.length || 0}`);
      if (data.problem.testCases && data.problem.testCases.length > 0) {
        console.log("   Sample test case:", {
          input: data.problem.testCases[0].input.substring(0, 50) + "...",
          output: data.problem.testCases[0].output
        });
      }
    } else {
      console.log("❌ Failed to fetch full problem:", data.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function runTests() {
  console.log("🧪 Testing API Integration...\n");
  
  await testGetProblems();
  await testGetSingleProblem();
  await testGetFullProblem();
  
  console.log("\n✅ API Integration tests completed!");
}

runTests();
