import express from 'express';
import createIncomeController from '../controllers/budget/income/createIncomeController.js';
import deleteIncomeController from '../controllers/budget/income/deleteIncomeController.js';
import getIncomeController from '../controllers/budget/income/getIncomeController.js';
import updateIncomeController from '../controllers/budget/income/updateIncomeController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getIncomeController);
router.post('/', verifyJWT, createIncomeController);
router.put('/:incomeId/', verifyJWT, updateIncomeController);
router.delete('/:incomeId/', verifyJWT, deleteIncomeController);

export default router;
