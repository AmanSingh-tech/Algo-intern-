// lib/ai-api.ts - Dedicated AI API functions

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Get AI-powered internship recommendations
export async function getInternshipRecommendations(data: {
  userProfile: any;
  preferences?: any;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      userProfile: data.userProfile,
      preferences: data.preferences,
    }),
  });

  return res.json();
}

// Analyze resume with AI
export async function analyzeResume(data: {
  resumeText: string;
  targetRole?: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/analyze-resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      resumeText: data.resumeText,
      targetRole: data.targetRole,
    }),
  });

  return res.json();
}

// Generate cover letter with AI
export async function generateCoverLetter(data: {
  jobDescription: string;
  userProfile: any;
  companyInfo?: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/generate-cover-letter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      jobDescription: data.jobDescription,
      userProfile: data.userProfile,
      companyInfo: data.companyInfo,
    }),
  });

  return res.json();
}

// Get AI interview preparation questions
export async function getInterviewPrep(data: {
  jobDescription: string;
  userProfile: any;
  difficultyLevel?: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/interview-prep`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      jobDescription: data.jobDescription,
      userProfile: data.userProfile,
      difficultyLevel: data.difficultyLevel,
    }),
  });

  return res.json();
}

// Get AI insights on applications
export async function getApplicationInsights(data: {
  applications: any[];
  userGoals?: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/application-insights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      applications: data.applications,
      userGoals: data.userGoals,
    }),
  });

  return res.json();
}

// Get AI salary negotiation advice
export async function getSalaryAdvice(data: {
  offerDetails: any;
  marketData?: string;
  userProfile: any;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/internship-ai/salary-advice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      offerDetails: data.offerDetails,
      marketData: data.marketData,
      userProfile: data.userProfile,
    }),
  });

  return res.json();
}
