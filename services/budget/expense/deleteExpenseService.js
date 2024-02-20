import EXPENSE from '../../../models/budget/expenseModel.js';
import CustomError from '../../../utils/createError.js';

async function deleteExpenseService(userId, expenseId) {
    try {
        const expense = await EXPENSE.findByPk(expenseId, {
            where: {
                UserId: userId
            }
        });

        if (!expense) {
            throw new CustomError('ExpenseError', 'Expense not found');
        }

        await expense.destroy();
        return { message: 'Expense deleted successfully' };
    } catch (error) {
        throw error;
    }
}

export default deleteExpenseService;
