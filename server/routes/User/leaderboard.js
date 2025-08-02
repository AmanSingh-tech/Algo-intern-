// routes/User/leaderboard.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get leaderboard data with rankings
export async function getLeaderboard(req, res) {
  try {
    // Get all users with their solve statistics
    const users = await prisma.user.findMany({
      include: {
        solved: {
          where: {
            success: true
          },
          include: {
            problem: true
          }
        }
      }
    });

    // Calculate leaderboard statistics for each user
    const leaderboardData = users.map(user => {
      const successfulSolves = user.solved.filter(solve => solve.success);
      const totalSolved = successfulSolves.length;
      
      // Calculate rating based on problems solved and difficulty
      let rating = 1200; // Base rating
      successfulSolves.forEach(solve => {
        const difficulty = solve.problem.difficulty;
        if (difficulty === 'Easy') rating += 10;
        else if (difficulty === 'Medium') rating += 25;
        else if (difficulty === 'Hard') rating += 50;
      });

      // Get recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentSolves = successfulSolves.filter(solve => 
        new Date(solve.date) > thirtyDaysAgo
      ).length;

      // Calculate contests participated (assume each day with multiple solves is a contest)
      const solveDates = successfulSolves.map(solve => 
        new Date(solve.date).toDateString()
      );
      const uniqueDates = [...new Set(solveDates)];
      const contests = uniqueDates.filter(date => {
        const solvesOnDate = successfulSolves.filter(solve => 
          new Date(solve.date).toDateString() === date
        ).length;
        return solvesOnDate >= 3; // Consider it a contest if 3+ problems solved in a day
      }).length;

      return {
        id: user.id,
        name: `${user.firstname} ${user.lastname || ''}`.trim(),
        username: user.username,
        rating: Math.min(rating, 3500), // Cap at 3500
        solved: totalSolved,
        contests: contests,
        recentActivity: recentSolves,
        avatar: `/placeholder.svg?height=40&width=40`,
        joinDate: user.DOB // Using DOB as a placeholder for join date
      };
    });

    // Sort by rating descending, then by solved count
    leaderboardData.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.solved - a.solved;
    });

    // Add rank to each user
    const rankedLeaderboard = leaderboardData.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json({
      success: true,
      data: rankedLeaderboard,
      totalUsers: rankedLeaderboard.length
    });

  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard data'
    });
  }
}

// Get top performers stats for dashboard cards
export async function getLeaderboardStats(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        solved: {
          where: {
            success: true
          },
          include: {
            problem: true
          }
        }
      }
    });

    if (users.length === 0) {
      return res.json({
        success: true,
        stats: {
          topRated: { rating: 0, name: 'No users yet' },
          mostSolved: { solved: 0, name: 'No users yet' },
          totalUsers: 0,
          totalSolves: 0
        }
      });
    }

    // Calculate ratings and stats
    const usersWithStats = users.map(user => {
      const successfulSolves = user.solved.filter(solve => solve.success);
      const totalSolved = successfulSolves.length;
      
      let rating = 1200;
      successfulSolves.forEach(solve => {
        const difficulty = solve.problem.difficulty;
        if (difficulty === 'Easy') rating += 10;
        else if (difficulty === 'Medium') rating += 25;
        else if (difficulty === 'Hard') rating += 50;
      });

      return {
        name: `${user.firstname} ${user.lastname || ''}`.trim(),
        username: user.username,
        rating: Math.min(rating, 3500),
        solved: totalSolved
      };
    });

    // Find top performers
    const topRated = usersWithStats.reduce((max, user) => 
      user.rating > max.rating ? user : max
    );
    
    const mostSolved = usersWithStats.reduce((max, user) => 
      user.solved > max.solved ? user : max
    );

    const totalSolves = users.reduce((total, user) => 
      total + user.solved.filter(solve => solve.success).length, 0
    );

    res.json({
      success: true,
      stats: {
        topRated,
        mostSolved,
        totalUsers: users.length,
        totalSolves
      }
    });

  } catch (error) {
    console.error('Leaderboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard statistics'
    });
  }
}
