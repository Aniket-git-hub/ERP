import getAdvanceService from "../../../services/employees/advance/getAdvanceService.js";

async function getAdvanceController(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    try {
        const advances = await getAdvanceService(userId, parseInt(employeeId), {})
        res.json({
            advances,
        })
    } catch (error) {
        next(error)
    }
}

export default getAdvanceController;