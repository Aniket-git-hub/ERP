import express from 'express';
import createAdvanceController from '../controllers/employee/advance/createAdvanceController.js';
import deleteAdvanceController from '../controllers/employee/advance/deleteAdvanceController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/:employeeId', verifyJWT, createAdvanceController);
router.delete('/:employeeId/:advanceId', verifyJWT, deleteAdvanceController);

export default router;
