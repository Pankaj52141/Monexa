import mongoose from 'mongoose';
import { config } from './env.js';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectDB = async (): Promise<void> => {
  const mongoUri = config.mongodbUri;

  if (!mongoUri) {
    console.error('❌ MONGODB_URI is not set.');
    console.error('   → On Render: Add MONGODB_URI in Dashboard > Environment.');
    console.error('   → Format:    mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB connected successfully');
      return;
    } catch (error: any) {
      console.error(`❌ MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed:`, error.message);

      if (error.message?.includes('ENOTFOUND') || error.message?.includes('querySrv')) {
        console.error('   → Check your MONGODB_URI — the hostname may be wrong.');
      }
      if (error.message?.includes('Authentication failed') || error.message?.includes('auth')) {
        console.error('   → Check your MongoDB username/password. URL-encode special characters.');
      }
      if (error.message?.includes('connect ETIMEDOUT') || error.message?.includes('timed out')) {
        console.error('   → MongoDB Atlas may be blocking Render IPs.');
        console.error('   → Go to Atlas > Network Access > Add 0.0.0.0/0 to allow all IPs.');
      }

      if (attempt < MAX_RETRIES) {
        console.log(`   ⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await sleep(RETRY_DELAY_MS);
      } else {
        console.error('❌ All connection attempts failed. Exiting.');
        process.exit(1);
      }
    }
  }
};

export default mongoose;