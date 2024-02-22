import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import CustomError from '../../../utils/createError.js';

async function addOutTimeService(
    userId,
    employeeId,
    attendanceId,
    outTime
) {
    try {
        const record = await ATTENDANCE.findOne({
            where: {
                id: attendanceId,
                employeeId,
                userId,
            }
        });

        if (record && record.inTime && !record.outTime) {
            record.outTime = outTime;

            await record.save()

            return record;
        } else {
            throw new CustomError('AttendanceError', 'inTime is not filled or outTime is not empty');
        }

    } catch (error) {
        throw error;
    }
}

export default addOutTimeService;
