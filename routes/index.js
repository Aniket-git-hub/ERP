import express from 'express';
import getDashboardData from '../controllers/dashboard/getDashboardData.js';
import advanceRoutes from './advanceRoutes.js';
import attendanceRoutes from './attendanceRoute.js';
import authRoutes from './authRoutes.js';
import budgetRoutes from './budgetRoutes.js';
import clientRoutes from './clientRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import expenseCategoryRoutes from './expenseCategoryRoutes.js';
import expenseRoutes from './expenseRoutes.js';
import incomeRoutes from './incomeRoutes.js';
import invoiceRoutes from './invoiceRoutes.js';
import jobRoutes from './jobRoutes.js';
import materialRoutes from './materialRoutes.js';
import paymentReceiptRoutes from './paymentReceiptRoutes.js';
import scrapSellRoutes from './scrapSellRoutes.js';
import transactionRoutes from './transactionRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/client', clientRoutes);
router.use('/material', materialRoutes);
router.use('/job', jobRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/employee', employeeRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/advance', advanceRoutes);
router.use('/scrap-sell', scrapSellRoutes);
router.use('/payment-receipt', paymentReceiptRoutes);
router.use('/expense-category', expenseCategoryRoutes);
router.use('/expense', expenseRoutes);
router.use('/income', incomeRoutes);
router.use('/budget', budgetRoutes);
router.use('/transaction', transactionRoutes);
router.get('/dashboard', getDashboardData);

export default router;