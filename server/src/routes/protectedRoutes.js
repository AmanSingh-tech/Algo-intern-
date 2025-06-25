import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticate, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.email}`,
    userId: req.user.id,
  });
});

export default router;
