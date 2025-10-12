import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/index.js';

const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
export default User;