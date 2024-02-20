import createExpenseService from '../../../services/budget/expense/createExpenseService.js';

async function createExpenseController(req, res, next) {
    const { description, amount, date, expenseCategory } = req.body;
    const { userId } = req.user;
    try {
        const expense = await createExpenseService(
            userId,
            description,
            amount,
            date,
            expenseCategory
        );
        res.status(201).json({
            expense,
            message: 'Expense created successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default createExpenseController;
