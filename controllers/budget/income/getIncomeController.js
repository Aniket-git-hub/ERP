import getIncomeService from '../../../services/budget/income/getIncomeService.js';

async function getIncomeController(req, res, next) {
    const { userId } = req.user;
    try {
        const incomes = await getIncomeService(userId);
        res.json({
            incomes
        });
    } catch (error) {
        next(error);
    }
}

export default getIncomeController;
