import ATTENDANCE from '../../../models/employee/attendanceModel.js';

async function addInTimeService(userId, employeeId, attendanceData) {
    try {
        const attendance = await ATTENDANCE.create({
            userId,
            employeeId: employeeId,
            ...attendanceData
        });
        return attendance;
    } catch (error) {
        throw error;
    }
}

export default addInTimeService;
