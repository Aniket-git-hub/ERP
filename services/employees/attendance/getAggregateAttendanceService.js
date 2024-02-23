import { Op, Sequelize } from 'sequelize';
import ATTENDANCE from '../../../models/employee/attendanceModel.js';

async function getAggregateAttendanceService(userId, employeeId, type, year, month) {
    try {
        let whereCondition = {
            userId: userId,
            employeeId: employeeId
        };

        if (type === 'monthly') {
            whereCondition.date = {
                [Op.gte]: new Date(year, month - 1, 1),
                [Op.lt]: new Date(year, month, 1)
            };
        } else if (type === 'yearly') {
            whereCondition.date = {
                [Op.gte]: new Date(year, 0, 1),
                [Op.lt]: new Date(year + 1, 0, 1)
            };
        }

        // Total hours worked, overtime, sundays, and holidays
        const attendanceStats = await ATTENDANCE.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('SUM', Sequelize.literal('HOUR(TIMEDIFF(outTime, inTime))')), 'totalHoursWorked'],
                [Sequelize.fn('SUM', Sequelize.literal('GREATEST(HOUR(TIMEDIFF(outTime, inTime)) - 8, 0)')), 'overtime'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN DATE_FORMAT(date, '%W') = 'Sunday' THEN 1 ELSE 0 END")), 'sundays'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN date = 'holiday' THEN 1 ELSE 0 END")), 'holidays']
            ]
        });

        return {
            totalHoursWorked: parseInt(attendanceStats[0].dataValues.totalHoursWorked),
            overtime: parseInt(attendanceStats[0].dataValues.overtime),
            holidays: parseInt(attendanceStats[0].dataValues.holidays),
            sundays: parseInt(attendanceStats[0].dataValues.sundays),
        };

    } catch (error) {
        throw error;
    }
}


export default getAggregateAttendanceService