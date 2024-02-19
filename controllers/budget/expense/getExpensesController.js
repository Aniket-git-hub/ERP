import getExpenseService from "../../../services/budget/expense/getExpensesService.js";

async function getExpensesController(req, res, next) {
    const { userId } = req.user
    try {
        const expenses = await getExpenseService(userId);
        res.json({
            expenses
        });
    } catch (error) {
        next(error);
    }
}

export default getExpensesController;