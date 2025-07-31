import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const route = Router();
const prisma = new PrismaClient();

// --- FIX 1: Centralized Authentication Middleware ---
// We check for the key once at startup and create a reusable, secure function.
const jwtpasskey = process.env.JWT_PASSKEY;
if (!jwtpasskey) {
  console.error("FATAL ERROR: JWT_PASSKEY is not defined in the .env file.");
  process.exit(1); // Stop the server immediately if the key is missing
}

function authenticateToken(req, res, next) {
  const tokenHeader = req.headers.usertoken;

  if (!tokenHeader) {
    return res.status(401).json({ success: false, message: "Authorization token is missing" });
  }

  try {
    // Expecting "Bearer <token>"
    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtpasskey);

    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }

    // Attach the user's ID to the request object for all subsequent route handlers to use
    req.userId = decoded.id;
    next(); // If the token is valid, proceed to the actual route (e.g., /profile)
  } catch (error) {
    // This will catch errors like an expired or malformed token
    return res.status(401).json({
      success: false,
      message: "Token verification failed. Please log in again.",
    });
  }
}

// --- FIX 2: Apply the middleware to all routes in this file ---
// This single line protects every endpoint defined below it.
route.use(authenticateToken);


// --- GET /profile ---
// This route is now much cleaner. It can trust that if the code reaches here,
// the user is authenticated and req.userId is available.
route.get('/profile', async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        firstname: true,
        lastname: true,
        DOB: true,
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Count the total number of problems solved
    const solvedCount = await prisma.solve.count({
      where: { userId: userId },
    });

    // Send the complete user object with the solved count
    return res.json({
      success: true,
      user: {
        ...user,
        solved: solvedCount,
        email: "user@example.com", // Default value since email field doesn't exist
        rating: 1200, // Default rating since rating field doesn't exist  
        createdAt: new Date().toISOString() // Default creation date
      }
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
});

// --- Other routes are also simplified ---

route.get('/submission', async (req, res) => {
  const userId = req.userId; // Provided by middleware
  try {
    const response = await prisma.solve.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      select: {
        code: true,
        date: true,
        problem: { select: { title: true } },
      },
    });
    return res.json({ success: true, solved: response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

route.get("/submission/:pid", async (req, res) => {
  const userId = req.userId; // Provided by middleware
  const pid = req.params.pid;

  if (!pid) {
    return res.status(400).json({ success: false, message: "Problem ID missing" });
  }

  try {
    const response = await prisma.solve.findMany({
      where: { userId: userId, problemId: pid },
      select: { code: true, date: true }
    });
    return res.json({ success: true, submissions: response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default route;
