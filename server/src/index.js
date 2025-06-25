import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', protectedRoutes); // all protected routes

app.get('/', (req, res) => res.send('API is running'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
