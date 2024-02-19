import express from 'express';
import { createExpenseCategoryController, deleteExpenseCategoryController, getExpenseCategoriesController, updateExpenseCategoryController } from '../controllers/budget/expenseCategoryController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// expense category
router.get('/', verifyJWT, getExpenseCategoriesController);
router.post('/', verifyJWT, createExpenseCategoryController);
router.put('/:expenseCategoryId/', verifyJWT, updateExpenseCategoryController);
router.delete('/:expenseCategoryId/', verifyJWT, deleteExpenseCategoryController);

export default router;
