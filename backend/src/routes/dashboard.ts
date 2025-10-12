import express, { Response } from 'express';
import mongoose from 'mongoose';
import { Invoice, Employee, Customer, Product } from '../models/index.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest, DashboardStats, RevenueData, Activity } from '../types/index.js';

const router = express.Router();

// Dashboard statistics endpoint
router.get('/dashboard', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Total revenue: sum of paid invoice amounts for this user
    const revenueAgg = await Invoice.aggregate([
      { $match: { status: 'paid', userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, sum: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.sum || 0;

    // Monthly revenue trend for this user
    const revenueDataAgg = await Invoice.aggregate([
      { $match: { status: 'paid', userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $month: { $toDate: '$date' } },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedRevenueData: RevenueData[] = revenueDataAgg.map(r => ({
      month: monthNames[r._id - 1],
      revenue: r.revenue,
    }));

    // Breakdown of paid, pending, draft for this user
    const statusBreakdownAgg = await Invoice.aggregate([
      { $match: { status: { $in: ['paid', 'pending', 'draft'] }, userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$status', sum: { $sum: '$amount' } } },
    ]);

    const breakdown = { paid: 0, pending: 0, draft: 0 };
    statusBreakdownAgg.forEach(r => {
      breakdown[r._id as keyof typeof breakdown] = r.sum;
    });

    // Employee statistics for this user
    const allEmployees = await Employee.find({ userId });
    const totalEmployees = allEmployees.length;
    const activeEmployees = allEmployees.length; // All employees are active in the simple model
    const inactiveEmployees = 0;
    const managers = 0; // No role field in simple model
    const admins = 0;

    // Other statistics
    const totalCustomers = await Customer.countDocuments({ userId });
    const totalProducts = await Product.countDocuments({ userId });
    const totalInvoices = await Invoice.countDocuments({ userId });

    const stats: DashboardStats = {
      totalRevenue,
      ...breakdown,
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      managers,
      admins,
      totalCustomers,
      totalProducts,
      totalInvoices,
    };

    res.json({
      stats,
      revenueData: formattedRevenueData,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Activities endpoint
router.get('/activities', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Get recent activities for this user
    const recentCustomers = await Customer.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('name createdAt');

    const recentInvoices = await Invoice.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('recipient amount status createdAt');

    const recentProducts = await Product.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('name stock createdAt');

    const activities: Activity[] = [];

    // Add customer activities
    recentCustomers.forEach(customer => {
      activities.push({
        _id: `customer-${customer._id}`,
        type: 'customer',
        action: 'added',
        details: `New customer "${customer.name}" registered`,
        time: customer.createdAt.toISOString(),
      });
    });

    // Add invoice activities
    recentInvoices.forEach(invoice => {
      activities.push({
        _id: `invoice-${invoice._id}`,
        type: 'invoice',
        action: 'created',
        details: `Invoice for "${invoice.recipient}" ($${invoice.amount}) - ${invoice.status}`,
        time: invoice.createdAt.toISOString(),
      });
    });

    // Add product activities
    recentProducts.forEach(product => {
      activities.push({
        _id: `product-${product._id}`,
        type: 'product',
        action: 'updated',
        details: `Product "${product.name}" stock: ${product.stock}`,
        time: product.createdAt.toISOString(),
      });
    });

    // Sort by time (most recent first) and limit to 5
    activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    res.json(activities.slice(0, 5)); // Return top 5 recent activities
  } catch (error) {
    console.error('Activities error:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

export default router;