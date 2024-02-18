import deleteAdvanceService from "../../../services/employees/advance/deleteAdvanceService.js"

async function deleteAdvanceController(req, res, next) {
    const { userId } = req.user
    const { employeeId, advanceId } = req.params
    try {
        const deletedAdvance = await deleteAdvanceService(userId, employeeId, advanceId)

        res.json({
            deletedAdvance,
            message: "Advance deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default deleteAdvanceController