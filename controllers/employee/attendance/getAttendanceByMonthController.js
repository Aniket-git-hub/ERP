import getAttendanceService from '../../../services/employees/attendance/getAttendanceService.js';

async function getAttendanceByMonthController(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    const { date } = req.query;
    try {
        const attendance = await getAttendanceService(userId, employeeId, date);
        res.json({
            attendance
        });
    } catch (error) {
        next(error);
    }
}

export default getAttendanceByMonthController;
