import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(5000, () => {
  console.log('Server is running on port 5000');
}
);
export default app;