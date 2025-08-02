import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

// AI-powered internship matching based on user profile and preferences
export async function getInternshipRecommendations(userProfile, preferences) {
  const prompt = `
    You are an AI career counselor specializing in internship recommendations.

    User Profile:
    - Skills: ${Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || 'Not specified'}
    - Experience Level: ${userProfile.experienceLevel || 'Not specified'}
    - Education: ${userProfile.education || 'Not specified'}
    - Location Preference: ${userProfile.locationPreference || 'Not specified'}
    - Industry Interest: ${userProfile.industryInterest || 'Not specified'}

    User Preferences:
    - Preferred Role Types: ${preferences.roleTypes?.join(', ') || 'Not specified'}
    - Company Size Preference: ${preferences.companySize || 'Not specified'}
    - Remote Work Preference: ${preferences.remoteWork || 'Not specified'}
    - Salary Expectations: ${preferences.salaryExpectations || 'Not specified'}

    Please provide:
    1. Top 5 internship recommendations with specific company types and roles
    2. Skills to develop for better opportunities
    3. Industry trends relevant to their profile
    4. Networking suggestions

    Format your response in a structured manner with clear sections.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error generating internship recommendations.";
  }
}

// AI resume analysis and improvement suggestions
export async function analyzeResume(resumeText, targetRole) {
  const prompt = `
    You are an expert resume reviewer and career coach.

    Resume Content:
    ${resumeText}

    Target Role: ${targetRole || 'General internship positions'}

    Please provide a comprehensive analysis including:
    1. Overall resume strength (score out of 10)
    2. Key strengths identified
    3. Areas for improvement
    4. Missing keywords for ATS optimization
    5. Formatting and structure suggestions
    6. Specific recommendations for the target role
    7. Action items to improve the resume

    Be specific and actionable in your feedback.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error analyzing resume.";
  }
}

// AI-powered cover letter generation
export async function generateCoverLetter(jobDescription, userProfile, companyInfo) {
  const prompt = `
    You are a professional cover letter writer.

    Job Description:
    ${jobDescription}

    User Profile:
    - Name: ${userProfile.name || '[Your Name]'}
    - Skills: ${Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || 'Not specified'}
    - Experience: ${userProfile.experience || 'Not specified'}
    - Education: ${userProfile.education || 'Not specified'}
    - Achievements: ${userProfile.achievements || 'Not specified'}

    Company Information:
    ${companyInfo || 'General company information not provided'}

    Please write a compelling, personalized cover letter that:
    1. Addresses the specific role and company
    2. Highlights relevant skills and experiences
    3. Shows enthusiasm and cultural fit
    4. Includes a strong opening and closing
    5. Is professional yet engaging
    6. Is approximately 3-4 paragraphs

    Make it sound natural and authentic, not robotic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error generating cover letter.";
  }
}

// AI interview preparation with custom questions
export async function generateInterviewQuestions(jobDescription, userProfile, difficultyLevel = 'intermediate') {
  const prompt = `
    You are an expert interview coach.

    Job Description:
    ${jobDescription}

    User Profile:
    - Skills: ${Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || 'Not specified'}
    - Experience Level: ${userProfile.experienceLevel || 'Not specified'}
    - Target Role: ${userProfile.targetRole || 'Not specified'}

    Difficulty Level: ${difficultyLevel}

    Please generate:
    1. 10 behavioral interview questions with sample answers
    2. 8 technical questions relevant to the role
    3. 5 company-specific questions they should ask
    4. 3 scenario-based questions with approach guidance
    5. Interview tips specific to this role type

    Make the questions realistic and role-appropriate. Provide guidance for each question.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error generating interview questions.";
  }
}

// AI application tracking insights and next steps
export async function getApplicationInsights(applications, userGoals) {
  const prompt = `
    You are a career strategist analyzing internship application data.

    Applications Data:
    ${JSON.stringify(applications, null, 2)}

    User Goals:
    ${userGoals || 'Not specified'}

    Please provide insights including:
    1. Application success rate analysis
    2. Response time patterns
    3. Industry/company type performance
    4. Recommended application strategy adjustments
    5. Timeline optimization suggestions
    6. Follow-up recommendations
    7. Areas to focus on for better success

    Be data-driven and provide actionable strategies.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error generating application insights.";
  }
}

// AI-powered salary negotiation guidance
export async function getSalaryNegotiationAdvice(offerDetails, marketData, userProfile) {
  const prompt = `
    You are a career negotiation expert.

    Offer Details:
    ${JSON.stringify(offerDetails, null, 2)}

    Market Data:
    ${marketData || 'Limited market data available'}

    User Profile:
    - Experience Level: ${userProfile.experienceLevel || 'Not specified'}
    - Location: ${userProfile.location || 'Not specified'}
    - Skills: ${Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || 'Not specified'}

    Please provide:
    1. Offer evaluation (fair/below/above market)
    2. Negotiation strategy and talking points
    3. Alternative benefits to consider if salary is fixed
    4. Script examples for negotiation conversations
    5. Red flags to watch for
    6. Timeline and process guidance

    Be specific and practical in your advice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error generating salary negotiation advice.";
  }
}

export default {
  getInternshipRecommendations,
  analyzeResume,
  generateCoverLetter,
  generateInterviewQuestions,
  getApplicationInsights,
  getSalaryNegotiationAdvice
};
