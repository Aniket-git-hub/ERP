import createAdvanceService from "../../../services/employees/advance/createAdvanceService.js"

async function createAdvanceController(req, res, next) {
    const { userId } = req.user
    const { employeeId } = req.params
    const { date, amount, description } = req.body
    try {
        const advance = await createAdvanceService(userId, employeeId, date, amount, description)

        res.json({
            advance,
            message: "Advance added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default createAdvanceController