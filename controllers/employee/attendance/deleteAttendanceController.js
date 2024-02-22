import deleteAttendanceService from '../../../services/employees/attendance/deleteAttendanceService.js';

async function deleteAttendance(req, res, next) {
    const { userId } = req.user;
    const { attendanceId, employeeId } = req.params;
    try {
        await deleteAttendanceService(
            userId,
            employeeId,
            attendanceId
        );
        res.json({
            message: 'Attendance deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteAttendance;
