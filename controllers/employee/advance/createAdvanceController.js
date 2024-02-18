async function createAdvanceController(req, res, next) {
    const { userId } = req.user
    const { attendanceId } = req.params
    const { employeeId } = req.params
    try {

    } catch (error) {
        next(error)
    }
}

export default createAdvanceController