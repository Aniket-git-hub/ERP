import express from 'express';
import addEmployeeController from '../controllers/employee/addEmployeeController.js';
import getEmployeesByIdController from '../controllers/employee/getEmployeeByIdController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:employeeId', verifyJWT, getEmployeesByIdController);
router.post('/', verifyJWT, addEmployeeController);
router.delete('/:attendanceId', verifyJWT,);

export default router;
