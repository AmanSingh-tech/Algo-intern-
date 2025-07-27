// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

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
