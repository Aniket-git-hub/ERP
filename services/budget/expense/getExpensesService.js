import EXPENSE_CATEGORY from '../../../models/budget/expenseCategoryModel.js';
import EXPENSE from '../../../models/budget/expenseModel.js';

async function getExpenseService(userId) {
    try {
        const expenses = await EXPENSE.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: EXPENSE_CATEGORY,
                }
            ],
            attribute: {
                exclude: ['expenseCategoryId']
            }
        });

        return expenses;
    } catch (error) {
        throw error;
    }
}

export default getExpenseService;
