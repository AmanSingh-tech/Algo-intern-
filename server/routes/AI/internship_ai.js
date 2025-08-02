import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  getInternshipRecommendations,
  analyzeResume,
  generateCoverLetter,
  generateInterviewQuestions,
  getApplicationInsights,
  getSalaryNegotiationAdvice
} from '../Functions/internship_ai.js';

const route = Router();
const Prisma = new PrismaClient();

// AI Internship Recommendations
route.post('/recommendations', async (req, res) => {
  try {
    const { userProfile, preferences } = req.body;

    if (!userProfile) {
      return res.json({
        success: false,
        msg: "User profile is required",
      });
    }

    const recommendations = await getInternshipRecommendations(userProfile, preferences || {});

    res.json({
      success: true,
      recommendations: recommendations,
    });
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Resume Analysis
route.post('/analyze-resume', async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;

    if (!resumeText) {
      return res.json({
        success: false,
        msg: "Resume text is required",
      });
    }

    const analysis = await analyzeResume(resumeText, targetRole);

    res.json({
      success: true,
      analysis: analysis,
    });
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Cover Letter Generation
route.post('/generate-cover-letter', async (req, res) => {
  try {
    const { jobDescription, userProfile, companyInfo } = req.body;

    if (!jobDescription || !userProfile) {
      return res.json({
        success: false,
        msg: "Job description and user profile are required",
      });
    }

    const coverLetter = await generateCoverLetter(jobDescription, userProfile, companyInfo);

    res.json({
      success: true,
      coverLetter: coverLetter,
    });
  } catch (error) {
    console.error('Cover Letter Generation Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Interview Questions
route.post('/interview-prep', async (req, res) => {
  try {
    const { jobDescription, userProfile, difficultyLevel } = req.body;

    if (!jobDescription || !userProfile) {
      return res.json({
        success: false,
        msg: "Job description and user profile are required",
      });
    }

    const interviewQuestions = await generateInterviewQuestions(
      jobDescription, 
      userProfile, 
      difficultyLevel || 'intermediate'
    );

    res.json({
      success: true,
      interviewQuestions: interviewQuestions,
    });
  } catch (error) {
    console.error('Interview Prep Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Application Insights
route.post('/application-insights', async (req, res) => {
  try {
    const { applications, userGoals } = req.body;

    if (!applications || !Array.isArray(applications)) {
      return res.json({
        success: false,
        msg: "Applications array is required",
      });
    }

    const insights = await getApplicationInsights(applications, userGoals);

    res.json({
      success: true,
      insights: insights,
    });
  } catch (error) {
    console.error('Application Insights Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Salary Negotiation Advice
route.post('/salary-advice', async (req, res) => {
  try {
    const { offerDetails, marketData, userProfile } = req.body;

    if (!offerDetails || !userProfile) {
      return res.json({
        success: false,
        msg: "Offer details and user profile are required",
      });
    }

    const advice = await getSalaryNegotiationAdvice(offerDetails, marketData, userProfile);

    res.json({
      success: true,
      advice: advice,
    });
  } catch (error) {
    console.error('Salary Advice Error:', error);
    res.json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

export default route;
