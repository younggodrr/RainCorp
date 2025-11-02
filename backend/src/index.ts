import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api', apiRoutes);

// Legacy health check (for backward compatibility)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Magna Coders Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Magna Coders API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;