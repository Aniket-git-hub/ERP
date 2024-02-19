import express from 'express';
import createExpenseController from '../controllers/budget/expense/createExpenseController.js';
import deleteExpenseController from '../controllers/budget/expense/deleteExpenseController.js';
import getExpensesController from '../controllers/budget/expense/getExpensesController.js';
import updateExpenseController from '../controllers/budget/expense/updateExpenseController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// expense 
router.get('/', verifyJWT, getExpensesController);
router.post('/', verifyJWT, createExpenseController);
router.put('/:expenseId/', verifyJWT, updateExpenseController);
router.delete('/:expenseId/', verifyJWT, deleteExpenseController);

export default router;
