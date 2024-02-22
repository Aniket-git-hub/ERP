import addInTimeService from '../../../services/employees/attendance/addInTimeService.js';

async function addInTimeController(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    try {
        const attendance = await addInTimeService(userId, parseInt(employeeId), req.body.date, req.body.inTime);
        res.json({
            attendance,
            message: 'Attendance added successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default addInTimeController;
