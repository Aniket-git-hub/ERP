import addAttendanceService from '../../../services/employees/attendance/addInTimeService.js';

async function addAttendanceController(req, res, next) {

    const { userId } = req.user;
    const { employeeId } = req.params;
    const { punchType, checkTimestamp } = req.body;

    try {
        const attendance = await addAttendanceService(userId, parseInt(employeeId), punchType, checkTimestamp);
        res.json({
            attendance,
            message: 'Attendance added successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default addAttendanceController;
