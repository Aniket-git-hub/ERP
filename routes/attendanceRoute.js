import express from 'express';
import addInTimeController from '../controllers/employee/attendance/addInTimeController.js';
import addOutTimeController from '../controllers/employee/attendance/addOutTimeController.js';
import deleteAttendance from '../controllers/employee/attendance/deleteAttendanceController.js';
import getAggregateAttendanceByMonth from '../controllers/employee/attendance/getAggregateAttendanceController.js';
import getAttendanceByMonthController from '../controllers/employee/attendance/getAttendanceByMonthController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:employeeId', verifyJWT, getAttendanceByMonthController);
router.get('/aggregate/:employeeId', verifyJWT, getAggregateAttendanceByMonth);
router.post('/inTime/:employeeId', verifyJWT, addInTimeController);
router.post(
    '/outTime/:employeeId/:attendanceId',
    verifyJWT,
    addOutTimeController
);
router.delete('/:employeeId/:attendanceId', verifyJWT, deleteAttendance);

export default router;
