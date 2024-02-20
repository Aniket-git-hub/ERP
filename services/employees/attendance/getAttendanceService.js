import { Op } from 'sequelize';
import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import { getMonthRange } from '../../../utils/getMonthRage.js';

async function getAttendanceService(userId, employeeId, date) {
    try {
        const { firstDay, lastDay } = getMonthRange(date);
        const attendance = await ATTENDANCE.findAll({
            where: {
                userId,
                employeeId,
                date: {
                    [Op.between]: [firstDay, lastDay]
                }
            }
        });
        return attendance;
    } catch (error) {
        throw error;
    }
}

export default getAttendanceService;
