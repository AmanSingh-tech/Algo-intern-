import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleSubmissions() {
  try {
    console.log('Adding sample submissions...');

    // Get all users and problems
    const users = await prisma.user.findMany();
    const problems = await prisma.problem.findMany();

    if (users.length === 0 || problems.length === 0) {
      console.log('No users or problems found. Please add them first.');
      return;
    }

    const sampleSubmissions = [
      // Alice - Strong performer
      { userId: users[0].id, problemId: problems[0].id, success: true, testsPassed: 5, totalTests: 5, executionTime: 120 },
      { userId: users[0].id, problemId: problems[1].id, success: true, testsPassed: 4, totalTests: 4, executionTime: 95 },
      { userId: users[0].id, problemId: problems[2].id, success: true, testsPassed: 6, totalTests: 6, executionTime: 180 },
      { userId: users[0].id, problemId: problems[3].id, success: true, testsPassed: 3, totalTests: 3, executionTime: 85 },

      // Bob - Medium performer
      { userId: users[1].id, problemId: problems[0].id, success: true, testsPassed: 5, totalTests: 5, executionTime: 150 },
      { userId: users[1].id, problemId: problems[1].id, success: true, testsPassed: 4, totalTests: 4, executionTime: 110 },
      { userId: users[1].id, problemId: problems[2].id, success: false, testsPassed: 4, totalTests: 6, executionTime: 200 },

      // Charlie - Beginner
      { userId: users[2].id, problemId: problems[0].id, success: true, testsPassed: 5, totalTests: 5, executionTime: 200 },
      { userId: users[2].id, problemId: problems[1].id, success: false, testsPassed: 2, totalTests: 4, executionTime: 250 },

      // Diana - Advanced
      { userId: users[3].id, problemId: problems[0].id, success: true, testsPassed: 5, totalTests: 5, executionTime: 80 },
      { userId: users[3].id, problemId: problems[1].id, success: true, testsPassed: 4, totalTests: 4, executionTime: 70 },
      { userId: users[3].id, problemId: problems[2].id, success: true, testsPassed: 6, totalTests: 6, executionTime: 160 },
      { userId: users[3].id, problemId: problems[3].id, success: true, testsPassed: 3, totalTests: 3, executionTime: 65 },
      { userId: users[3].id, problemId: problems[4].id, success: true, testsPassed: 8, totalTests: 8, executionTime: 220 },

      // Eve - Moderate performer
      { userId: users[4].id, problemId: problems[0].id, success: true, testsPassed: 5, totalTests: 5, executionTime: 130 },
      { userId: users[4].id, problemId: problems[3].id, success: true, testsPassed: 3, totalTests: 3, executionTime: 90 },
    ];

    // Add submissions with sample code
    for (const submission of sampleSubmissions) {
      await prisma.solve.create({
        data: {
          ...submission,
          code: `// Sample solution for problem\nfunction solve() {\n  // Implementation here\n  return result;\n}`,
          language: 'javascript',
          date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
          submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        }
      });
    }

    console.log('✅ Successfully added sample submissions!');
    
    // Display summary
    const stats = await prisma.solve.groupBy({
      by: ['success'],
      _count: {
        _all: true
      }
    });

    console.log('\n📊 Submission Summary:');
    stats.forEach(stat => {
      console.log(`${stat.success ? '✅ Successful' : '❌ Failed'}: ${stat._count._all} submissions`);
    });

    const totalUsers = await prisma.user.count();
    const totalProblems = await prisma.problem.count();
    
    console.log(`\n👥 Total Users: ${totalUsers}`);
    console.log(`🧩 Total Problems: ${totalProblems}`);
    console.log(`📝 Total Submissions: ${sampleSubmissions.length}`);

  } catch (error) {
    console.error('Error adding sample submissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleSubmissions();
