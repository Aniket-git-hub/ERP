import express from 'express';
import addAttendanceController from '../controllers/employee/attendance/addInTimeController.js';
import deleteAttendance from '../controllers/employee/attendance/deleteAttendanceController.js';
import getAggregateAttendanceByMonth from '../controllers/employee/attendance/getAggregateAttendanceController.js';
import getAttendanceByMonthController from '../controllers/employee/attendance/getAttendanceByMonthController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:employeeId', verifyJWT, getAttendanceByMonthController);
router.get('/aggregate/:employeeId', verifyJWT, getAggregateAttendanceByMonth);
router.post('/:employeeId', verifyJWT, addAttendanceController);
router.delete('/:employeeId/:attendanceId', verifyJWT, deleteAttendance);

export default router;
