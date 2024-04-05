import express from 'express';
import addEmployeeController from '../controllers/employee/addEmployeeController.js';
import deleteEmployeeController from '../controllers/employee/deleteEmployeeController.js';
import { addDepartmentController, deleteDepartmentController, getAllDepartmentsController, getDepartmentByIdController, updateDepartmentController } from '../controllers/employee/department/departmentController.js';
import { addDesignationController, deleteDesignationController, getAllDesignationsController, getDesignationByIdController, updateDesignationController } from '../controllers/employee/designation/designationController.js';
import getAggregateEmployeeController from '../controllers/employee/getAggregateEmployeeController.js';
import getEmployeesByIdController from '../controllers/employee/getEmployeeByIdController.js';
import getEmployeesController from '../controllers/employee/getEmployeesController.js';
import getEmployeesOptionController from '../controllers/employee/getEmployeesOptionController.js';
import updateEmployeeController from '../controllers/employee/updateEmployeeController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/aggregate', verifyJWT, getAggregateEmployeeController);
router.get('/options', verifyJWT, getEmployeesOptionController);
router.get('/designation', verifyJWT, getAllDesignationsController);
router.get('/designation/:designationId', verifyJWT, getDesignationByIdController);
router.post('/designation', verifyJWT, addDesignationController);
router.put('/designation/:designationId', verifyJWT, updateDesignationController);
router.delete('/designation/:designationId', verifyJWT, deleteDesignationController);
router.get('/department', verifyJWT, getAllDepartmentsController);
router.get('/department/:departmentId', verifyJWT, getDepartmentByIdController);
router.post('/department', verifyJWT, addDepartmentController);
router.put('/department/:departmentId', verifyJWT, updateDepartmentController);
router.delete('/department/:departmentId', verifyJWT, deleteDepartmentController);
router.get('/', verifyJWT, getEmployeesController);
router.get('/:employeeId', verifyJWT, getEmployeesByIdController);
router.post('/', verifyJWT, addEmployeeController);
router.put('/:employeeId', verifyJWT, updateEmployeeController);
router.delete('/:employeeId', verifyJWT, deleteEmployeeController);


export default router;
