import getAggregateAttendanceService from '../../../services/employees/attendance/getAggregateAttendanceService.js';

async function getAggregateAttendanceController(req, res, next) {
    const { userId } = req.user;
    const { month, year } = req.query;
    const { employeeId } = req.params;
    try {
        const aggregate = await getAggregateAttendanceService(
            userId,
            employeeId,
            parseInt(year),
            parseInt(month),
        );
        res.json(aggregate);

    } catch (error) {
        next(error);
    }
}

export default getAggregateAttendanceController;
