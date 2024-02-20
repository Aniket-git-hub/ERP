import EXPENSE from '../../../models/budget/expenseModel.js';

async function getExpenseService(userId) {
    try {
        const expenses = await EXPENSE.findAll({
            where: {
                userId
            }
        });

        return expenses;
    } catch (error) {
        throw error;
    }
}

export default getExpenseService;
