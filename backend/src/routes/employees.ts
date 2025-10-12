import express, { Response } from 'express';
import { Employee } from '../models/Employee.js';
import { authMiddleware } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all employees
router.get('/employees', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const employees = await Employee.find({ userId }).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Create employee
router.post('/employees', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const employeeData = { ...req.body, userId };
    
    const employee = new Employee(employeeData);
    await employee.save();
    
    res.status(201).json(employee);
  } catch (error) {
    console.error('Create employee error:', error);
    res.status(400).json({ error: 'Error adding employee' });
  }
});

// Update employee
router.put('/employees/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const employee = await Employee.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(400).json({ error: 'Error updating employee' });
  }
});

// Delete employee
router.delete('/employees/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    
    const employee = await Employee.findOneAndDelete({ _id: id, userId });
    
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(400).json({ error: 'Error deleting employee' });
  }
});

export default router;