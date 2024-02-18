import addInTimeService from "../../../services/employees/attendance/addInTimeService.js"

async function addInTimeController(req, res, next) {
    const { userId } = req.user
    const { employeeId } = req.params
    try {
        const attendance = await addInTimeService(userId, employeeId, req.body)
        res.json({
            attendance,
            message: "Attendance added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default addInTimeController