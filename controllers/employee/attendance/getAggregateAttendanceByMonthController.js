import getAggregateAttendanceService from '../../../services/employees/attendance/getAggregateAttendanceService.js';
import { getMonthRange } from '../../../utils/getMonthRage.js';

async function getAggregateAttendanceByMonth(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    const { date } = req.query;
    try {
        const { firstDay, lastDay } = getMonthRange(date);
        const aggregate = await getAggregateAttendanceService(
            userId,
            employeeId,
            firstDay,
            lastDay
        );
        res.json({
            aggregate
        });
    } catch (error) {
        next(error);
    }
}

export default getAggregateAttendanceByMonth;
