import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import CustomError from '../../../utils/createError.js';

async function deleteAttendanceService(userId, employeeId, attendanceId) {
    try {
        const attendance = await ATTENDANCE.findByPk(attendanceId, {
            where: {
                employeeId,
                userId,
            }
        });

        if (!attendance) {
            throw new CustomError('AttendanceError', 'Attendance Not found')
        }

        await attendance.destroy();

        return true;
    } catch (error) {
        throw error;
    }
}

export default deleteAttendanceService;
