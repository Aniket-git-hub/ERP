import express from 'express';
import { getTransactionController } from '../controllers/budget/transactionController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getTransactionController);

export default router;
