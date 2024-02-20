import ATTENDANCE from '../../../models/employee/attendanceModel.js';

async function deleteAttendanceService(userId, employeeId, attendanceId) {
    try {
        const deletedAttendance = await ATTENDANCE.destroy({
            where: {
                employeeId,
                UserId: userId,
                id: attendanceId
            }
        });
        return deletedAttendance;
    } catch (error) {
        throw error;
    }
}

export default deleteAttendanceService;
