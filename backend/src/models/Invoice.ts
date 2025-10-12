import mongoose, { Schema } from 'mongoose';
import { IInvoice } from '../types/index.js';

const invoiceSchema = new Schema<IInvoice>({
  type: { 
    type: String, 
    enum: ['customer', 'employee', 'other'], 
    required: true 
  },
  recipient: { 
    type: String, 
    required: true,
    trim: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0 
  },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'overdue', 'draft'], 
    default: 'pending' 
  },
  date: { 
    type: String, 
    required: true 
  },
  dueDate: { 
    type: String, 
    required: true 
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
invoiceSchema.index({ userId: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ dueDate: 1 });

export const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;