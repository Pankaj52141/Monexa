import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { config } from './config/env.js';

// Import routes
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import productsRoutes from './routes/products.js';
import customersRoutes from './routes/customers.js';
import employeesRoutes from './routes/employees.js';
import invoicesRoutes from './routes/invoices.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Monexa Backend API',
    version: '1.0.0',
    status: 'Running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      products: '/api/products',
      customers: '/api/customers',
      employees: '/api/employees',
      invoices: '/api/invoices'
    },
    documentation: 'Visit /health for service status'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv 
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', productsRoutes);
app.use('/api', customersRoutes);
app.use('/api', employeesRoutes);
app.use('/api', invoicesRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(config.nodeEnv === 'development' && { details: err.message })
  });
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDB();
    
    // Start listening
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🌐 CORS origins: ${config.corsOrigins.join(', ')}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;