import express from 'express';
import createPaymentReceiptController from '../controllers/employee/paymentReceipt/createPaymentReceiptController.js';
import getPaymentReceiptByMonthController from '../controllers/employee/paymentReceipt/getPaymentReceiptByMonthController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const router = express.Router();

router.post('/:employeeId', verifyJWT, createPaymentReceiptController);
router.get('/:employeeId', verifyJWT, getPaymentReceiptByMonthController);

export default router;
