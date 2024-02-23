import express from 'express';
import addEmployeeController from '../controllers/employee/addEmployeeController.js';
import deleteEmployeeController from '../controllers/employee/deleteEmployeeController.js';
import getAggregateEmployeeController from '../controllers/employee/getAggregateEmployeeController.js';
import getEmployeesByIdController from '../controllers/employee/getEmployeeByIdController.js';
import getEmployeesController from '../controllers/employee/getEmployeesController.js';
import updateEmployeeController from '../controllers/employee/updateEmployeeController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/aggregate', verifyJWT, getAggregateEmployeeController);
router.get('/', verifyJWT, getEmployeesController);
router.get('/:employeeId', verifyJWT, getEmployeesByIdController);
router.post('/', verifyJWT, addEmployeeController);
router.put('/:employeeId', verifyJWT, updateEmployeeController);
router.delete('/:employeeId', verifyJWT, deleteEmployeeController);

export default router;
