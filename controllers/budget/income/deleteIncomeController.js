import deleteIncomeService from '../../../services/budget/income/deleteIncomeService.js';

async function deleteIncomeController(req, res, next) {
    const { incomeId } = req.params;
    const { userId } = req.user;
    try {
        await deleteIncomeService(userId, incomeId);
        res.json({
            message: 'Income deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteIncomeController;
