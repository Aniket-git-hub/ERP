import express from 'express';
import addAttendanceController from '../controllers/employee/attendance/addAttendanceController.js';
import deleteAttendance from '../controllers/employee/attendance/deleteAttendanceController.js';
import getAggregateAttendanceByMonth from '../controllers/employee/attendance/getAggregateAttendanceController.js';
import getFilteredAttendanceController from '../controllers/employee/attendance/getAttendanceByMonthController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getFilteredAttendanceController);
router.get('/aggregate/:employeeId', verifyJWT, getAggregateAttendanceByMonth);
router.post('/:employeeId', verifyJWT, addAttendanceController);
router.delete('/:employeeId/:attendanceId', verifyJWT, deleteAttendance);

export default router;
