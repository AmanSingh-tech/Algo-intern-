import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

async function google_gemini_response(code, problemdesc) {
  const prompt = `You are an expert coding assistant.

Given the following code and the problem description \`${problemdesc}\`, your task is to:

1. Validate the code strictly based on the problem description.
2. Do not change any structure or logic.
3. Only fix bugs if they exist.
4. For every change you make, add a comment clearly marking what was changed and why.
5. If the code is already correct and matches the problem description fully, return: "No change needed".

Problem Description:
\`${problemdesc}\`

Code:
\`\`\`cpp
${code}
\`\`\`
`;

  try {
    
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

    return response.text;
  } catch (err) {
    // console.error("Gemini error:", err);
    return "Error generating response from Gemini.";
  }
}




export default google_gemini_response;
