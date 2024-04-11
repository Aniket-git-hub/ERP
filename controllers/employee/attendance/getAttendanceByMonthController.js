import getAttendanceService from '../../../services/employees/attendance/getAttendanceService.js';

async function getFilteredAttendanceController(req, res, next) {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const filters = req.query;

    try {
        const attendance = await getAttendanceService(userId, parseInt(page), parseInt(limit), filters);
        res.json(attendance);
    } catch (error) {
        next(error);
    }
}

export default getFilteredAttendanceController;
