import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pesapalRouter } from './routes/pesapal.js';
import { bookingRouter } from './routes/booking.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/pesapal', pesapalRouter);
app.use('/api/booking', bookingRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'MyHost API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MyHost API server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  
  if (process.env.PESAPAL_ENVIRONMENT === 'sandbox') {
    console.log('🧪 Using Pesapal SANDBOX environment');
  } else {
    console.log('💰 Using Pesapal LIVE environment');
  }
});

export default app;

