import addOutTimeService from '../../../services/employees/attendance/addOutTimeService.js';

async function addOutTimeController(req, res, next) {
    const { userId } = req.user;
    const { attendanceId } = req.params;
    const { employeeId } = req.params;
    try {
        const attendance = await addOutTimeService(
            userId,
            employeeId,
            attendanceId,
            req.body.outTime
        );
        res.json({
            attendance,
            message: 'Attendance added successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default addOutTimeController;
