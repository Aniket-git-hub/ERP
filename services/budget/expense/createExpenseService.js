import EXPENSE from "../../../models/budget/expenseModel.js";

async function createExpenseService(userId, description, amount, date, expenseCategory) {
    try {

        const expense = await EXPENSE.create({
            description,
            amount,
            date,
            UserId: userId,
            expenseCategoryId: expenseCategory
        });

        return expense;

    } catch (error) {
        throw error;
    }
}

export default createExpenseService;