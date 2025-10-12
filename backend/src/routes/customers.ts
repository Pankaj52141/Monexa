import express, { Response } from 'express';
import { Customer } from '../models/Customer.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all customers
router.get('/customers', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const customers = await Customer.find({ userId }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Create customer
router.post('/customers', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const customerData = { ...req.body, userId };
    
    const customer = new Customer(customerData);
    await customer.save();
    
    res.status(201).json(customer);
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(400).json({ error: 'Error creating customer' });
  }
});

// Update customer
router.put('/customers/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const customer = await Customer.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    
    res.json(customer);
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(400).json({ error: 'Error updating customer' });
  }
});

// Delete customer
router.delete('/customers/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const customer = await Customer.findOneAndDelete({ _id: id, userId });
    
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(400).json({ error: 'Error deleting customer' });
  }
});

export default router;