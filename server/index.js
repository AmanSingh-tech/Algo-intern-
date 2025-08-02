import express from 'express';
import dotenv from 'dotenv';
import userauthroute from './routes/User/auth.js';
import problemsroute from './routes/Problems/problem.js';
import userProfileroute from './routes/User/profile.js';
import problemsolveroute from './routes/Run and Submit/run_and_submit.js'
import AiResponseroute from './routes/AI/ai_response.js'
import InternshipAiroute from './routes/AI/internship_ai.js'
import { getLeaderboard, getLeaderboardStats } from './routes/User/leaderboard.js';
import { getUserSubmissions, getSubmissionDetails, getProblemLeaderboard } from './routes/User/submissions.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(cors());
app.use(express.json()); // parse incoming JSON requests


app.get('/',(req,res)=>{  

  res.send("<h1>HELLO FROM CODEARENA SERVER</h1>")
})
app.use('/new/user', userauthroute);
app.use('/user',userProfileroute)
app.use('/new/problems',problemsroute);
app.use('/new/evaluation',problemsolveroute);
app.use('/ai',AiResponseroute);
app.use('/internship-ai',InternshipAiroute);

// Leaderboard routes
app.get('/new/user/leaderboard', getLeaderboard);
app.get('/new/user/leaderboard-stats', getLeaderboardStats);

// Submission routes
app.get('/new/user/submissions', getUserSubmissions);
app.get('/new/user/submission/:submissionId', getSubmissionDetails);
app.get('/new/user/leaderboard/problem/:problemId', getProblemLeaderboard);

// Test endpoint
app.get('/test-submissions', async (req, res) => {
  try {
    console.log('Testing submissions endpoint...');
    res.json({ success: true, message: 'Submissions endpoint test successful' });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
