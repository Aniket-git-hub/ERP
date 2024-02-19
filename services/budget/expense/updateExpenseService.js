import EXPENSE from "../../../models/budget/expenseModel.js";

async function updateExpenseService(userId, expenseId, newData) {
    try {

        const [updatedRowsCount] = await EXPENSE.update(newData, {
            where: {
                id: expenseId,
                UserId: userId
            },
        });

        if (updatedRowsCount === 0) {
            throw new Error('Expense not found');
        }

        const updatedExpense = await EXPENSE.findByPk(expenseId);
        return updatedExpense;
    } catch (error) {
        throw error;
    }
}

export default updateExpenseService;