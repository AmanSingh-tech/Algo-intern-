import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

const google_gemini_gethint=async(problemdescription)=>{

    const prompt = `
                    You are a coding assistant.

                    Given the following problem description: ${problemdescription}

                    Provide initial **hints only** to help a coder start thinking about the problem.  
                    Avoid giving the full solution — focus on **approach, intuition, and modeling**.

                    Guidelines:
                    1. Give **only hints**, not code or full solutions.
                    2. Present hints in **bullet points**.
                    3. Keep hints **brief, clear, and actionable**.
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

export default google_gemini_gethint;