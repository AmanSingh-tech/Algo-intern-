// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/new/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export async function registerUser(data: {
  username: string;
  password: string;
  firstname: string;
  lastname?: string;
  dob: string;
}) {
  const res = await fetch(`${BASE_URL}/new/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// Get all problems
export async function getProblems() {
  const res = await fetch(`${BASE_URL}/api/problems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

// Get a single problem by ID
export async function getProblem(id: string) {
  const res = await fetch(`${BASE_URL}/api/problem/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

// Get user profile (requires authentication)
export async function getUserProfile(token: string) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${token}`,
    },
  });

  return res.json();
}

// Submit code for evaluation
export async function submitCode(data: {
  problemId: string;
  code: string;
  language: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/evaluate/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      problemId: data.problemId,
      code: data.code,
      language: data.language,
    }),
  });

  return res.json();
}

// Run code without submitting
export async function runCode(data: {
  problemId: string;
  code: string;
  language: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/evaluate/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      problemId: data.problemId,
      code: data.code,
      language: data.language,
    }),
  });

  return res.json();
}

// Get AI response/hints
export async function getAIResponse(data: {
  problemId: string;
  userCode?: string;
  token: string;
}) {
  const res = await fetch(`${BASE_URL}/ai/response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "usertoken": `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      problemId: data.problemId,
      userCode: data.userCode,
    }),
  });

  return res.json();
}
