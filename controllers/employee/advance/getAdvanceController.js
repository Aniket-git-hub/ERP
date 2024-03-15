import getAdvanceService from "../../../services/employees/advance/getAdvanceService.js";

async function getAdvanceController(req, res, next) {
    const { userId } = req.user;
    const { operators, ...filters } = req.query;
    try {
        const advances = await getAdvanceService(userId, filters, operators);
        res.json({
            advances,
        });
    } catch (error) {
        next(error);
    }
}
export default getAdvanceController;