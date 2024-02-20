import { Op, Sequelize } from 'sequelize';
import ATTENDANCE from '../../../models/employee/attendanceModel.js';

async function getAggregateAttendanceService(
    userId,
    employeeId,
    fromDate,
    toDate
) {
    try {
        const aggregateData = await ATTENDANCE.findAll({
            attributes: [
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal('HOUR(TIMEDIFF(outTime, inTime))')
                    ),
                    'totalHoursWorked'
                ],
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            'GREATEST(HOUR(TIMEDIFF(outTime, inTime)) - 8, 0)'
                        )
                    ),
                    'overtime'
                ],
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN DATE_FORMAT(date, '%W') = 'Sunday' THEN 1 ELSE 0 END"
                        )
                    ),
                    'sundays'
                ],
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN date = 'holiday' THEN 1 ELSE 0 END"
                        )
                    ),
                    'holidays'
                ]
            ],
            where: {
                userId,
                employeeId,
                date: {
                    [Op.between]: [fromDate, toDate]
                }
            },
            raw: true
        });

        Object.keys(aggregateData[0]).forEach((key) => {
            aggregateData[0][key] = Number(aggregateData[0][key]);
        });

        return aggregateData[0];
    } catch (error) {
        throw error;
    }
}

export default getAggregateAttendanceService;
