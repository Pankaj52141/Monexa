import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
  lowStock: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomer extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  invoices: number;
  totalSpent: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployee extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  position: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoice extends Document {
  _id: Types.ObjectId;
  type: 'customer' | 'employee' | 'other';
  recipient: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'draft';
  date: string;
  dueDate: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
  headers: Request['headers'] & {
    authorization?: string;
  };
}

export interface DashboardStats {
  totalRevenue: number;
  paid: number;
  pending: number;
  draft: number;
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  managers: number;
  admins: number;
  totalCustomers: number;
  totalProducts: number;
  totalInvoices: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface Activity {
  _id: string;
  type: 'invoice' | 'customer' | 'product' | 'payment';
  action: string;
  details: string;
  time: string;
}