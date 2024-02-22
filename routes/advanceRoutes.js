import express from 'express';
import createAdvanceController from '../controllers/employee/advance/createAdvanceController.js';
import deleteAdvanceController from '../controllers/employee/advance/deleteAdvanceController.js';
import getAdvanceController from '../controllers/employee/advance/getAdvanceController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:employeeId', verifyJWT, getAdvanceController);
router.post('/:employeeId', verifyJWT, createAdvanceController);
router.delete('/:employeeId/:advanceId', verifyJWT, deleteAdvanceController);

export default router;
