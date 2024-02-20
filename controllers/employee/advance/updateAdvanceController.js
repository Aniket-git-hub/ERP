import updateAdvanceService from '../../../services/employees/advance/updateAdvanceService.js';

async function updateAdvanceController(req, res, next) {
    const { userId } = req.user;
    const { employeeId, advanceId } = req.params;
    // const { date, amount, description } = req.body
    try {
        const advance = await updateAdvanceService(
            userId,
            employeeId,
            advanceId,
            req.body
        );

        res.json({
            advance,
            message: 'Advance added successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default updateAdvanceController;
