import mongoose, { Schema } from 'mongoose';
import { IEmployee } from '../types/index.js';

const employeeSchema = new Schema<IEmployee>({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true 
  },
  phone: { 
    type: String,
    trim: true 
  },
  position: { 
    type: String,
    trim: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, {
  timestamps: true
});

// Indexes for better query performance
employeeSchema.index({ userId: 1 });
employeeSchema.index({ email: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ role: 1 });

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
export default Employee;