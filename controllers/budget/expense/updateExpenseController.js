import updateExpenseService from "../../../services/budget/expense/updateExpenseService.js";

async function updateExpenseController(req, res, next) {
    const { expenseId } = req.params;
    const newData = req.body;
    const { userId } = req.user
    try {
        const updatedExpense = await updateExpenseService(userId, expenseId, newData);
        res.json({
            expense: updatedExpense,
            message: "Expense updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

export default updateExpenseController;