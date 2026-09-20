import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import profileRoutes from './routes/profileRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import unlockRoutes from './routes/unlockRoutes.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());
app.use(limiter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Yaario API is running'
  });
});

app.use('/api/profiles', profileRoutes);
app.use('/api/matches', unlockRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/payments', paymentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;
