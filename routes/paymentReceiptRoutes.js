import express from 'express';
import createPaymentReceiptController from '../controllers/employee/paymentReceipt/createPaymentReceiptController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/:employeeId', verifyJWT, createPaymentReceiptController);

export default router;
