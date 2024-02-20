import createIncomeService from '../../../services/budget/income/createIncomeService.js';

async function createIncomeController(req, res, next) {
    const { period, amount, invoiceIds, scrapSellIds } = req.body;
    const { userId } = req.user;
    try {
        const income = await createIncomeService(
            userId,
            period,
            amount,
            invoiceIds,
            scrapSellIds
        );
        res.status(201).json({
            income,
            message: 'income created successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default createIncomeController;
