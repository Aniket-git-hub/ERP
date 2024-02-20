import express from 'express';
import {
    createBudgetController,
    deleteBudgetController,
    getBudgetController,
    updateBudgetController
} from '../controllers/budget/budgetController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getBudgetController);
router.post('/', verifyJWT, createBudgetController);
router.put('/:budgetId/', verifyJWT, updateBudgetController);
router.delete('/:budgetId/', verifyJWT, deleteBudgetController);

export default router;
