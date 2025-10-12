import express, { Response } from 'express';
import { Invoice } from '../models/Invoice.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all invoices
router.get('/invoices', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Create invoice
router.post('/invoices', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const invoiceData = { ...req.body, userId };
    
    const invoice = new Invoice(invoiceData);
    await invoice.save();
    
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(400).json({ error: 'Error adding invoice' });
  }
});

// Update invoice
router.put('/invoices/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const invoice = await Invoice.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }
    
    res.json(invoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(400).json({ error: 'Error updating invoice' });
  }
});

// Delete invoice
router.delete('/invoices/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const invoice = await Invoice.findOneAndDelete({ _id: id, userId });
    
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }
    
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(400).json({ error: 'Error deleting invoice' });
  }
});

export default router;