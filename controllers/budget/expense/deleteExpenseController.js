import deleteExpenseService from "../../../services/budget/expense/deleteExpenseService.js";

async function deleteExpenseController(req, res, next) {
    const { expenseId } = req.params;
    const { userId } = req.user
    try {
        await deleteExpenseService(userId, expenseId);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export default deleteExpenseController;