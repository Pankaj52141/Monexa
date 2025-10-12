import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/index.js';

const productSchema = new Schema<IProduct>({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  sku: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  stock: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  category: { 
    type: String,
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },
  lowStock: { 
    type: Boolean, 
    default: false 
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
productSchema.index({ userId: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ status: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;