import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-monexa-2024',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/monexa',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:8080', 
    'https://monexaa.vercel.app',
  ],
} as const;

// Validate required environment variables in production only
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'] as const;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`❌ Environment variable ${envVar} is required in production`);
      process.exit(1);
    }
  }
} else {
  // In development, show which env vars are being used
  console.log('🔧 Development mode - using environment variables:');
  console.log(`   PORT: ${config.port}`);
  console.log(`   JWT_SECRET: ${config.jwtSecret ? '✅ Set' : '❌ Missing'}`);
  console.log(`   MONGODB_URI: ${config.mongodbUri ? '✅ Set' : '❌ Missing'}`);
  console.log(`   NODE_ENV: ${config.nodeEnv}`);
}

export default config;