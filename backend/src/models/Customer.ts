import mongoose, { Schema } from 'mongoose';
import { ICustomer } from '../types/index.js';

const customerSchema = new Schema<ICustomer>({
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
  location: { 
    type: String,
    trim: true 
  },
  status: { 
    type: String, 
    default: 'active',
    trim: true 
  },
  invoices: { 
    type: Number, 
    default: 0 
  },
  totalSpent: { 
    type: Number, 
    default: 0 
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
customerSchema.index({ userId: 1 });
customerSchema.index({ email: 1 });

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;