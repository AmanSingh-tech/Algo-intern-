import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function addTestCases() {
  const problemId = '673779db-64d1-43d3-8d92-75d8f55b24ba';
  
  try {
    // Test case 1: [1,3], [2] -> 2.0
    await prisma.testCase.create({
      data: {
        input: '2\n1 3\n1\n2',
        output: '2',
        problemId: problemId
      }
    });
    
    // Test case 2: [1,2], [3,4] -> 2.5
    await prisma.testCase.create({
      data: {
        input: '2\n1 2\n2\n3 4',
        output: '2.5',
        problemId: problemId
      }
    });
    
    // Test case 3: [0,0], [0,0] -> 0.0
    await prisma.testCase.create({
      data: {
        input: '2\n0 0\n2\n0 0',
        output: '0',
        problemId: problemId
      }
    });
    
    console.log('Test cases added successfully!');
  } catch (error) {
    console.error('Error adding test cases:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestCases();
