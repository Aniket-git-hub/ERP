import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import CustomError from '../../../utils/createError.js';

async function addInTimeService(userId, employeeId, date, inTime) {
    try {

        const existingRecord = await ATTENDANCE.findOne({
            where: { userId, employeeId, date: new Date(date).toISOString() },
        })

        if (existingRecord) {
            throw new CustomError('AttendanceError', 'There already exists a records with this date')

        }

        const attendance = await ATTENDANCE.create({
            userId,
            employeeId,
            date,
            inTime,
        });

        return attendance;

    } catch (error) {
        throw error;
    }
}

export default addInTimeService;
